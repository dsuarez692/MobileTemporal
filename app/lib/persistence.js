var userData = null;

var colaReportes = null;

var cacheUsers = null;

var userIndex = null;

//Busco el usuario en la cache, devuelve -1 si no lo encuentra
function getIndexOfUser(user){
	if(userIndex != null){
		return userIndex;
	}
	//Busco si ya esta cargado, si lo esta, actualizo los datos
	for(var i=0; i < cacheUsers.cache.length; i++){
		if(cacheUsers.cache[i].username == user.username){
			userIndex = i;
			return i;
		}
	}
	return -1;
}

//Actualiza cache de usuarios
function addUserToCache(user){
	//Si esta el cache sin inicializar, lo obtengo
	if(cacheUsers == null){
		cacheUsers = JSON.parse(Ti.App.Properties.getString('cacheUsers', '{"cache":[]}'));
	}
	//Obtengo el indice del usuario en el cache
	var index = getIndexOfUser(user);
	
	//Si el indice es mayor a 0
	if(index >= 0){
		//Actualizo el cache
		cacheUsers.cache[index] = user;
	//Si no se encontro indice
	}else{
		//Lo agrego al cache
		cacheUsers.cache.push(user);
	}
	
	//Persisto
	Ti.App.Properties.setString('cacheUsers', JSON.stringify(cacheUsers));
}

//Guarda los datos del usuario
function saveUser(tosave){
	userData = tosave;
	Ti.App.Properties.setString('userData', JSON.stringify(tosave));
}

function saveUserAndCache(tosave){
	saveUser(tosave);
	addUserToCache(tosave);
}

exports.saveUserData = saveUserAndCache;

//Devuelve objeto con variables:
// name -> nombre
// last -> apellido
// username -> nombre de usuario
// password -> contraseña (encriptada en SHA256)
// sector -> devuelve sector (no esta correctamente hecho en account2)
// bossname -> nombre de la persona ante la que responde el usuario
// bosslast -> apellido de la persona ante la que responde el usuario
// Comercial -> devuelve la linea de negocio (Falta desarrollar en account2)
// si es vacio o null, significa que no esta logueado
exports.getUserData = function(){
	if(userData == null){
		userData = JSON.parse(Ti.App.Properties.getString('userData', "{}"));
		initColaReportes();
	}
	return userData;
};

//Obtengo la cola del usuario logueado
function initColaReportes(){
	//Obtengo todas las colas de reportes guardadas (cada usuario tiene una diferente)
	var encontrado = false;
	var aux = JSON.parse(Ti.App.Properties.getString('colasReportes', '{"colas":[]}'));
	for(var i=0; i < aux.colas.length; i ++){
		if(aux.colas[i].owner == userData.username){
			colaReportes = aux.colas[i].cola;
			encontrado = true;
			break;
		}
	}
	if(!encontrado){
		colaReportes = [];
	}
}

//Devuelve la cantidad de reportes en cola
exports.getReportCount = function(){
	return colaReportes.length;
};

//Devuelve del principio
exports.getReportFromCola = function(){
	if(colaReportes == null){
		initColaReportes();
	}
	var report = colaReportes[0];
	colaReportes.shift();
	return report;
};

//Agrega al final
exports.addReport = function(report){
	if(colaReportes == null){
		initColaReportes();
	}
	colaReportes.push(report);
};

function loadUser(user){
	saveUser(user);
	initColaReportes();
}

//Se le envia data con username y password, y valida contra el cache o base de datos (falta base de datos)
//devuelve true si se logueo correctamente o false si hubo algun problema
exports.logIn = function(data){
	if(cacheUsers == null){
		cacheUsers = JSON.parse(Ti.App.Properties.getString('cacheUsers', '{"cache":[]}'));
	}
	//Busco indice en el cache del usuario
	var index = getIndexOfUser(data);
	
	//Si encontro indice
	if(index >= 0){
		//Valido password (encriptadas)
		if(cacheUsers.cache[index].password == data.password){
			//Cargo usuario de la cache
			loadUser(cacheUsers.cache[index]);
			return true;
		}else{
			//Error
			alert('Password incorrecta');
			return false;
		}
	}else{
		//Creo usuario nuevo sin datos
		saveUserAndCache({
					"name" : "",
					"last" : "",
					"username" : data.username,
					"password" : data.password,
					"sector" : "",
					"bossname" : "",
					"bosslast" : "",
					"Comercial" : ""
					});
		return true;
	}
};

exports.changePassword = function(password){
	userData.password = password;
	
	//Obtengo el indice
	var index = getIndexOfUser();
	
	//Verifico si devolvio indice
	if(index > 0){
		//Actualizo password
		cacheUsers.cache[index].password = password;
		
		//Persisto
		Ti.App.Properties.setString('cacheUsers', JSON.stringify(cacheUsers));
		
		return true;
	}
	return false;
};

//Desloguear
exports.logOut = function(){
	//Guardo la cola con el nombre del usuario que es el dueño
	if(colaReportes == null){
		initColaReportes();
	}
	
	var cola = {
				"owner" : userData.username,
				"cola" : colaReportes
			};
	//Obtengo todas las colas
	var colas = JSON.parse(Ti.App.Properties.getString('colasReportes', '{"colas":[]}'));
	
	//Busco la cola del usuario para actualizarla
	var encontrado = false;
	for(var i=0; i < colas.colas.length; i++){
		if(colas.colas[i].owner == userData.username){
			colas.colas[i] = cola;
			encontrado = true;
		}
	}
	if(!encontrado){
		colas.colas.push(cola);
	}
	//Guardo todas las colas de nuevo
	Ti.App.Properties.setString('colasReportes', JSON.stringify(colas));
	//Quito los datos de usuario de las properties
	Ti.App.Properties.removeProperty('userData');
	//
	userData = {};
	userIndex = null;
};

//Devuelvo direccion de la imagen de perfil del usuario logueado
function getUserPhotoPath(){
	return Titanium.Filesystem.applicationDataDirectory + userData.username +  '.jpg';
}

//Se le pasa el path del archivo a eliminar
function deleteFile(path){
	var f = Ti.Filesystem.getFile(path);
	if(f.exists()){
		f.deleteFile();
		f = null;
	}
}

exports.deleteFile = deleteFile;

exports.getUserPhotoPath = getUserPhotoPath;

//Elimina la foto de perfil del usuario
exports.deleteUserPhoto = function(){
	deleteFile(getUserPhotoPath());
};
