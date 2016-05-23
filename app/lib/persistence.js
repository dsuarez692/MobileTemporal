var userData = null;

var colaReportes = null;

exports.saveUserData = function(tosave){
	userData = tosave;
	Ti.App.Properties.setString('userData', JSON.stringify(tosave));
};

exports.getUserData = function(){
	if(userData == null){
		userData = JSON.parse(Ti.App.Properties.getString('userData'));
	}
	return userData;
};

exports.addReport = function(report){
	
}
