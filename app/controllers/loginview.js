exports.validateData = function(){
	if($.password.value.length < 6 || $.password.value.length > 20){
		alert("La contraseña debe contener entre 6 y 20 caracteres.");
		return false;
	}
	return true;
};
