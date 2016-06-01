var models=require('models');
var photoManager = require("photo");
var controls = require("controls");
var report = $.args.Page;


function MostraOcultarBotones(siguiente,volver,enviar, ok){
	$.volverBtn.visible = volver;
	$.siguienteBtn.visible = siguiente;
	$.enviarBtn.visible = enviar;
	$.okBtn.visible = ok;
}

function changePage(page){
	controls.removeAllViews($.form);
	MostraOcultarBotones(true,true,false,false);
	switch(page){
		case 1 : 
			$.form.add(report.GetPrimeraPagina());
			MostraOcultarBotones(true,false,false,false);
			break;
		case 2 : 
			$.form.add(report.GetSegundaPagina());
			break;
		case 3 : 
			$.form.add(report.GetTerceraPagina());
			break;
		case 4 : 
			$.form.add(report.GetCuartaPagina());
			break;
	}
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
		//alert($.txtObservaciones.value);
		$.txtObservaciones.value = models.getWISEModel().Observaciones;
		//alert($.txtObservaciones.value);
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
	showPhotoMenu(true);
});  

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
			//controls.removeAllViews($.userPhoto);
			profileLoaded = false;
			//loadDefaultPhotoImage();
			break;
	};
	Ti.API.info("Se presiono " + e.rowData.id);
});
   
 function showPhotoMenu(open){
	if (open){
		moveMenuTo= $.reportNameContainer.size.height;
	}else{
		moveMenuTo= -($.photoMenu.size.height);
	}
	
	if(OS_IOS || OS_ANDROID){
		$.photoMenu.animate({
			top: moveMenuTo,
			duration: durationPhotoMenu
		});
	}
	if(OS_WINDOWS){
		$.photoMenu.setTop(moveMenuTo);
	}
}
    		