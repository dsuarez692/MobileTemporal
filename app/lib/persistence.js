var userData = null;

var colaReportes = [];

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
	colaReportes.push(report);
};

exports.logOut = function(){
	Ti.App.Properties.removeProperty('userData');
	userData = {};
};

exports.getUserPhotoPath = function(){
	return Titanium.Filesystem.applicationDataDirectory + 'userphoto.jpg';
};
