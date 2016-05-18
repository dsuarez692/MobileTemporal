// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var model = {
	Cinturon : true,
	Luces : true,
	Frenos : true
};

function changeTextColor(model,value){
	var color = "#057699";
	var image = "/media/image36.png";
	
	if(!value){
		color = "#EDC200";	
		image = "/media/image37.png";
	}

	switch(model){
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



