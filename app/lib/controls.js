var Alloy=require('alloy');

exports.getMainView=function(){
	return Alloy.createController('mainview');;
};

exports.getMenuView=function(){
	return Alloy.createController('menuview');	
};

exports.getAccountView=function(){
    return Alloy.createController('account');
};

exports.getPasswordChangeView=function(){
	return Alloy.createController('passwordchange');
};

exports.getAccount2View=function(){
	return Alloy.createController('account2');
};

exports.getCollapseButton=function(args){
	var v=Ti.UI.createView({
		height: args.h,
		width: args.w,
		backgroundColor: '#E0E0E0'
	});
	
	var b=Ti.UI.createView({
		height: "30dp",
		width: "30dp",
		backgroundImage: "/media/image5.png",
		
	});
	
	v.add(b);
	
	return v;
};

exports.getMenuButton=function(args){
	var v=Ti.UI.createView({
		height: args.h,
		width: args.w,
		backgroundColor: '#F2F2F2'
	});
	
	var b=Ti.UI.createView({
		height: "40dp",
		width: "40dp",
		backgroundImage: "/menubutton.png"
	});
	
	v.add(b);
	
	return v;
};
