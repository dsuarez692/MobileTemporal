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
		model.ConsecuenciasHumanas = false;
		model.DaniosMateriales = false;
		model.Normas = false;
		model.Experiencia = false;
		model.Aprendizaje = false;
		model.Eventual = false;
		model.UtilizabanElementos = false;
		model.Lesiones = false;
		model.Craneo = false;
		model.Boca = false;
		model.Cuello = false;
		model.Nariz = false;
		model.Ojo = false;
		model.Oreja = false;
		model.Abdomen = false;
		model.Cintura = false;
		model.Espalda = false;
		model.Hombro = false;
		model.Pellvis = false;
		model.Torax = false;
		model.Brazo = false;
		model.Muñeca = false;
		model.Mano = false;
		model.Desdos = false;
		model.Pierna = false;
		model.Pie = false;
		model.DedosPie = false;
		model.Otros = false;
		models.setWISEModel(model);
	}
	changeTextColor("ConsecuenciasHumanas",model.ConsecuenciasHumanas);
	changeTextColor("DaniosMateriales",model.DaniosMateriales);
	changeTextColor("Normas",model.Normas);
	changeTextColor("Experiencia",model.Experiencia);
	changeTextColor("Aprendizaje",model.Aprendizaje); 
	changeTextColor("Eventual",model.Eventual); 
	changeTextColor("UtilizabanElementos",model.UtilizabanElementos);
	changeTextColor("Lesiones",model.Lesiones);
	changeTextColor("Craneo",model.Craneo);
	changeTextColor("Boca",model.Boca);
	changeTextColor("Cuello",model.Cuello);
	changeTextColor("Nariz",model.Nariz); 
	changeTextColor("Ojo",model.Ojo);
	changeTextColor("Oreja",model.Oreja); 
	changeTextColor("Abdomen",model.Abdomen); 
	changeTextColor("Cintura",model.Cintura);
	changeTextColor("Espalda",model.Espalda);
	changeTextColor("Hombro",model.Hombro); 
	changeTextColor("Pellvis",model.Pellvis); 
	changeTextColor("Torax",model.Torax); 
	changeTextColor("Brazo",model.Brazo);
	changeTextColor("Muñeca",model.Muñeca);
	changeTextColor("Mano",model.Mano);
	changeTextColor("Desdos",model.Desdos); 
	changeTextColor("Pierna",model.Pierna); 
	changeTextColor("Pie",model.Pie); 
	changeTextColor("DedosPie",model.DedosPie); 
	changeTextColor("Otros",model.Otros);

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

function changeTextColor(campo,value){
	var color = "#057699"; //Celeste
	var image = "/media/image36.png";
	
	if(!value){
		color = "#EDC200";	
		image = "/media/image37.png";
	}

	switch(campo){
		case "ConsecuenciasHumanas":{
			$.lblConsecuenciasHumanas.color = color;
			$.iconConsecuenciasHumanas.backgroundImage = image;
			break;
		}
		case "DaniosMateriales":{
			$.lblDaniosMateriales.color = color;
			$.iconDaniosMateriales.backgroundImage = image;
			break;
		}
		case "Normas":{
			$.lblNormas.color = color;
			$.iconNormas.backgroundImage = image;
			break;
		}
		case "Experiencia":{
			$.lblExperiencia.color = color;
			$.iconExperiencia.backgroundImage = image;
			break;
		}
		case "Aprendizaje":{
			$.lblAprendizaje.color = color;
			$.iconAprendizaje.backgroundImage = image;
			break;
		}
		case "Eventual":{
			$.lblEventual.color = color;
			$.iconEventual.backgroundImage = image;
			break;
		}
		case "UtilizabanElementos":{
			$.lblUtilizabanElementos.color = color;
			$.iconUtilizabanElementos.backgroundImage = image;
			break;
		}
		case "Lesiones":{
			$.lblLesiones.color = color;
			$.iconLesiones.backgroundImage = image;
			break;
		}
		case "Craneo":{
			$.lblCraneo.color = color;
			$.iconCraneo.backgroundImage = image;
			break;
		}
		case "Boca":{
			$.lblBoca.color = color;
			$.iconBoca.backgroundImage = image;
			break;
		}
		case "Cuello":{
			$.lblCuello.color = color;
			$.iconCuello.backgroundImage = image;
			break;
		}
		case "Nariz":{
			$.lblNariz.color = color;
			$.iconNariz.backgroundImage = image;
			break;
		}
		case "Ojo":{
			$.lblOjo.color = color;
			$.iconOjo.backgroundImage = image;
			break;
		}
		case "Oreja":{
			$.lblOreja.color = color;
			$.iconOreja.backgroundImage = image;
			break;
		}
		case "Abdomen":{
			$.lblAbdomen.color = color;
			$.iconAbdomen.backgroundImage = image;
			break;
		}
		case "Cintura":{
			$.lblCintura.color = color;
			$.iconCintura.backgroundImage = image;
			break;
		}
		case "Espalda":{
			$.lblEspalda.color = color;
			$.Hombro.backgroundImage = image;
			break;
		}
		case "Hombro":{
			$.lblHombro.color = color;
			$.iconHombro.backgroundImage = image;
			break;
		}
		case "Pellvis":{
			$.lblPellvis.color = color;
			$.iconPellvis.backgroundImage = image;
			break;
		}
		case "Torax":{
			$.lblTorax.color = color;
			$.iconTorax.backgroundImage = image;
			break;
		}
		case "Brazo":{
			$.lblBrazo.color = color;
			$.iconBrazo.backgroundImage = image;
			break;
		}
		case "Muñeca":{
			$.lblMuñeca.color = color;
			$.iconMuñeca.backgroundImage = image;
			break;
		}
		case "Mano":{
			$.lblMano.color = color;
			$.iconMano.backgroundImage = image;
			break;
		}
		case "Desdos":{
			$.lblDesdos.color = color;
			$.iconDesdos.backgroundImage = image;
			break;
		}
		case "Pierna":{
			$.lblPierna.color = color;
			$.iconPierna.backgroundImage = image;
			break;
		}
		case "Pie":{
			$.lblPie.color = color;
			$.iconPie.backgroundImage = image;
			break;
		}
		case "DedosPie":{
			$.lblDedosPie.color = color;
			$.iconDedosPie.backgroundImage = image;
			break;
		}
		case "Otros":{
			$.lblOtros.color = color;
			$.iconOtros.backgroundImage = image;
			break;
		}
	};
}

