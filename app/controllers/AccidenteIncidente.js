// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var controls=require('controls');
var models=require('models');
var persistence = require("persistence");

var model = {};
var user = {};


exports.LoadFromModel = function(modelo,view,Page){
	model = modelo;
	user = persistence.getUserData();
	if(model.Balizas == undefined){
		model._Page = 1;
		model.DNI = '';
		model.Observaciones = '';
		models.setWISEModel(model);
	}
	if(user != undefined && user != null){ //En teoria esta linea no va a ser necesaria
		if(user.Comercial != undefined){
			models.getWISEModel().Comercial = user.Comercial;
			ChangeProductLine(user.Comercial);		
		}
		else{
			ResetProductLine();	
		}	
	}
	else{
		ResetProductLine();
	}
};


exports.GetPrimeraPagina = function(pageNumber){
	return $.Page1;		
};
exports.GetSegundaPagina = function(pageNumber){
	return $.Page2;		
};
exports.GetTerceraPagina = function(pageNumber){
	return $.Page3;		
};
exports.GetCuartaPagina = function(pageNumber){
	return $.Page4;		
};
exports.GetQuintaPagina = function(pageNumber){
	return $.Page5;		
};
exports.GetSextaPagina = function(pageNumber){
	return $.Page6;		
};
exports.GetSeptimaPagina = function(pageNumber){
	return $.Page7;		
};
exports.GetOctavaPagina = function(pageNumber){
	return $.Page8;		
};
exports.GetNovenaPagina = function(pageNumber){
	return $.Page9;		
};
exports.GetDecimaPagina = function(pageNumber){
	return $.Page10;		
};
exports.GetDecimoPrimeraPagina = function(pageNumber){
	return $.Page11;		
};
exports.GetDecimoSegundaPagina = function(pageNumber){
	return $.Page12;		
};
exports.GetDecimoTerceraPagina = function(pageNumber){
	return $.Page13;		
};
exports.GetDecimoCuartaPagina = function(pageNumber){
	return $.Page14;		
};
exports.GetDecimoQuintaPagina = function(pageNumber){
	return $.Page15;		
};
exports.GetDecimoSextaPagina = function(pageNumber){
	return $.Page16;		
};
exports.GetDecimoSeptimaPagina = function(pageNumber){
	return $.Page17;		
};
exports.GetDecimoOctavaPagina = function(pageNumber){
	return $.Page18;		
};
exports.GetDecimoNovenaPagina = function(pageNumber){
	return $.Page19;		
};
exports.GetVigesimaPagina = function(pageNumber){
	return $.Page20;		
};
exports.GetPageCount = function(pageNumber){
	return 20;		//5 por ahora, van a ser como 20
};

exports.ValidateData = function(){
	var valid = true;
	var dialog = Ti.UI.createAlertDialog({
	    message: 'Se debe indicar la linea de negocio.',
	    ok: 'Okay',
	    title: 'Error de Validación'
	  });
	  
	switch(true){
		case (!model.Comercial || model.Comercial == ""):
			valid = false;	
			break;
		case (!model.DNI || model.DNI == ""):
			dialog.message = 'El DNI es requerido';
			valid = false;	
			break;
	}
	
	if(!valid){
		dialog.show();	
	}
	
	return valid;		
};


function ResetProductLine(){
	$.lineFreshDairy.backgroundImage = "/media/danone-08.png";
	$.lineEarlyLife.backgroundImage = "/media/danone-07.png";
	$.lineWaters.backgroundImage = "/media/danone-06.png";
	$.lineMedical.backgroundImage = "/media/danone-05.png";
}


function ChangeProductLine(value){
	ResetProductLine();
	models.getWISEModel().Comercial = value;
	switch(value){
		case "lineFreshDairy":{
			$.lineFreshDairy.backgroundImage = "/media/danone-01.png";
			break;	
		}
		case "lineEarlyLife":{
			$.lineEarlyLife.backgroundImage = "/media/danone-02.png";
			break;	
		}
		case "lineWaters":{
			$.lineWaters.backgroundImage = "/media/danone-03.png";
			break;	
		}
		case "lineMedical":{
			$.lineMedical.backgroundImage = "/media/danone-04.png";
			break;	
		}
	}
}

$.lineFreshDairy.addEventListener("click",function(e){ ChangeProductLine("lineFreshDairy"); });
$.lineEarlyLife.addEventListener("click",function(e){ ChangeProductLine("lineEarlyLife"); });
$.lineWaters.addEventListener("click",function(e){ ChangeProductLine("lineWaters"); });
$.lineMedical.addEventListener("click",function(e){ ChangeProductLine("lineMedical"); });	