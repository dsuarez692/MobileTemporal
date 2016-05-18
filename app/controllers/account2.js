exports.validateData = function (){
	if($.bossname.value == ""){
		alert('Debe ingresar el nombre de la persona a la que reporta');
		return false;
	}
	if($.bosslast.value == ""){
		alert('Debe ingresar el aellido de la persona a la que reporta');
		return false;
	}
	return true;
};

exports.resetView = function(){
	$.bossname.value = "";
	$.bosslast.value = "";
	$.appTitleLabel.text = 'Mi cuenta';
	$.collapsibleMenu.removeAllChildren();
};
