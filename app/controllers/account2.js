var controls = require('controls');
var persistence = require('persistence');

var user = persistence.getUserData();

function ResetProductLine(){
	$.lineFreshDairy.backgroundImage = "/media/danone-08.png";
	$.lineEarlyLife.backgroundImage = "/media/danone-07.png";
	$.lineWaters.backgroundImage = "/media/danone-06.png";
	$.lineMedical.backgroundImage = "/media/danone-05.png";
}

exports.validateData = function (){
	if($.bossname.value == ""){
		alert('Debe ingresar el nombre de la persona a la que reporta');
		return false;
	}
	if($.bosslast.value == ""){
		alert('Debe ingresar el apellido de la persona a la que reporta');
		return false;
	}
	return true;
};

exports.resetView = function(){
	$.bossname.value = "";
	$.bosslast.value = "";
	$.appTitleLabel.text = 'Mi cuenta';
	$.collapsibleMenu.top = -600;
	controls.removeAllViews($.collapsibleMenu);
	var funcVacia = function(){};
	$.collapsibleMenu.removeEventListener('click', funcVacia);
	loadDefaultValues();
};

function loadDefaultValues(){
	ResetProductLine();
	if(user != null && user.name != undefined){
		$.sector.value = user.sector;
		$.bossname.value = user.bossname;
		$.bosslast.value = user.bosslast;
		$.comercial.value = user.Comercial;
		switch(user.Comercial){
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
}

loadDefaultValues();
