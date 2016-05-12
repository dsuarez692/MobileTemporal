var photoManager = require("photo");
var controls = require("controls");

var account2View = controls.getAccount2View();

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
			$.userPhoto.removeAllchildren();
			loadDefaultPhotoImage();
			break;
	};
	Ti.API.info("Se presiono " + e.rowData.id);
});

function loadDefaultPhotoImage(){
	
	$.userPhoto.add(Ti.UI.createImageView({
		image: "/camera.png"
	}));
}

function addFoto(event){
	var image = event.media;
	
	Ti.API.info("EVENTO: "+JSON.stringify(event));
	
	fileName = 'userphoto.jpg';
	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fileName);
	f.write(image);

	var imageView = Ti.UI.createImageView({
		width:"100%",
		height:"auto",
		//image:event.media.file.nativePath,
		image:event.media,
		id:1
	});
	$.userPhoto.add(imageView);
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
		return;
	}
	if($.last.value == ''){
		alert('Debe ingresar un apellido.');
		return;
	}
	if($.username.value == ''){
		alert('Debe ingresar un nombre de usuario.');
		return;
	}
	if($.password.value == ''){
		alert('Debe ingresar una contraseña.');
		return;
	}
	if($.password2.value == ''){
		alert('Debe repetir la contraseña.');
		return;
	}
	if($.password.value != $.password2.value){
		alert('Las contraseñas no coinciden.');
		return;
	}
	
	
	
	$.content.add(account2View.getView());
}

$.userPhoto.addEventListener('click', function(){
	showPhotoMenu(true);
});

$.mainView.addEventListener('resetView', function(e){
	Ti.API.info('Recibi el evento resetView');
	$.name = "";
	$.last = "";
	$.username = "";
	$.password = "";
	$.password2 = "";
	$.userPhoto.removeAllChildren();
	loadDefaultPhotoImage();
	var children = $.content.getChildren();
	for(var i=0; i< children.length; i++){
		if(children[i].id == 'content'){
			children[i].fireEvent('resetView');
			$.content.remove(children[i]);
		}
	}
});

loadDefaultPhotoImage();
