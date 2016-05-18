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

exports.createCheckbox = function(specs,checkboxspecs) {

    if(typeof checkboxspecs != "object")
        checkboxspecs = {};
    checkboxspecs.width = checkboxspecs.width || 25;
    checkboxspecs.height = checkboxspecs.height || 25;
    checkboxspecs.border = checkboxspecs.border || 1;
    checkboxspecs.borderColor = checkboxspecs.borderColor || "Gray";
    var imageView = Ti.UI.createView({
        backgroundImage: "/media/image37.jpg",
        height:checkboxspecs.height * 1.5,
        bottom:3 + checkboxspecs.height * 0.5,
        left:3 + checkboxspecs.width * 0.5,
        opacity:0
    }); 

    var viw = Ti.UI.createView(checkboxspecs);
    specs.width =  checkboxspecs.width * 1.5;
    specs.height = checkboxspecs.height * 1.5;

    var outerview = Ti.UI.createView({
        width: specs.width * 1.5,
        height: specs.height * 1.5,
    });
    var clickview = Ti.UI.createView({
        width:checkboxspecs.width,
        height:checkboxspecs.height
    });
    outerview.add(viw);
    outerview.add(imageView);
    outerview.add(clickview);

    function togglecheck () {
        if(!viw.checked) {
            viw.checked = true;
            imageView.backgroundImage = "/media/image36.png";

        }
        else {
            viw.checked = false;
            imageView.backgroundImage= "/media/image37.png";
        }           
    }
    clickview.addEventListener("click",togglecheck);
    return outerview;
};
