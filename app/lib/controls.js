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
	
	
	var tableData = [];
	
	var op1 = Ti.UI.createTableViewRow();
	var op1View = Ti.UI.createView({
		height: 40,
		width: Ti.UI.FILL,
		layout: 'vertical',
		backgroundColor: '#000000',
		top:0,
		left:0
	});
	var op1Label = Ti.UI.createLabel({
		color: '#FFFFFF',
		text: 'Auditoría de manejo',
		font: {
			fontSize: 20
		},
		width:Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	var op2 = Ti.UI.createTableViewRow();
	var op2View = Ti.UI.createView({
		height: 40,
		width: Ti.UI.FILL,
		layout: 'vertical',
		backgroundColor: '#000000',
		top:0,
		left:0
	});
	var op2Label = Ti.UI.createLabel({
		color: '#FFFFFF',
		text: 'Chequeo vehicular',
		font: {
			fontSize: 20
		},
		width:Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	
	op1View.add(op1Label);
	op1.add(op1View);
	op2View.add(op2Label);
	op2.add(op2View);
	tableData.push(op1);
	tableData.push(op2);
	
	var w = Ti.UI.createTableView({
		objName: 'wiseMenu',
		height: Ti.UI.SIZE,
		backgroundColor:'#000000',
		width: Ti.UI.FILL,
		layout: 'vertical',
		top:0,
		left:0,
		data: tableData,
		separatorColor: '#FFFFFF'
	});
	
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
