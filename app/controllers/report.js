var models=require('models');
var photoManager = require("photo");
var controls = require("controls");
var report = $.args.Page;
var verAdjuntas = false;
var durationPhotoMenu = 200;


function MostraOcultarBotones(siguiente,volver,enviar, ok){
	$.volverBtn.visible = volver;
	$.siguienteBtn.visible = siguiente;
	$.enviarBtn.visible = enviar;
	$.okBtn.visible = ok;
}

function getPage(page){
	switch(page){
		case 1 : 
			return report.GetPrimeraPagina();
			break;
		case 2 : 
			return report.GetSegundaPagina();
			break;
		case 3 : 
			return report.GetTerceraPagina();
			break;
		case 4 : 
			return report.GetCuartaPagina();
			break;	
	}
}

function changePage(page){
	if(OS_ANDROID){
		Titanium.UI.Android.hideSoftKeyboard();
	}
	controls.removeAllViews($.form);
	MostraOcultarBotones(true,true,false,false);
	
	if(page == 1){
		MostraOcultarBotones(true,false,false,false);	
	}
	$.form.add(getPage(page));
	
	if(page == report.GetPageCount()){
		MostraOcultarBotones(false,true,true,false);	
	}	
}

$.volverBtn.addEventListener("click",function(){if(models.getWISEModel()._Page > 1){models.getWISEModel()._Page = models.getWISEModel()._Page - 1; changePage(models.getWISEModel()._Page);}});

$.siguienteBtn.addEventListener("click",function(){if(models.getWISEModel()._Page < report.GetPageCount()){models.getWISEModel()._Page = models.getWISEModel()._Page + 1; changePage(models.getWISEModel()._Page);}}); //Despues veo como sacar la pagina final del reporte
  
if(report.linkObservaciones != undefined){
	report.linkObservaciones.addEventListener("click",
	function(){
		controls.removeAllViews($.form);
		$.txtObservaciones.value = models.getWISEModel().Observaciones;
		$.form.add($.viewObservaciones);
		MostraOcultarBotones(false,true,false,true);
		models.getWISEModel()._Page = models.getWISEModel()._Page + 1;
	}); 
}

$.okBtn.addEventListener("click",
	function(){
		models.getWISEModel().Observaciones = $.txtObservaciones.value;
		models.getWISEModel()._Page = models.getWISEModel()._Page - 1; 
		changePage(models.getWISEModel()._Page);
	}); 
	
$.reportNameContainer.addEventListener('click', function(){
	if(!verAdjuntas){
		showPhotoMenu(true);	
	}
});  


$.okCameraBtn.addEventListener('click', function(){
	$.okCameraBtn.visible = false;
	changePage(models.getWISEModel()._Page);
	verAdjuntas = false;
});  

function validarFotos(){
	var dialog = Ti.UI.createAlertDialog({
	    message: 'Se cargó el maximo número de fotos para este reporte.',
	    ok: 'Okay',
	    title: 'Alerta'
	  });
			    
	if(models.getWISEModel().Image == undefined){
		models.getWISEModel().Image = [];	
	}
	if(models.getWISEModel().Image.length == models.getWISEModel().ImageMax){
		dialog.show();
		return false;	
	}
	return true;			
}


$.photoMenuTable.addEventListener('click',function(e){
	showPhotoMenu(false);
	switch(e.rowData.id){
		case "takePhoto":
			if(validarFotos()){
				photoManager.tomarFoto(addFoto);	
			}
			break;
		case "selectPhoto":
			if(validarFotos()){
				photoManager.cargarFoto(addFoto);
			}
			break;
		case "photoList":
			controls.removeAllViews($.form);
			MostraOcultarBotones(false,false,false,false);
			$.form.add($.viewAdjuntos);
			verAdjuntas = true;
			$.okCameraBtn.visible = true;
			break;
	};
	Ti.API.info("Se presiono " + e.rowData.id);
});
   
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

function addFoto(event){
	if(models.getWISEModel()._photoCount == undefined){
		models.getWISEModel()._photoCount = 1;	
	}
	//controls.removeAllViews($.userPhoto);
	var image = event.media.imageAsResized(640, 480);
	
	fileName = 'report-' + new Date().getTime() + '.jpg';
	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fileName);
	f.write(image);
	if(models.getWISEModel().Image == undefined){
		models.getWISEModel().Image = [];	
	}
	models.getWISEModel().Image.push(fileName);
	
	var view = Ti.UI.createView({
		height:"200dp",
		width:"100%",
		id:	fileName
	});
	
	var imageView = Ti.UI.createImageView({
		left: "10%",
		top: "10dp",
		width:"50%",
		height:"200dp",
		image:image,
	});
	
	var imageDelete = Ti.UI.createImageView({
		top: "50%",
		left: "70%",
		height:"50dp",
		width:"16%",
		backgroundImage: "/media/deleteDisabled.png"
	});
	
	imageDelete.addEventListener('click',function(){
		$.imageContainer.remove(view);
		var index = models.getWISEModel().Image.indexOf(view.id);
		models.getWISEModel().Image.splice(index, 1);
		
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,view.id);

		if (file.exists()) {
			var success = file.deleteFile();
 			Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
		}
	});
	
	view.add(imageView);
	view.add(imageDelete);
	$.imageContainer.add(view);
	f = null;
}
    		