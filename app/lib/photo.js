var dialogs = require('alloy/dialogs');

function editPermissions(e) {

	if (OS_IOS) {
		Ti.Platform.openURL(Ti.App.iOS.applicationOpenSettingsURL);
	}

	if (OS_ANDROID) {
		var intent = Ti.Android.createIntent({
			action: 'android.settings.APPLICATION_SETTINGS',
		});
		intent.addFlags(Ti.Android.FLAG_ACTIVITY_NEW_TASK);
		Ti.Android.currentActivity.startActivity(intent);
	}
}

function requestPermissions() {

	// This iOS-only property is available since Ti 4.0
	if (OS_IOS) {

		// Map constants to names
		var map = {};
		map[Ti.Media.CAMERA_AUTHORIZATION_AUTHORIZED] = 'CAMERA_AUTHORIZATION_AUTHORIZED';
		map[Ti.Media.CAMERA_AUTHORIZATION_DENIED] = 'CAMERA_AUTHORIZATION_DENIED';
		map[Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED] = 'CAMERA_AUTHORIZATION_RESTRICTED';
		map[Ti.Media.CAMERA_AUTHORIZATION_NOT_DETERMINED] = 'CAMERA_AUTHORIZATION_NOT_DETERMINED';

		var cameraAuthorizationStatus = Ti.Media.cameraAuthorizationStatus;
		log.args('Ti.Media.cameraAuthorizationStatus', 'Ti.Media.' + map[cameraAuthorizationStatus]);

		if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED) {
			return alert('Because permission are restricted by some policy which you as user cannot change, we don\'t request as that might also cause issues.');

		} else if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_DENIED) {
			return dialogs.confirm({
				title: 'You denied permission before',
				message: 'We don\'t request again as that won\'t show the dialog anyway. Instead, press Yes to open the Settings App to grant permission there.',
				callback: editPermissions
			});
		}
	}

	// FIXME: https://jira.appcelerator.org/browse/TIMOB-19851
	// You will be prompted to grant to permissions. If you deny either one weird things happen
	Ti.Media.requestCameraPermissions(function(e) {
		log.args('Ti.Media.requestCameraPermissions', e);

		if (e.success) {

			// Instead, probably call the same method you call if hasCameraPermissions() is true
			alert('You granted permission.');

		} else if (OS_ANDROID) {
			alert('You don\'t have the required uses-permissions in tiapp.xml or you denied permission for now, forever or the dialog did not show at all because you denied forever before.');

		} else {

			// We already check AUTHORIZATION_DENIED earlier so we can be sure it was denied now and not before
			alert('You denied permission.');
		}
	});
}

exports.tomarFoto = function(callback){
	if(!Ti.Media.hasCameraPermissions){
		return requestPermissions();
	}
	Ti.Media.showCamera({
		success:function(event) {
			Ti.API.debug('Our type was: '+event.mediaType);
	 		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
	 			callback(event);
			} else {
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function() {
		},
		error:function(error) {
		},
		saveToPhotoGallery:false,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
};

exports.cargarFoto=function(callback){

	if(!Ti.Media.hasCameraPermissions){
		return requestPermissions();
	}
	Ti.Media.openPhotoGallery({
		success:function(event) {
			Ti.API.debug('Our type was: '+event.mediaType);
	 		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
	 			callback(event);
			} else {
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function() {
		},
		error:function(error) {
		},
		saveToPhotoGallery:false,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
};


