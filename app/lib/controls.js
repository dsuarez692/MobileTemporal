var Alloy=require('alloy');

exports.getMainView=function(){
	return Alloy.createController('mainview');;
};

exports.getMenuView=function(){
	return Alloy.createController('menuview');	
};

exports.getAccountView=function(args){
    return Alloy.createController('account', args);
};

exports.getPasswordChangeView=function(args){
	return Alloy.createController('passwordchange', args);
};
exports.getReportView=function(){
	return Alloy.createController('report');
};
exports.getWISEPaso1=function(){
	return Alloy.createController('WISEPaso1');;
};

exports.getAccount2View=function(args){
	return Alloy.createController('account2', args);
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
	return Alloy.createController("wiseMenu");
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

exports.createCheckbox = function(specs) {
    if(typeof specs != "object")
        specs = {};
    specs.width = specs.width || 25;
    specs.backgroundColor = specs.unCheckedColor || "white";
    specs.height = specs.height || 25;
    specs.border = specs.border || 1;
    specs.borderColor = specs.borderColor || "silver";
    var viw = Ti.UI.createView(specs);

    function togglecheck () {
        if(!viw.checked) {
            viw.checked = true;
            viw.backgroundColor = specs.checkedColor || "green";
        }
        else {
            viw.checked = false;
            viw.backgroundColor = specs.unCheckedColor || "white";
        }           
    }
    viw.addEventListener("click",togglecheck);

    return viw;
};

exports.removeAllViews = function(view){
	var removeData = [];
    for (i = view.children.length; i > 0; i--){
        removeData.push(view.children[i - 1]);  
    };

    // Remove childrens
    for (i = 0; i < removeData.length; i++){
        view.remove(removeData[i]);
    }
    removeData = null;
};
