exports.tomarFoto = function(callback){
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
