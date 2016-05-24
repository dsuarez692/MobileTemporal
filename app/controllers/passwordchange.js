var controls = require('controls');


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
	if($.args.name != undefined){
		$.userName.text = $.args.username;
	}
}

loadDefaultValues();
