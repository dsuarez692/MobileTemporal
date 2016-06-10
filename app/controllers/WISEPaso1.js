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
	if(model.Cinturon == undefined){
		model.Cinturon = true;
		model.Luces = true;
		model.Frenos = true;
		model.Estacionamiento = true;
		model.Velocidades = true;
		model.Guiño = true;
		model.Distancia = true;
		model.DistanciaCirc = true;
		model.Normas = true;
		model.Celular = true;
		model._Page = 1;
		model.Observaciones = '';
		model.NombreChofer = '';
		model.ApellidoChofer = '';
		model.Patente = '';

		models.setWISEModel(model);
	}
	changeTextColor("Cinturon",model.Cinturon);
	changeTextColor("Luces",model.Luces);
	changeTextColor("Frenos",model.Frenos);
	changeTextColor("Estacionamiento",model.Estacionamiento);
	changeTextColor("Velocidades",model.Velocidades);
	changeTextColor("Guiño",model.Guiño);
	changeTextColor("Distancia",model.Distancia);
	changeTextColor("DistanciaCirc",model.DistanciaCirc);
	changeTextColor("Normas",model.Normas);
	changeTextColor("Celular",model.Celular);
	
	$.name.value = model.NombreChofer;
	$.last.value = model.ApellidoChofer;
	$.patente.value = model.Patente;
	
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
	var valid = true;
	var dialog = Ti.UI.createAlertDialog({
	    message: 'El campo Nombre del chofer es requerido.',
	    ok: 'Okay',
	    title: 'Error de Validación'
	  });
    
	switch(true){
		case model.NombreChofer == "":
			valid = false;
			break;
		case model.ApellidoChofer == "":
			dialog.message = 'El campo Apellido del Chofer es requerido.';
			valid = false;	
			break;
		case model.Patente == "":
			dialog.message = 'El campo Patente del Vehículo es requerido.';
			valid = false;	
			break;	
		case (model.RequiredPic && (!model.Image || model.Image.length == 0)):
			dialog.message = 'Se debe adjuntar al menos una imagen.';
			valid = false;	
			break;
		case (!model.Comercial || model.Comercial == ""):
			dialog.message = 'Se debe indicar la linea de negocio.';
			valid = false;	
			break;
	};
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
		case "Cinturon":{
			$.lblCinturon.color = color;
			$.iconCinturon.backgroundImage = image;
			break;
		}
		case "Luces":{
			$.lblLuces.color = color;
			$.iconLuces.backgroundImage = image;
			break;
		}
		case "Frenos":{
			$.lblFreno.color = color;
			$.iconFreno.backgroundImage = image;
			break;
		}
		case "Estacionamiento":{
			$.lblEstacionamiento.color = color;
			$.iconEstacionamiento.backgroundImage = image;
			break;
		}
		case "Velocidades":{
			$.lblVelocidades.color = color;
			$.iconVelocidades.backgroundImage = image;
			break;
		}
		case "Guiño":{
			$.lblGuiño.color = color;
			$.iconGuiño.backgroundImage = image;
			break;
		}
		case "Distancia":{
			$.lblDistancia.color = color;
			$.iconDistancia.backgroundImage = image;
			break;
		}
		case "DistanciaCirc":{
			$.lblDistanciaCirc.color = color;
			$.iconDistanciaCirc.backgroundImage = image;
			break;
		}
		case "Normas":{
			$.lblNormas.color = color;
			$.iconNormas.backgroundImage = image;
			break;
		}
		case "Celular":{
			$.lblCelular.color = color;
			$.iconCelular.backgroundImage = image;
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

$.name.addEventListener("change",function(){model.NombreChofer = $.name.value;});
$.last.addEventListener("change",function(){model.ApellidoChofer = $.last.value;});
$.patente.addEventListener("change",function(){model.Patente = $.patente.value;});

$.CheckCinturon.addEventListener("click",function(){changeTextColor("Cinturon",!model.Cinturon); model.Cinturon = !model.Cinturon;});
$.CheckLuces.addEventListener("click",function(){changeTextColor("Luces",!model.Luces); model.Luces = !model.Luces;});
$.CheckFreno.addEventListener("click",function(){changeTextColor("Frenos",!model.Frenos); model.Frenos = !model.Frenos;});
$.CheckEstacionamiento.addEventListener("click",function(){changeTextColor("Estacionamiento",!model.Estacionamiento); model.Estacionamiento = !model.Estacionamiento;});
$.CheckVelocidades.addEventListener("click",function(){changeTextColor("Velocidades",!model.Velocidades); model.Velocidades = !model.Velocidades;});
$.CheckGuiño.addEventListener("click",function(){changeTextColor("Guiño",!model.Guiño); model.Guiño = !model.Guiño;});
$.CheckDistancia.addEventListener("click",function(){changeTextColor("Distancia",!model.Distancia); model.Distancia = !model.Distancia;});
$.CheckDistanciaCirc.addEventListener("click",function(){changeTextColor("DistanciaCirc",!model.DistanciaCirc); model.DistanciaCirc = !model.DistanciaCirc;});
$.CheckNormas.addEventListener("click",function(){changeTextColor("Normas",!model.Normas); model.Normas = !model.Normas;});
$.CheckCelular.addEventListener("click",function(){changeTextColor("Celular",!model.Celular); model.Celular = !model.Celular;});
