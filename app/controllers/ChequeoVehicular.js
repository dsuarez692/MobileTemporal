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
		model.Balizas = true;
		model.PrimerosAuxilios = true;
		model.Matafuegos = true;
		model.VencimientoMatafuego = null;
		model.Chaleco = true;
		model.Guantes = true;
		model.ObsEmergencia = '';
		
		models.setWISEModel(model);
	}
	changeTextColor("Balizas",model.Balizas);
	changeTextColor("PrimerosAuxilios",model.PrimerosAuxilios);
	changeTextColor("Matafuegos",model.Matafuegos);
	changeTextColor("Chaleco",model.Chaleco);
	changeTextColor("Guantes",model.Guantes);
	
	$.VencimientoMatafuego.value = model.VencimientoMatafuego;
	$.txtObsEmergencia.value = model.ObsEmergencia;

	
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
exports.GetPageCount = function(pageNumber){
	return 4;		
};

exports.ValidateData = function(){
	return true;		
};

function changeTextColor(campo,value){
	var color = "#057699"; //Celeste
	var image = "/media/image36.png";
	
	if(!value){
		color = "#EDC200";	
		image = "/media/image37.png";
	}

	switch(campo){
		case "Balizas":{
			$.lblBalizas.color = color;
			$.iconBalizas.backgroundImage = image;
			break;
		}
		case "PrimerosAuxilios":{
			$.lblPrimerosAuxilios.color = color;
			$.iconPrimerosAuxilios.backgroundImage = image;
			break;
		}
		case "Matafuegos":{
			$.lblMatafuegos.color = color;
			$.iconMatafuegos.backgroundImage = image;
			break;
		}
		case "Chaleco":{
			$.lblChaleco.color = color;
			$.iconChaleco.backgroundImage = image;
			break;
		}
		case "Guantes":{
			$.lblGuantes.color = color;
			$.iconGuantes.backgroundImage = image;
			break;
		}
	};
}

function ResetProductLine(){
	$.lineFreshDairy.backgroundImage = "/media/image56.png";
	$.lineEarlyLife.backgroundImage = "/media/image57.png";
	$.lineWaters.backgroundImage = "/media/image58.png";
	$.lineMedical.backgroundImage = "/media/image59.png";
}


function ChangeProductLine(value){
	ResetProductLine();
	models.getWISEModel().Comercial = value;
	switch(value){
		case "lineFreshDairy":{
			$.lineFreshDairy.backgroundImage = "/media/image57.png";
			break;	
		}
		case "lineEarlyLife":{
			$.lineEarlyLife.backgroundImage = "/media/image57.png";
			break;	
		}
		case "lineWaters":{
			$.lineWaters.backgroundImage = "/media/image57.png";
			break;	
		}
		case "lineMedical":{
			$.lineMedical.backgroundImage = "/media/image57.png";
			break;	
		}
	}
}

$.lineFreshDairy.addEventListener("click",function(e){ ChangeProductLine("lineFreshDairy"); });
$.lineEarlyLife.addEventListener("click",function(e){ ChangeProductLine("lineEarlyLife"); });
$.lineWaters.addEventListener("click",function(e){ ChangeProductLine("lineWaters"); });
$.lineMedical.addEventListener("click",function(e){ ChangeProductLine("lineMedical"); });	

$.txtObsEmergencia.addEventListener("change",function(){model.ObsEmergencia = $.txtObsEmergencia.value;});
$.VencimientoMatafuego.addEventListener("change",function(){model.VencimientoMatafuego = $.VencimientoMatafuego.value;});

$.CheckBalizas.addEventListener("click",function(){changeTextColor("Balizas",!model.Balizas); model.Balizas = !model.Balizas;});
$.CheckPrimerosAuxilios.addEventListener("click",function(){changeTextColor("PrimerosAuxilios",!model.PrimerosAuxilios); model.PrimerosAuxilios = !model.PrimerosAuxilios;});
$.CheckMatafuegos.addEventListener("click",function(){changeTextColor("Matafuegos",!model.Matafuegos); model.Matafuegos = !model.Matafuegos;});
$.CheckChaleco.addEventListener("click",function(){changeTextColor("Chaleco",!model.Chaleco); model.Chaleco = !model.Chaleco;});
$.CheckGuantes.addEventListener("click",function(){changeTextColor("Guantes",!model.Guantes); model.Guantes = !model.Guantes;});
