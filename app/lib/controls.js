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
exports.getReportView=function(){
	return Alloy.createController('report');
};
exports.getWISEPaso1=function(){
	return Alloy.createController('WISEPaso1');;
};

exports.getAccount2View=function(){
	return Alloy.createController('account2');
};

exports.getCollapseButton=function(args){
	var v=Ti.UI.createView({
		height: args.h,
		width: args.w
	});
	
	var b=Ti.UI.createView({
		height: "25dp",
		width: "40dp",
		backgroundImage: "/media/image3.png",
		
	});
	
	v.add(b);
	
	return v;
};

exports.getMenuButton=function(args){
	var v=Ti.UI.createView({
		height: args.h,
		width: args.w,
		backgroundColor: '#E0E0E0'
	});
	
	var b=Ti.UI.createView({
		height: "25dp",
		width: "40dp",
		backgroundImage: "/media/image2.png"
	});
	
	v.add(b);
	
	return v;
};