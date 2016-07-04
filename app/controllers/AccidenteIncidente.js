// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var controls=require('controls');
var models=require('models');
var persistence = require("persistence");

var model = {};
var user = {};


exports.LoadFromModel = function(modelo,view,Page){
	model = modelo;
	user = persistence.getUserData();
	if(model.Balizas == undefined){
		model._Page = 1;
		model.DNI = '';
		model.Observaciones = '';
		model.ConsecuenciasHumanas = false;
		model.DaniosMateriales = false;
		model.Normas = false;
		model.Experiencia = false;
		model.Aprendizaje = false;
		model.Eventual = false;
		model.UtilizabanElementos = false;
		model.Lesiones = false;
		model.Craneo = false;
		model.Boca = false;
		model.Cuello = false;
		model.Nariz = false;
		model.Ojo = false;
		model.Oreja = false;
		model.Abdomen = false;
		model.Cintura = false;
		model.Espalda = false;
		model.Hombro = false;
		model.Pellvis = false;
		model.Torax = false;
		model.Brazo = false;
		model.Muñeca = false;
		model.Mano = false;
		model.Desdos = false;
		model.Pierna = false;
		model.Pie = false;
		model.DedosPie = false;
		model.Otros = false;
		
		model.Tipo = 'Seleccione';
		model.TipoIndex = 0;
		model.TipoTareas = 'Seleccione';
		model.TipoTareasIndex = 0;
		model.Seccion = 'Seleccione';
		model.SeccionIndex = 0;
		model.Sitio = 'Seleccione';
		model.SitioIndex = 0;
		model.Lugar = 'Seleccione';
		model.LugarIndex = 0;
		model.HorasExtras = 'Seleccione';
		model.HorasExtrasIndex = 0;
		model.EPP = 'Seleccione';
		model.EPPIndex = 0;
		model.Consta = 'Seleccione';
		model.ConstaIndex = 0;
		model.Testigos = 'Seleccione';
		model.TestigosIndex = 0;
		model.Factor = 'Seleccione';
		model.FactorIndex = 0;
		model.Emisferio = 'Seleccione';
		model.EmisferioIndex = 0;
		model.TipoLesion = 'Seleccione';
		model.TipoLesionIndex = 0;
		model.ContinuaTrabajando = 'Seleccione';
		model.ContinuaTrabajandoIndex = 0;
		
		model.NombreAuditor = '';
		model.ApellidoAuditor = '';
		model.DNIAuditor = '';
		model.NombreAccidentado = '';
		model.ApellidoAccidentado = '';
		model.DNIAccidentado = '';
		model.Legajo = '';
		model.Edad = '';
		model.Antiguedad = '';
		model.Puesto = '';
		model.DescripcionHecho = '';
		model.Tarea = '';
		model.DescripcionHechoBreve = '';
		model.nameTestigo1 = '';
		model.lastTestigo1 = '';
		model.nameTestigo2 = '';
		model.lastTestigo2 = '';
		model.nameTestigo3 = '';
		model.lastTestigo3 = '';
		model.DescripcionMedidas = '';
		model.NombreMedico = '';
		model.ApellidoMedico = '';
		model.DescripcionAtencion = '';
		model.Observaciones = '';
		
		models.setWISEModel(model);
	}
	changeTextColor("ConsecuenciasHumanas",model.ConsecuenciasHumanas);
	changeTextColor("DaniosMateriales",model.DaniosMateriales);
	changeTextColor("Normas",model.Normas);
	changeTextColor("Experiencia",model.Experiencia);
	changeTextColor("Aprendizaje",model.Aprendizaje); 
	changeTextColor("Eventual",model.Eventual); 
	changeTextColor("UtilizabanElementos",model.UtilizabanElementos);
	changeTextColor("Lesiones",model.Lesiones);
	changeTextColor("Craneo",model.Craneo);
	changeTextColor("Boca",model.Boca);
	changeTextColor("Cuello",model.Cuello);
	changeTextColor("Nariz",model.Nariz); 
	changeTextColor("Ojo",model.Ojo);
	changeTextColor("Oreja",model.Oreja); 
	changeTextColor("Abdomen",model.Abdomen); 
	changeTextColor("Cintura",model.Cintura);
	changeTextColor("Espalda",model.Espalda);
	changeTextColor("Hombro",model.Hombro); 
	changeTextColor("Pellvis",model.Pellvis); 
	changeTextColor("Torax",model.Torax); 
	changeTextColor("Brazo",model.Brazo);
	changeTextColor("Muñeca",model.Muñeca);
	changeTextColor("Mano",model.Mano);
	changeTextColor("Desdos",model.Desdos); 
	changeTextColor("Pierna",model.Pierna); 
	changeTextColor("Pie",model.Pie); 
	changeTextColor("DedosPie",model.DedosPie); 
	changeTextColor("Otros",model.Otros);

	$.NombreAuditor.value = model.NombreAuditor;
	$.ApellidoAuditor.value = model.ApellidoAuditor;
	$.DNIAuditor.value = model.DNIAuditor = '';
	$.NombreAccidentado.value = model.NombreAccidentado;
	$.ApellidoAccidentado.value = model.ApellidoAccidentado;
	$.DNIAccidentado.value = model.DNIAccidentado;
	$.Legajo.value = model.Legajo;
	$.Edad.value = model.Edad;
	$.Antiguedad.value = model.Antiguedad;
	$.Puesto.value = model.Puesto;
	$.DescripcionHecho.value = model.DescripcionHecho;
	$.Tarea.value = model.Tarea;
	$.DescripcionHechoBreve.value = model.DescripcionHechoBreve;
	$.nameTestigo1.value = model.nameTestigo1;
	$.lastTestigo1.value = model.lastTestigo1;
	$.nameTestigo2.value = model.nameTestigo2;
	$.lastTestigo2.value = model.lastTestigo2;
	$.nameTestigo3.value = model.nameTestigo3;
	$.lastTestigo3.value = model.lastTestigo3;
	$.DescripcionMedidas.value = model.DescripcionMedidas;
	$.NombreMedico.value = model.NombreMedico;
	$.ApellidoMedico.value = model.ApellidoMedico;
	$.DescripcionAtencion.value = model.DescripcionAtencion;


	if(user != undefined && user != null){ //En teoria esta linea no va a ser necesaria
		if(user.Comercial != undefined){
			models.getWISEModel().Comercial = user.Comercial;
			ChangeProductLine(user.Comercial);		
		}
		else{
			ResetProductLine();	
		}	
	}
	else{
		ResetProductLine();
	}
};


