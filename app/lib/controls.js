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

exports.getWiseMenu=function(){
	var w = Ti.UI.createTableView({
		height: Ti.UI.FILL,
		backgroundColor:'#868686',
		zIndex: 1001,
		width: Ti.UI.FILL,
		layout: 'vertical'
	});
	
	var op1 = Ti.UI.createTableViewRow({
		zIndex: 1002,
		height: 30,
		width: Ti.UI.FILL,
		layout: 'vertical'
	});
	var op1View = Ti.UI.createView({
		zIndex: 1003,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		layout: 'vertical'
	});
	var op1Label = Ti.UI.createLabel({
		color: '#FFFFFF',
		text: 'Formulario 1',
		font: {
			fontSize: 30
		},
		zIndex: 1004
	});
	
	op1View.add(op1Label);
	op1.add(op1View);
	w.add(op1);
	
	return w;
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