$.lineFreshDairy.addEventListener("click",function(e){ ChangeProductLine("lineFreshDairy"); });
$.lineEarlyLife.addEventListener("click",function(e){ ChangeProductLine("lineEarlyLife"); });
$.lineWaters.addEventListener("click",function(e){ ChangeProductLine("lineWaters"); });
$.lineMedical.addEventListener("click",function(e){ ChangeProductLine("lineMedical"); });	

$.CheckConsecuenciasHumanas.addEventListener("click",function(){changeTextColor("ConsecuenciasHumanas",!model.ConsecuenciasHumanas); model.ConsecuenciasHumanas = !model.ConsecuenciasHumanas;});
$.CheckDaniosMateriales.addEventListener("click",function(){changeTextColor("DaniosMateriales",!model.DaniosMateriales); model.DaniosMateriales = !model.DaniosMateriales;});
$.CheckNormas.addEventListener("click",function(){changeTextColor("Normas",!model.Normas); model.Normas = !model.Normas;});
$.CheckExperiencia.addEventListener("click",function(){changeTextColor("Experiencia",!model.Experiencia); model.Experiencia = !model.Experiencia;});
$.CheckAprendizaje.addEventListener("click",function(){changeTextColor("Aprendizaje",!model.Aprendizaje); model.Aprendizaje = !model.Aprendizaje;});
$.CheckEventual.addEventListener("click",function(){changeTextColor("Eventual",!model.Eventual); model.Eventual = !model.Eventual;});
$.CheckUtilizabanElementos.addEventListener("click",function(){changeTextColor("UtilizabanElementos",!model.UtilizabanElementos); model.UtilizabanElementos = !model.UtilizabanElementos;});
$.CheckLesiones.addEventListener("click",function(){changeTextColor("Lesiones",!model.Lesiones); model.Lesiones = !model.Lesiones;});
$.CheckCraneo.addEventListener("click",function(){changeTextColor("Craneo",!model.Craneo); model.Craneo = !model.Craneo;});
$.CheckBoca.addEventListener("click",function(){changeTextColor("Boca",!model.Boca); model.Boca = !model.Boca;});
$.CheckCuello.addEventListener("click",function(){changeTextColor("Cuello",!model.Cuello); model.Cuello = !model.Cuello;});
$.CheckNariz.addEventListener("click",function(){changeTextColor("Nariz",!model.Nariz); model.Nariz = !model.Nariz;});
$.CheckOjo.addEventListener("click",function(){changeTextColor("Ojo",!model.Ojo); model.Ojo = !model.Ojo;});
$.CheckOreja.addEventListener("click",function(){changeTextColor("Oreja",!model.Oreja); model.Oreja = !model.Oreja;});
$.CheckAbdomen.addEventListener("click",function(){changeTextColor("Abdomen",!model.Abdomen); model.Abdomen = !model.Abdomen;});
$.CheckCintura.addEventListener("click",function(){changeTextColor("Cintura",!model.Cintura); model.Cintura = !model.Cintura;});
$.CheckEspalda.addEventListener("click",function(){changeTextColor("Espalda",!model.Espalda); model.Espalda = !model.Espalda;});
$.CheckHombro.addEventListener("click",function(){changeTextColor("Hombro",!model.Hombro); model.Hombro = !model.Hombro;});
$.CheckPellvis.addEventListener("click",function(){changeTextColor("Pellvis",!model.Pellvis); model.Pellvis = !model.Pellvis;});
$.CheckTorax.addEventListener("click",function(){changeTextColor("Torax",!model.Torax); model.Torax = !model.Torax;});
$.CheckBrazo.addEventListener("click",function(){changeTextColor("Brazo",!model.Brazo); model.Torax = !model.Brazo;});
$.CheckMuñeca.addEventListener("click",function(){changeTextColor("Muñeca",!model.Muñeca); model.Muñeca = !model.Muñeca;});
$.CheckMano.addEventListener("click",function(){changeTextColor("Mano",!model.Mano); model.Mano = !model.Mano;});
$.CheckDesdos.addEventListener("click",function(){changeTextColor("Desdos",!model.Desdos); model.Desdos = !model.Desdos;});
$.CheckPierna.addEventListener("click",function(){changeTextColor("Pierna",!model.Pierna); model.Pierna = !model.Pierna;});
$.CheckPie.addEventListener("click",function(){changeTextColor("Pie",!model.Pie); model.Pie = !model.Pie;});
$.CheckDedosPie.addEventListener("click",function(){changeTextColor("DedosPie",!model.DedosPie); model.DedosPie = !model.DedosPie;});
$.CheckDedosPie.addEventListener("click",function(){changeTextColor("Otros",!model.Otros); model.Otros = !model.Otros;});