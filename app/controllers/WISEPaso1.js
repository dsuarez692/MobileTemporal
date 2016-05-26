// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var controls=require('controls');
var models=require('models');
var model = {};

exports.LoadFromModel = function(modelo,view,Page){
	model = modelo;
	if(model.Cinturon == undefined){
		model = {
			Cinturon : true,
			Luces : true,
			Frenos : true,
			Estacionamiento : true,
			Velocidades : true,
			Guiño : true,
			Distancia : true,
			DistanciaCirc : true,
			Normas : true,
			Celular : true,
			_Page : 1
		};
		models.setWISEModel(model);
	}
	changeTextColor("Cinturon",model.Cinturon);
	changeTextColor("Luces",model.Luces);
	changeTextColor("Frenos",model.Frenos);
	changeTextColor("Estacionamiento",model.Frenos);
	changeTextColor("Velocidades",model.Frenos);
	changeTextColor("Guiño",model.Frenos);
	changeTextColor("Distancia",model.Frenos);
	changeTextColor("DistanciaCirc",model.Frenos);
	changeTextColor("Normas",model.Frenos);
	changeTextColor("Celular",model.Frenos);
	ProcessPage(model._Page);
};

function ResetPage(){
	$.CheckCinturon.hide();
	$.CheckLuces.hide();
	$.CheckFreno.hide();
	$.CheckEstacionamiento.hide();
	$.CheckVelocidades.hide();
	$.CheckGuiño.hide();
	$.CheckDistancia.hide();
	$.CheckDistanciaCirc.hide();
	$.CheckNormas.hide();
	$.CheckCelular.hide();		
}



function ProcessPage(newPage){
	ResetPage();
	models.getWISEModel()._Page	= newPage;
	switch(newPage)
	{
		case 1:{
			$.CheckCinturon.show();
			$.CheckLuces.show();
			$.CheckFreno.show();
			break;
		}	
		case 2:{
			$.CheckEstacionamiento.show();
			$.CheckVelocidades.show();
			$.CheckGuiño.show();
			$.CheckDistancia.show();
			break;
		}	
		case 3:{
			$.CheckDistanciaCirc.show();
			$.CheckNormas.show();
			$.CheckCelular.show();	
			break;
		}	
	}
};

exports.changePage = function(Page){
		
	ProcessPage(Page);		
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
