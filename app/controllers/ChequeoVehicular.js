// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var controls=require('controls');
var models=require('models');
var persistence = require("persistence");
var moment = require('moment');

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
		model.UltimaRevisionTecnica = null;
		model.FechaVTV = null;
		model.Chaleco = true;
		model.Guantes = true;
		model.Observaciones = '';
		model.ObsEmergencia = '';
		model.ObsEstadoVehiculo = '';
		model._Page = 1;
		model.NeumaticoDI = true;
		model.NeumaticoDD = true;
		model.NeumaticoTI = true;
		model.NeumaticoTD = true;
		model.KM = '';
		model.DNI = '';
		
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
	if(OS_ANDROID){
		$.VencimientoMatafuego.text = model.VencimientoMatafuego;	
		$.UltimaRevisionTecnica.value = model.UltimaRevisionTecnica;
		$.FechaVTV.value = model.FechaVTV;
	}

	$.txtObsEmergencia.value = model.ObsEmergencia;
	$.txtObsEstado.value = model.ObsEstadoVehiculo;
	$.KM.value = model.KM;
	$.DNI.value = model.DNI;

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
		case (model.Matafuegos == true):
			if(model.VencimientoMatafuego == null){
				dialog.message = 'La fecha de vencimiento de la carga del matafuegos es obligatoria';
				valid = false;	
				break;
			}
		case (!model.KM || model.KM == ""):
			dialog.message = 'El Kilometraje es requerido';
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
$.dpVencimientoMatafuego.addEventListener("change",function(){model.VencimientoMatafuego = $.dpVencimientoMatafuego.value;});
$.txtObsEstado.addEventListener("change",function(){model.ObsEstadoVehiculo = $.txtObsEstado.value;});
$.UltimaRevisionTecnica.addEventListener("change",function(){model.UltimaRevisionTecnica = $.dpUltimaRevisionTecnica.value;});
$.FechaVTV.addEventListener("change",function(){model.FechaVTV = $.FechaVTV.value;});

$.KM.addEventListener('change', function(e) {
      //e.source.value = e.source.value.replace(/[^0-9]+/,""); 
      model.KM = e.source.value;
});

$.DNI.addEventListener('change', function(e) {
      //e.source.value = e.source.value.replace(/[^0-9]+/,""); 
      model.DNI = e.source.value;
});
    

$.CheckBalizas.addEventListener("click",function(){changeTextColor("Balizas",!model.Balizas); model.Balizas = !model.Balizas;});
$.CheckPrimerosAuxilios.addEventListener("click",function(){changeTextColor("PrimerosAuxilios",!model.PrimerosAuxilios); model.PrimerosAuxilios = !model.PrimerosAuxilios;});
$.CheckMatafuegos.addEventListener("click",function(){changeTextColor("Matafuegos",!model.Matafuegos); model.Matafuegos = !model.Matafuegos;});
$.CheckChaleco.addEventListener("click",function(){changeTextColor("Chaleco",!model.Chaleco); model.Chaleco = !model.Chaleco;});
$.CheckGuantes.addEventListener("click",function(){changeTextColor("Guantes",!model.Guantes); model.Guantes = !model.Guantes;});

$.CheckNeumaticoDI.addEventListener("click",function(){changeTextColor("NeumaticoDI",!model.NeumaticoDI); model.NeumaticoDI = !model.NeumaticoDI;});
$.CheckNeumaticoDD.addEventListener("click",function(){changeTextColor("NeumaticoDD",!model.NeumaticoDD); model.NeumaticoDD = !model.NeumaticoDD;});
$.CheckNeumaticoTI.addEventListener("click",function(){changeTextColor("NeumaticoTI",!model.NeumaticoTI); model.NeumaticoTI = !model.NeumaticoTI;});
$.CheckNeumaticoTD.addEventListener("click",function(){changeTextColor("NeumaticoTD",!model.NeumaticoTD); model.NeumaticoTD = !model.NeumaticoTD;});

if(OS_ANDROID){
	$.VencimientoMatafuegoRow.addEventListener("click",
		function(){
			//Si el sistema operativo es android se setean los eventos caracteristicos
			$.dpVencimientoMatafuego.showDatePickerDialog({
			  value: model.VencimientoMatafuego ? new Date(model.VencimientoMatafuego) : new Date(),
			  callback: function(e) {
			  		if(!e.cancel){
			  			model.VencimientoMatafuego = moment(e.value).format('YYYY/MM/DD');
			  			$.VencimientoMatafuego.text = model.VencimientoMatafuego;	
			  		}
				}
			});
		}
	);
	
	$.UltimaRevisionTecnicaRow.addEventListener("click",
		function(){
			//Si el sistema operativo es android se setean los eventos caracteristicos
			$.dpUltimaRevisionTecnica.showDatePickerDialog({
			  value: model.UltimaRevisionTecnica ? new Date(model.UltimaRevisionTecnica) : new Date(),
			  callback: function(e) {
			  		if(!e.cancel){
			  			model.UltimaRevisionTecnica = moment(e.value).format('YYYY/MM/DD');
			  			$.UltimaRevisionTecnica.text = model.UltimaRevisionTecnica;
			  		}
				}
			});
		}
	);
	
	$.FechaVTVRow.addEventListener("click",
		function(){
			//Si el sistema operativo es android se setean los eventos caracteristicos
			$.dpFechaVTV.showDatePickerDialog({
			  value: model.FechaVTV ? new Date(model.FechaVTV) : new Date(),
			  callback: function(e) {
			  		if(!e.cancel){
			  			model.FechaVTV = moment(e.value).format('YYYY/MM/DD');
			  			$.FechaVTV.text = model.FechaVTV;
			  		}
				}
			});
		}
	);
}
else{
	$.dpVencimientoMatafuego.visible = true;
	$.dpUltimaRevisionTecnica.visible = true;
	$.dpFechaVTV.visible = true;	
}
