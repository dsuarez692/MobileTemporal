var controls = require('controls');

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
	if($.args.name != undefined){
		$.sector.value = $.args.sector;
		$.bossname.value = $.args.bossname;
		$.bosslast.value = $.args.bosslast;
	}
}
loadDefaultValues();
