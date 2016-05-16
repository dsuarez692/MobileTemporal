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
	
	var op1 = Ti.UI.createTableViewRow({
		id: 'auditoria_manejo',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL
	});
	var op1View = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		layout: 'horizontal',
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
		left: 15,
		top: 5,
		width:Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	var op1Image = Ti.UI.createImageView({
		image: "/media/image31.png",
		left: 10,
		top: 5,
		width: 30,
		height: 30
	});
	
	var op2 = Ti.UI.createTableViewRow({
		id: 'chequeo_vehicular',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL
	});
	var op2View = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		layout: 'horizontal',
		backgroundColor: '#000000',
		top:0,
		left:0
	});
	var op2Image = Ti.UI.createImageView({
		image: '/media/image28.png',
		left: 10,
		top: 5,
		width: 30,
		height: 30
	});
	var op2Label = Ti.UI.createLabel({
		color: '#FFFFFF',
		text: 'Chequeo vehicular',
		font: {
			fontSize: 20
		},
		left: 15,
		top: 5,
		width:Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	var op3 = Ti.UI.createTableViewRow({
		id: 'aviso_riesgo',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL
	});
	var op3View = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		layout: 'horizontal',
		backgroundColor: '#000000',
		top:0,
		left:0
	});
	var op3Image = Ti.UI.createImageView({
		image: '/media/image32.png',
		left: 10,
		top: 5,
		width: 30,
		height: 30
	});
	var op3Label = Ti.UI.createLabel({
		color: '#FFFFFF',
		text: 'Aviso de riesgo',
		font: {
			fontSize: 20
		},
		left: 10,
		top: 5,
		width:Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	var op4 = Ti.UI.createTableViewRow({
		id: 'acci_inci',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL
	});
	var op4View = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		layout: 'horizontal',
		backgroundColor: '#000000',
		top:0,
		left:0
	});
	var op4Image = Ti.UI.createImageView({
		image: '/media/image29.png',
		left: 10,
		top: 5,
		width: 30,
		height: 30
	});
	var op4Label = Ti.UI.createLabel({
		color: '#FFFFFF',
		text: 'Accidente o incidente',
		font: {
			fontSize: 20
		},
		left: 15,
		top: 5,
		width:Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	var op5 = Ti.UI.createTableViewRow({
		id: 'auditoria_manejo2',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL
	});
	var op5View = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		layout: 'horizontal',
		backgroundColor: '#000000',
		top:0,
		left:0
	});
	var op5Image = Ti.UI.createImageView({
		image: '/media/image30.png',
		left: 10,
		top: 5,
		width: 30,
		height: 30
	});
	var op5Label = Ti.UI.createLabel({
		color: '#FFFFFF',
		text: 'Auditoría de manejo',
		font: {
			fontSize: 20
		},
		left: 15,
		top: 5,
		width:Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	
	op1View.add(op1Image);
	op1View.add(op1Label);
	op1.add(op1View);
	op2View.add(op2Image);
	op2View.add(op2Label);
	op2.add(op2View);
	op3View.add(op3Image);
	op3View.add(op3Label);
	op3.add(op3View);
	op4View.add(op4Image);
	op4View.add(op4Label);
	op4.add(op4View);
	op5View.add(op5Image);
	op5View.add(op5Label);
	op5.add(op5View);
	
	
	tableData.push(op1);
	tableData.push(op2);
	tableData.push(op3);
	tableData.push(op4);
	tableData.push(op5);
	
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
