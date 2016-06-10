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
		model._Page = 1;
		model.NeumaticoDI = true;
		model.NeumaticoDD = true;
		model.NeumaticoTI = true;
		model.NeumaticoTD = true;
		
		models.setWISEModel(model);
	}
	changeTextColor("Balizas",model.Balizas);
	changeTextColor("PrimerosAuxilios",model.PrimerosAuxilios);
	changeTextColor("Matafuegos",model.Matafuegos);
	changeTextColor("Chaleco",model.Chaleco);
	changeTextColor("Guantes",model.Guantes);
	
	changeTextColor("NeumaticoDI",model.NeumaticoDI);
	changeTextColor("NeumaticoDD",model.NeumaticoDD);
	changeTextColor("NeumaticoTI",model.NeumaticoTI);
	changeTextColor("NeumaticoTD",model.NeumaticoTD);
	
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
exports.GetQuintaPagina = function(pageNumber){
	return $.Page5;		
};
exports.GetPageCount = function(pageNumber){
	return 5;		
};

exports.ValidateData = function(){
	switch(true){
		case (!model.Comercial || model.Comercial == ""):
			dialog.message = 'Se debe indicar la linea de negocio.';
			valid = false;	
			break;
	}
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
		case "NeumaticoDI":{
			$.lblNeumaticoDI.color = color;
			$.iconNeumaticoDI.backgroundImage = image;
			break;
		}
		case "NeumaticoDD":{
			$.lblNeumaticoDD.color = color;
			$.iconNeumaticoDD.backgroundImage = image;
			break;
		}
		case "NeumaticoTI":{
			$.lblNeumaticoTI.color = color;
			$.iconNeumaticoTI.backgroundImage = image;
			break;
		}
		case "NeumaticoTD":{
			$.lblNeumaticoTD.color = color;
			$.iconNeumaticoTD.backgroundImage = image;
			break;
		}
	};
}

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

$.txtObsEmergencia.addEventListener("change",function(){model.ObsEmergencia = $.txtObsEmergencia.value;});
$.VencimientoMatafuego.addEventListener("change",function(){model.VencimientoMatafuego = $.VencimientoMatafuego.value;});

$.CheckBalizas.addEventListener("click",function(){changeTextColor("Balizas",!model.Balizas); model.Balizas = !model.Balizas;});
$.CheckPrimerosAuxilios.addEventListener("click",function(){changeTextColor("PrimerosAuxilios",!model.PrimerosAuxilios); model.PrimerosAuxilios = !model.PrimerosAuxilios;});
$.CheckMatafuegos.addEventListener("click",function(){changeTextColor("Matafuegos",!model.Matafuegos); model.Matafuegos = !model.Matafuegos;});
$.CheckChaleco.addEventListener("click",function(){changeTextColor("Chaleco",!model.Chaleco); model.Chaleco = !model.Chaleco;});
$.CheckGuantes.addEventListener("click",function(){changeTextColor("Guantes",!model.Guantes); model.Guantes = !model.Guantes;});

$.CheckNeumaticoDI.addEventListener("click",function(){changeTextColor("NeumaticoDI",!model.NeumaticoDI); model.NeumaticoDI = !model.NeumaticoDI;});
$.CheckNeumaticoDD.addEventListener("click",function(){changeTextColor("NeumaticoDD",!model.NeumaticoDD); model.NeumaticoDD = !model.NeumaticoDD;});
$.CheckNeumaticoTI.addEventListener("click",function(){changeTextColor("NeumaticoTI",!model.NeumaticoTI); model.NeumaticoTI = !model.NeumaticoTI;});
$.CheckNeumaticoTD.addEventListener("click",function(){changeTextColor("NeumaticoTD",!model.NeumaticoTD); model.NeumaticoTD = !model.NeumaticoTD;});