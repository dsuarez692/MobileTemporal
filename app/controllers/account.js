var photoManager = require("photo");
var controls = require("controls");
var persistence = require("persistence");

var durationPhotoMenu = 200;

var deletePhoto = false;

$.photoMenuTable.addEventListener('click',function(e){
	showPhotoMenu(false);
	Titanium.UI.Android.hideSoftKeyboard();
	switch(e.rowData.id){
		case "takePhoto":
			if($.username.value != ''){
				photoManager.tomarFoto(addFoto);
			}else{
				alert('Debe ingresar primero un nombre de usuario.');
			}
			break;
		case "selectPhoto":
			if($.username.value != ''){
				photoManager.cargarFoto(addFoto);
			}else{
				alert('Debe ingresar primero un nombre de usuario.');
			}
			break;
		case "deletePhoto":
			controls.removeAllViews($.userPhoto);
			deletePhoto = true;
			loadDefaultPhotoImage();
			break;
	};
	Ti.API.info("Se presiono " + e.rowData.id);
});

function loadDefaultPhotoImage(){
	if(user != null && user.name != undefined && !deletePhoto){
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,user.username + '.jpg');
		if(f.exists() === true){
			var temp = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'temp.jpg');
			temp.write(f.read());
			$.userPhoto.add(Ti.UI.createImageView({
				width:"100%",
				height:"auto",
				image:temp.read(),
				id: 'imagenPerfil'
			}));
			f = null;
			temp = null;
			return;
		}
	}
		
	$.userPhoto.add(Ti.UI.createImageView({
		image: "/camera.png"
	}));
	
}

function addFoto(event){
	controls.removeAllViews($.userPhoto);
	var image = event.media.imageAsResized(640, 480);
	
	fileName = 'temp.jpg';
	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fileName);
	f.write(image);
	var imageView = Ti.UI.createImageView({
		width:"100%",
		height:"auto",
		//image:event.media.file.nativePath,
		image:image,
		id: 'imagenPerfil'
	});
	$.userPhoto.add(imageView);
	deletePhoto = false;
	f = null;
}


function showPhotoMenu(open){
	if (open){
		moveMenuTo= 0;
	}else{
		if(OS_ANDROID){
			Titanium.UI.Android.hideSoftKeyboard();
		}
		moveMenuTo= -($.photoMenu.size.height);
	}
	
	if(OS_IOS || OS_ANDROID){
		$.photoMenu.animate({
			bottom: moveMenuTo,
			duration: durationPhotoMenu
		});
	}
	if(OS_WINDOWS){
		$.photoMenu.setBottom(moveMenuTo);
	}
}

function validateData(){
	if($.name.value == ''){
		alert('Debe ingresar un nombre.');
		return false;
	}
	if($.last.value == ''){
		alert('Debe ingresar un apellido.');
		return false;
	}
	if($.username.value == ''){
		alert('Debe ingresar un nombre de usuario.');
		return false;
	}
	if(persistence.userExistsInCache($.username.value)){
		alert('Ya se encuentra cargado un usuario con el nombre de usuario elegido.');
		return false;
	}
	if($.password.visible){
		if($.password.value == ''){
			alert('Debe ingresar una contraseña.');
			return false;
		}
		if($.password.value.length < 6 || $.password.value.length > 20){
			alert('La contraseña debe contener entre 6 y 20 caracteres.');
			return false;
		}
		if($.password2.value == ''){
			alert('Debe repetir la contraseña.');
			return false;
		}
		if($.password.value != $.password2.value){
			alert('Las contraseñas no coinciden.');
			return false;
		}
	}
	
	return true;
};

exports.validateData = validateData;

$.userPhoto.addEventListener('click', function(){
	showPhotoMenu(true);
});

exports.savePhotoProfile = function(){
	if(!deletePhoto){
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,"temp.jpg");
		if(f.exists()===true){
			var photo = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, $.username.value + ".jpg");
			photo.write(f.read());
			photo = null;
		}
		f.deleteFile();
		f = null;
	}else{
		persistence.deleteFile(Titanium.Filesystem.applicationDataDirectory + "temp.jpg");
		persistence.deleteFile(persistence.getUserPhotoPath());
	}
};

exports.resetView = function(){
	$.name.value = "";
	$.last.value = "";
	$.username.value = "";
	$.password.value = "";
	$.password2.value = "";
	$.appTitleLabel.text = 'Mi cuenta';
	$.collapsibleMenu.top = -600;
	controls.removeAllViews($.collapsibleMenu);
	controls.removeAllViews($.userPhoto);
	loadDefaultPhotoImage();
	loadDefaultValues();
	Ti.API.info('Reseteo account');
};

function loadDefaultValues(){
	if(user != null && user.name != undefined){
		$.name.value = user.name;
		$.last.value = user.last;
		$.username.value = user.username;
		$.password.visible = false;
		$.passwordLabel.visible = false;
		$.password2.visible = false;
	}else{
		$.password.visible = true;
		$.passwordLabel.visible = true;
		$.password2.visible = true;
	}
}

var user = persistence.getUserData();

loadDefaultValues();
loadDefaultPhotoImage();