exports.GetPrimeraPagina = function(pageNumber){
	$.Tipo.setSelectedRow(0,model.TipoIndex);
	return $.Page1;		
};
exports.GetSegundaPagina = function(pageNumber){
	return $.Page2;		
};
exports.GetTerceraPagina = function(pageNumber){
	return $.Page3;		
};
exports.GetCuartaPagina = function(pageNumber){
	$.TipoTareas.setSelectedRow(0,model.TipoTareasIndex);
	$.Seccion.setSelectedRow(0,model.SeccionIndex);
	return $.Page4;		
};
exports.GetQuintaPagina = function(pageNumber){
	return $.Page5;		
};
exports.GetSextaPagina = function(pageNumber){
	$.Sitio.setSelectedRow(0,model.SitioIndex);
	$.Lugar.setSelectedRow(0,model.LugarIndex);
	return $.Page6;		
};
exports.GetSeptimaPagina = function(pageNumber){
	$.HorasExtras.setSelectedRow(0,model.HorasExtrasIndex);
	$.EPP.setSelectedRow(0,model.EPPIndex);
	return $.Page7;		
};
exports.GetOctavaPagina = function(pageNumber){
	return $.Page8;		
};
exports.GetNovenaPagina = function(pageNumber){
	return $.Page9;		
};
exports.GetDecimaPagina = function(pageNumber){
	$.Consta.setSelectedRow(0,model.ConstaIndex);
	$.Testigos.setSelectedRow(0,model.TestigosIndex);	
	return $.Page10;		
};
exports.GetDecimoPrimeraPagina = function(pageNumber){
	return $.Page11;		
};
exports.GetDecimoSegundaPagina = function(pageNumber){
	$.Factor.setSelectedRow(0,model.FactorIndex);	
	return $.Page12;		
};
exports.GetDecimoTerceraPagina = function(pageNumber){
	return $.Page13;		
};
exports.GetDecimoCuartaPagina = function(pageNumber){
	return $.Page14;		
};
exports.GetDecimoQuintaPagina = function(pageNumber){
	return $.Page15;		
};
exports.GetDecimoSextaPagina = function(pageNumber){
	return $.Page16;		
};
exports.GetDecimoSeptimaPagina = function(pageNumber){
	return $.Page17;		
};
exports.GetDecimoOctavaPagina = function(pageNumber){
	$.Emisferio.setSelectedRow(0,model.EmisferioIndex);	
	$.TipoLesion.setSelectedRow(0,model.TipoLesionIndex);	
	return $.Page18;		
};
exports.GetDecimoNovenaPagina = function(pageNumber){
	return $.Page19;		
};
exports.GetVigesimaPagina = function(pageNumber){
	$.ContinuaTrabajando.setSelectedRow(0,model.ContinuaTrabajandoIndex);	
	return $.Page20;		
};
exports.GetPageCount = function(pageNumber){
	return 20;
};

