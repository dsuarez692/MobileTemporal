// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var controls=require('controls');
var model = {};

exports.LoadFromModel = function(modelo,view){
	model = modelo;
	if(model.Cinturon == undefined){
		model = {
			Cinturon : true,
			Luces : true,
			Frenos : true
		};
	}
	changeTextColor("Cinturon",model.Cinturon);
	changeTextColor("Luces",model.Luces);
	changeTextColor("Frenos",model.Frenos);
	$.CheckEstacionamiento.height=0;
	
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
	};
}

$.CheckCinturon.addEventListener("click",function(){changeTextColor("Cinturon",!model.Cinturon); model.Cinturon = !model.Cinturon;});
$.CheckLuces.addEventListener("click",function(){changeTextColor("Luces",!model.Luces); model.Luces = !model.Luces;});
$.CheckFreno.addEventListener("click",function(){changeTextColor("Frenos",!model.Frenos); model.Frenos = !model.Frenos;});



