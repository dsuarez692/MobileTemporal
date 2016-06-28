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
		model.Factor = 'Seleccione';
		model.FactorIndex = 0;
		model.Informacion = 'Seleccione';
		model.InformacionIndex = 0;
		model.Riesgo = 'Seleccione';
		model.RiesgoIndex = 0;
		model.ObservacionesRiesgo = '';
		model.Sector = 'Seleccione';
		model.SectorIndex = 0;
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
	$.Factor.setSelectedRow(0,model.FactorIndex);
	$.TipoInformacion.setSelectedRow(0,model.InformacionIndex);
	return $.Page1;		
};
exports.GetSegundaPagina = function(pageNumber){
	$.Riesgo.setSelectedRow(0,model.RiesgoIndex);
	return $.Page2;		
};
exports.GetTerceraPagina = function(pageNumber){
	$.Sector.setSelectedRow(0,model.SectorIndex);
	return $.Page3;		
};

exports.GetPageCount = function(pageNumber){
	return 3;		
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
		case (model.Factor == null || model.Factor == "Seleccione"):
			dialog.message = 'Debe indicar el factor involucrado';
			valid = false;	
			break;
		case (model.Informacion == null || model.Informacion == "Seleccione"):
			dialog.message = 'Debe indicar la información vinculada a la Seguridad e Higiene que desea comunicar';
			valid = false;	
			break;
		case (model.Riesgo == null || model.Riesgo == "Seleccione"):
			dialog.message = 'Debe indicar cómo considerá el riesgo';
			valid = false;	
			break;
		case (model.Sector == null || model.Sector == "Seleccione"):
			dialog.message = 'Debe indicar el sector al que pertenece';
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
$.Factor.addEventListener('change', function(e) { model.Factor = $.Factor.getSelectedRow(0).id; model.FactorIndex = e.rowIndex; });
$.TipoInformacion.addEventListener('change', function(e) { model.Informacion = $.TipoInformacion.getSelectedRow(0).id; model.InformacionIndex = e.rowIndex;});	
$.Riesgo.addEventListener('change', function(e) { model.Riesgo = $.Riesgo.getSelectedRow(0).id; model.RiesgoIndex = e.rowIndex;});	
$.Sector.addEventListener('change', function(e) { model.Sector = $.Sector.getSelectedRow(0).id; model.SectorIndex = e.rowIndex;});

$.lineFreshDairy.addEventListener("click",function(e){ ChangeProductLine("lineFreshDairy"); });
$.lineEarlyLife.addEventListener("click",function(e){ ChangeProductLine("lineEarlyLife"); });
$.lineWaters.addEventListener("click",function(e){ ChangeProductLine("lineWaters"); });
$.lineMedical.addEventListener("click",function(e){ ChangeProductLine("lineMedical"); });	