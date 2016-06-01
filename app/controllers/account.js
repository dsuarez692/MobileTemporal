var photoManager = require("photo");
var controls = require("controls");
var persistence = require("persistence");

var profileLoaded = false;

var durationPhotoMenu = 200;

$.photoMenuTable.addEventListener('click',function(e){
	showPhotoMenu(false);
	switch(e.rowData.id){
		case "takePhoto":
			photoManager.tomarFoto(addFoto);
			break;
		case "selectPhoto":
			photoManager.cargarFoto(addFoto);
			break;
		case "deletePhoto":
			controls.removeAllViews($.userPhoto);
			profileLoaded = false;
			loadDefaultPhotoImage();
			break;
	};
	Ti.API.info("Se presiono " + e.rowData.id);
});

function loadDefaultPhotoImage(){
	if(user != null && user.name != undefined){
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'userphoto.jpg');
		$.userPhoto.add(Ti.UI.createImageView({
			width:"100%",
			height:"auto",
			image:f.read(),
			id: 'imagenPerfil'
		}));
		f = null;
	}else{
		$.userPhoto.add(Ti.UI.createImageView({
			image: "/camera.png"
		}));
	}
}

function addFoto(event){
	controls.removeAllViews($.userPhoto);
	var image = event.media.imageAsResized(640, 480);
	
	fileName = 'userphoto.jpg';
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
	profileLoaded = true;
	f = null;
}


function showPhotoMenu(open){
	if (open){
		moveMenuTo= 0;
	}else{
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
	if($.password.value == ''){
		alert('Debe ingresar una contraseña.');
		return false;
	}
	if($.password.value.length < 6 || $.password.value.length > 20){
		alert('La contraseña debe contener entre 6 y 20 caracteres');
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
	
	if(!profileLoaded){
		alert('Debe seleccionar una imagen de usuario');
		return false;
	}
	return true;
};

exports.validateData = validateData;

$.userPhoto.addEventListener('click', function(){
	showPhotoMenu(true);
});

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
	var funcVacia = function(){};
	$.collapsibleMenu.removeEventListener('click', funcVacia);
	loadDefaultPhotoImage();
	loadDefaultValues();
	Ti.API.info('Reseteo account');
};

function loadDefaultValues(){
	if(user != null && user.name != undefined){
		$.name.value = user.name;
		$.last.value = user.last;
		$.username.value = user.username;
	}
}

var user = persistence.getUserData();

loadDefaultValues();
loadDefaultPhotoImage();
