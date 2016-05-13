var controls = require("controls");

var model = {
	ReportTittle: "Auditoría de manejo",
	Subtitle: "SELECCIONE LÍNEA DE NEGOCIO A AUDITAR"	
};

init(model);

function init(model){
	$.reportName.text = model.ReportTittle;//"Auditoría de manejo";
	
	var style = $.createStyle({
        classes: 'colorBlue'
    });	
    
   
	var v=Ti.UI.createView({
		height: '30dp',
		width: Ti.UI.SIZE,
		top:'0dp'
	});	
	
	var text=Ti.UI.createLabel({
		text: model.Subtitle
	});	
	
	text.applyProperties(style);
	v.add(text);
	
	$.form.add(v);
};
