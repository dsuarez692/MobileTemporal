var Alloy=require('alloy');

var collapsibleMenuOpen = false;

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
exports.getReportView=function(parms){
	return Alloy.createController('report', parms);
};
exports.getWISEPaso1=function(){
	return Alloy.createController('WISEPaso1');
};
exports.getChequeoVehicular=function(){
	return Alloy.createController('ChequeoVehicular');
};
exports.getAvisoDeRiesgo=function(){
	return Alloy.createController('AvisoDeRiesgo');
};

exports.getAccount2View=function(){
	return Alloy.createController('account2');
};

exports.getLoginView=function(){
	return Alloy.createController('loginview');
};

function getCollapseButton(args){
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

function getMenuButton(args){
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

function removeAllViews(view){
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

exports.removeAllViews = removeAllViews;

//Funcion que le agrega a la vista que se le pasa, los iconos de side menu y menu collapsable
exports.addMenuIcons = function (view, listener){
	view.menuButton.add(getMenuButton({
				                h: '40',
				                w: '40'
				            }));
				
	//Minor changes to click event. Update the menuOpen status;
	view.menuButton.addEventListener('click',listener); // method is exposed by widget
	
	view.collapsibleButton.add(getCollapseButton({
		h: '40',
		w: '40'
	}));
};

exports.setCollapsibleMenuOpen = function(value){
	collapsibleMenuOpen = value;
};

exports.isCollapsibleMenuOpen = function(){ 
	return collapsibleMenuOpen == true? true : false;
};

function showHideCollapsibleMenu(view){
	if(collapsibleMenuOpen){
		moveCollapsibleMenuTo = -600;
		collapsibleMenuOpen = false;
	}else{
		moveCollapsibleMenuTo = 40;
		if(OS_WINDOWS){
			moveCollapsibleMenuTo = 45;
		}
		collapsibleMenuOpen = true;
	}
	if(OS_IOS || OS_ANDROID){
		view.collapsibleMenu.animate({
			top: moveCollapsibleMenuTo,
			duration: 200
		});
	}
	if(OS_WINDOWS){
		view.collapsibleMenu.setTop(moveCollapsibleMenuTo);
	}
}

//Funcion que despliega el menu collapsable (Revisar porque en android pasa por encima de la mainTopBar)
exports.showHideCollapsibleMenu= showHideCollapsibleMenu;

exports.initWise = function(view, wiseMenuView){
	view.appTitleLabel.text = 'WISE';
	removeAllViews(view.collapsibleMenu);
	var showHide = function(e){
		showHideCollapsibleMenu(view);
	};
	view.collapsibleMenu.add(wiseMenuView.getView());
	view.collapsibleButton.removeEventListener('click', showHide);
	view.collapsibleButton.addEventListener('click', showHide);
};