exports.ValidateData = function(){
	var valid = true;
	var dialog = Ti.UI.createAlertDialog({
	    message: 'Se debe indicar la linea de negocio.',
	    ok: 'Okay',
	    title: 'Error de Validación'
	  });
	  
	switch(true){
		case (!model.Comercial || model.Comercial == ""):
			valid = false;	
			break;
		case (!model.DNI || model.DNI == ""):
			dialog.message = 'El DNI es requerido';
			valid = false;	
			break;
	}
	
	if(!valid){
		dialog.show();	
	}
	
	return valid;		
};


function ResetProductLine(){
	$.lineFreshDairy.backgroundImage = "/media/danone-08.png";
	$.lineEarlyLife.backgroundImage = "/media/danone-07.png";
	$.lineWaters.backgroundImage = "/media/danone-06.png";
	$.lineMedical.backgroundImage = "/media/danone-05.png";
}


function ChangeProductLine(value){
	ResetProductLine();
	models.getWISEModel().Comercial = value;
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

function changeTextColor(campo,value){
	var color = "#057699"; //Celeste
	var image = "/media/image36.png";
	
	if(!value){
		color = "#EDC200";	
		image = "/media/image37.png";
	}

	switch(campo){
		case "ConsecuenciasHumanas":{
			$.lblConsecuenciasHumanas.color = color;
			$.iconConsecuenciasHumanas.backgroundImage = image;
			break;
		}
		case "DaniosMateriales":{
			$.lblDaniosMateriales.color = color;
			$.iconDaniosMateriales.backgroundImage = image;
			break;
		}
		case "Normas":{
			$.lblNormas.color = color;
			$.iconNormas.backgroundImage = image;
			break;
		}
		case "Experiencia":{
			$.lblExperiencia.color = color;
			$.iconExperiencia.backgroundImage = image;
			break;
		}
		case "Aprendizaje":{
			$.lblAprendizaje.color = color;
			$.iconAprendizaje.backgroundImage = image;
			break;
		}
		case "Eventual":{
			$.lblEventual.color = color;
			$.iconEventual.backgroundImage = image;
			break;
		}
		case "UtilizabanElementos":{
			$.lblUtilizabanElementos.color = color;
			$.iconUtilizabanElementos.backgroundImage = image;
			break;
		}
		case "Lesiones":{
			$.lblLesiones.color = color;
			$.iconLesiones.backgroundImage = image;
			break;
		}
		case "Craneo":{
			$.lblCraneo.color = color;
			$.iconCraneo.backgroundImage = image;
			break;
		}
		case "Boca":{
			$.lblBoca.color = color;
			$.iconBoca.backgroundImage = image;
			break;
		}
		case "Cuello":{
			$.lblCuello.color = color;
			$.iconCuello.backgroundImage = image;
			break;
		}
		case "Nariz":{
			$.lblNariz.color = color;
			$.iconNariz.backgroundImage = image;
			break;
		}
		case "Ojo":{
			$.lblOjo.color = color;
			$.iconOjo.backgroundImage = image;
			break;
		}
		case "Oreja":{
			$.lblOreja.color = color;
			$.iconOreja.backgroundImage = image;
			break;
		}
		case "Abdomen":{
			$.lblAbdomen.color = color;
			$.iconAbdomen.backgroundImage = image;
			break;
		}
		case "Cintura":{
			$.lblCintura.color = color;
			$.iconCintura.backgroundImage = image;
			break;
		}
		case "Espalda":{
			$.lblEspalda.color = color;
			$.iconEspalda.backgroundImage = image;
			break;
		}
		case "Hombro":{
			$.lblHombro.color = color;
			$.iconHombro.backgroundImage = image;
			break;
		}
		case "Pellvis":{
			$.lblPellvis.color = color;
			$.iconPellvis.backgroundImage = image;
			break;
		}
		case "Torax":{
			$.lblTorax.color = color;
			$.iconTorax.backgroundImage = image;
			break;
		}
		case "Brazo":{
			$.lblBrazo.color = color;
			$.iconBrazo.backgroundImage = image;
			break;
		}
		case "Muñeca":{
			$.lblMuñeca.color = color;
			$.iconMuñeca.backgroundImage = image;
			break;
		}
		case "Mano":{
			$.lblMano.color = color;
			$.iconMano.backgroundImage = image;
			break;
		}
		case "Desdos":{
			$.lblDesdos.color = color;
			$.iconDesdos.backgroundImage = image;
			break;
		}
		case "Pierna":{
			$.lblPierna.color = color;
			$.iconPierna.backgroundImage = image;
			break;
		}
		case "Pie":{
			$.lblPie.color = color;
			$.iconPie.backgroundImage = image;
			break;
		}
		case "DedosPie":{
			$.lblDedosPie.color = color;
			$.iconDedosPie.backgroundImage = image;
			break;
		}
		case "Otros":{
			$.lblOtros.color = color;
			$.iconOtros.backgroundImage = image;
			break;
		}
	};
}

$.lineFreshDairy.addEventListener("click",function(e){ ChangeProductLine("lineFreshDairy"); });
$.lineEarlyLife.addEventListener("click",function(e){ ChangeProductLine("lineEarlyLife"); });
$.lineWaters.addEventListener("click",function(e){ ChangeProductLine("lineWaters"); });
$.lineMedical.addEventListener("click",function(e){ ChangeProductLine("lineMedical"); });	

$.CheckConsecuenciasHumanas.addEventListener("click",function(){changeTextColor("ConsecuenciasHumanas",!model.ConsecuenciasHumanas); model.ConsecuenciasHumanas = !model.ConsecuenciasHumanas;});
$.CheckDaniosMateriales.addEventListener("click",function(){changeTextColor("DaniosMateriales",!model.DaniosMateriales); model.DaniosMateriales = !model.DaniosMateriales;});
$.CheckNormas.addEventListener("click",function(){changeTextColor("Normas",!model.Normas); model.Normas = !model.Normas;});
$.CheckExperiencia.addEventListener("click",function(){changeTextColor("Experiencia",!model.Experiencia); model.Experiencia = !model.Experiencia;});
$.CheckAprendizaje.addEventListener("click",function(){changeTextColor("Aprendizaje",!model.Aprendizaje); model.Aprendizaje = !model.Aprendizaje;});
$.CheckEventual.addEventListener("click",function(){changeTextColor("Eventual",!model.Eventual); model.Eventual = !model.Eventual;});
$.CheckUtilizabanElementos.addEventListener("click",function(){changeTextColor("UtilizabanElementos",!model.UtilizabanElementos); model.UtilizabanElementos = !model.UtilizabanElementos;});
$.CheckLesiones.addEventListener("click",function(){changeTextColor("Lesiones",!model.Lesiones); model.Lesiones = !model.Lesiones;});
$.CheckCraneo.addEventListener("click",function(){changeTextColor("Craneo",!model.Craneo); model.Craneo = !model.Craneo;});
$.CheckBoca.addEventListener("click",function(){changeTextColor("Boca",!model.Boca); model.Boca = !model.Boca;});
$.CheckCuello.addEventListener("click",function(){changeTextColor("Cuello",!model.Cuello); model.Cuello = !model.Cuello;});
$.CheckNariz.addEventListener("click",function(){changeTextColor("Nariz",!model.Nariz); model.Nariz = !model.Nariz;});
$.CheckOjo.addEventListener("click",function(){changeTextColor("Ojo",!model.Ojo); model.Ojo = !model.Ojo;});
$.CheckOreja.addEventListener("click",function(){changeTextColor("Oreja",!model.Oreja); model.Oreja = !model.Oreja;});
$.CheckAbdomen.addEventListener("click",function(){changeTextColor("Abdomen",!model.Abdomen); model.Abdomen = !model.Abdomen;});
$.CheckCintura.addEventListener("click",function(){changeTextColor("Cintura",!model.Cintura); model.Cintura = !model.Cintura;});
$.CheckEspalda.addEventListener("click",function(){changeTextColor("Espalda",!model.Espalda); model.Espalda = !model.Espalda;});
$.CheckHombro.addEventListener("click",function(){changeTextColor("Hombro",!model.Hombro); model.Hombro = !model.Hombro;});
$.CheckPellvis.addEventListener("click",function(){changeTextColor("Pellvis",!model.Pellvis); model.Pellvis = !model.Pellvis;});
$.CheckTorax.addEventListener("click",function(){changeTextColor("Torax",!model.Torax); model.Torax = !model.Torax;});
$.CheckBrazo.addEventListener("click",function(){changeTextColor("Brazo",!model.Brazo); model.Torax = !model.Brazo;});
$.CheckMuñeca.addEventListener("click",function(){changeTextColor("Muñeca",!model.Muñeca); model.Muñeca = !model.Muñeca;});
$.CheckMano.addEventListener("click",function(){changeTextColor("Mano",!model.Mano); model.Mano = !model.Mano;});
$.CheckDesdos.addEventListener("click",function(){changeTextColor("Desdos",!model.Desdos); model.Desdos = !model.Desdos;});
$.CheckPierna.addEventListener("click",function(){changeTextColor("Pierna",!model.Pierna); model.Pierna = !model.Pierna;});
$.CheckPie.addEventListener("click",function(){changeTextColor("Pie",!model.Pie); model.Pie = !model.Pie;});
$.CheckDedosPie.addEventListener("click",function(){changeTextColor("DedosPie",!model.DedosPie); model.DedosPie = !model.DedosPie;});
$.CheckOtros.addEventListener("click",function(){changeTextColor("Otros",!model.Otros); model.Otros = !model.Otros;});

$.Tipo.addEventListener('change', function(e) { model.Tipo = $.Tipo.getSelectedRow(0).id; model.TipoIndex = e.rowIndex; });
$.TipoTareas.addEventListener('change', function(e) { model.TipoTareas = $.TipoTareas.getSelectedRow(0).id; model.TipoTareasIndex = e.rowIndex; });
$.Seccion.addEventListener('change', function(e) { model.Seccion = $.Seccion.getSelectedRow(0).id; model.SeccionIndex = e.rowIndex; });
$.Sitio.addEventListener('change', function(e) { model.Sitio = $.Sitio.getSelectedRow(0).id; model.SitioIndex = e.rowIndex; });
$.Lugar.addEventListener('change', function(e) { model.Lugar = $.Lugar.getSelectedRow(0).id; model.LugarIndex = e.rowIndex; });
$.HorasExtras.addEventListener('change', function(e) { model.HorasExtras = $.HorasExtras.getSelectedRow(0).id; model.HorasExtrasIndex = e.rowIndex; });
$.EPP.addEventListener('change', function(e) { model.EPP = $.EPP.getSelectedRow(0).id; model.EPPIndex = e.rowIndex; });
$.Consta.addEventListener('change', function(e) { model.Consta = $.Consta.getSelectedRow(0).id; model.ConstaIndex = e.rowIndex; });
$.Testigos.addEventListener('change', function(e) { model.Testigos = $.Testigos.getSelectedRow(0).id; model.TestigosIndex = e.rowIndex; });
$.Factor.addEventListener('change', function(e) { model.Factor = $.Factor.getSelectedRow(0).id; model.FactorIndex = e.rowIndex; });
$.Emisferio.addEventListener('change', function(e) { model.Emisferio = $.Emisferio.getSelectedRow(0).id; model.EmisferioIndex = e.rowIndex; });
$.TipoLesion.addEventListener('change', function(e) { model.TipoLesion = $.TipoLesion.getSelectedRow(0).id; model.TipoLesionIndex = e.rowIndex; });
$.ContinuaTrabajando.addEventListener('change', function(e) { model.ContinuaTrabajando = $.ContinuaTrabajando.getSelectedRow(0).id; model.ContinuaTrabajandoIndex = e.rowIndex; });

$.NombreAuditor.addEventListener("change",function(){model.NombreAuditor = $.NombreAuditor.value;});
$.ApellidoAuditor.addEventListener("change",function(){model.ApellidoAuditor = $.ApellidoAuditor.value;});
$.DNIAuditor.addEventListener("change",function(){model.DNIAuditor = $.DNIAuditor.value;});
$.NombreAccidentado.addEventListener("change",function(){model.NombreAccidentado = $.NombreAccidentado.value;});
$.ApellidoAccidentado.addEventListener("change",function(){model.ApellidoAccidentado = $.ApellidoAccidentado.value;});
$.DNIAccidentado.addEventListener("change",function(){model.DNIAccidentado = $.DNIAccidentado.value;});
$.Legajo.addEventListener("change",function(){model.Legajo = $.Legajo.value;});
$.Edad.addEventListener("change",function(){model.Edad = $.Edad.value;});
$.Antiguedad.addEventListener("change",function(){model.Antiguedad = $.Antiguedad.value;});
$.Puesto.addEventListener("change",function(){model.Puesto = $.Puesto.value;});
$.DescripcionHecho.addEventListener("change",function(){model.DescripcionHecho = $.DescripcionHecho.value;});
$.Tarea.addEventListener("change",function(){model.Tarea = $.Tarea.value;});
$.DescripcionHechoBreve.addEventListener("change",function(){model.DescripcionHechoBreve = $.DescripcionHechoBreve.value;});
$.nameTestigo1.addEventListener("change",function(){model.nameTestigo1 = $.nameTestigo1.value;});
$.lastTestigo1.addEventListener("change",function(){model.lastTestigo1 = $.lastTestigo1.value;});
$.nameTestigo2.addEventListener("change",function(){model.nameTestigo2 = $.nameTestigo2.value;});
$.lastTestigo2.addEventListener("change",function(){model.lastTestigo2 = $.lastTestigo2.value;});
$.nameTestigo3.addEventListener("change",function(){model.nameTestigo3 = $.nameTestigo3.value;});
$.lastTestigo3.addEventListener("change",function(){model.lastTestigo3 = $.lastTestigo3.value;});
$.DescripcionMedidas.addEventListener("change",function(){model.DescripcionMedidas = $.DescripcionMedidas.value;});
$.NombreMedico.addEventListener("change",function(){model.NombreMedico = $.NombreMedico.value;});
$.ApellidoMedico.addEventListener("change",function(){model.ApellidoMedico = $.ApellidoMedico.value;});
$.DescripcionAtencion.addEventListener("change",function(){model.DescripcionAtencion = $.DescripcionAtencion.value;});


