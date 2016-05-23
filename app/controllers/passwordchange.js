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
};

function changeColor(e){
	if(e.type == 'touchstart'){
		if(e.source.id=='continueBtn'){
			e.source.backgroundColor = '#3f8fac';
		}
		if(e.source.id=='cancelBtn'){
			e.source.backgroundColor = '#cecece';
		}
	}
	if(e.type == 'touchend'){
		if(e.source.id=='continueBtn'){
			e.source.backgroundColor = '#1f4e79';
		}
		if(e.source.id=='cancelBtn'){
			e.source.backgroundColor = '#FFFFFF';
		}
	}
}

function loadDefaultValues(){
	if($.args.name != undefined){
		$.userName.text = $.args.username;
	}
}

loadDefaultValues();
