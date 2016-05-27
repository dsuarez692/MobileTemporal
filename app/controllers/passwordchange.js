var controls = require('controls');
var persistence = require('persistence');

var user = persistence.getUserData();

function validateData(){
	
}

exports.resetView = function(){
	Ti.API.info('Reseteo passchange');
	$.appTitleLabel.text = 'Mi cuenta';
	$.collapsibleMenu.top = -600;
	controls.removeAllViews($.collapsibleMenu);
	var funcVacia = function(){};
	$.collapsibleMenu.removeEventListener('click', funcVacia);
	loadDefaultValues();
};

function loadDefaultValues(){
	if(user != null && user.name != undefined){
		$.userName.text = user.username;
	}
}

loadDefaultValues();
