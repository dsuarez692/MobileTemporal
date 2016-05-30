var controls = require('controls');
var persistence = require('persistence');

var user = persistence.getUserData();

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
	if(user != null && user.name != undefined){
		$.sector.value = user.sector;
		$.bossname.value = user.bossname;
		$.bosslast.value = user.bosslast;
	}
}

loadDefaultValues();
