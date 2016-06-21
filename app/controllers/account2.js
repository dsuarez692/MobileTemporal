var controls = require('controls');
var persistence = require('persistence');

var user = persistence.getUserData();

var _Sector = "";

exports.getSector = function(){
	return _Sector;
};

var _Comercial = "";

exports.getLineaComercial = function(){
	return _Comercial;
};

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

function ChangeProductLine(value){
	ResetProductLine();
	_Comercial = value;
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
		$.sector.setSelectedRow(0, user.sector, false);
		$.bossname.value = user.bossname;
		$.bosslast.value = user.bosslast;
		_Comercial = user.Comercial;
		_Sector = user.sector;
		Ti.API.info(user.Comercial);
		ChangeProductLine(user.Comercial);
	}
}

function changeSector(value){
	Ti.API.info(value);
	_Sector = value;
}

$.sector.addEventListener("change",function(e){ changeSector(e.rowIndex); });

$.lineFreshDairy.addEventListener("click",function(e){ ChangeProductLine("lineFreshDairy"); });
$.lineEarlyLife.addEventListener("click",function(e){ ChangeProductLine("lineEarlyLife"); });
$.lineWaters.addEventListener("click",function(e){ ChangeProductLine("lineWaters"); });
$.lineMedical.addEventListener("click",function(e){ ChangeProductLine("lineMedical"); });	

loadDefaultValues();
