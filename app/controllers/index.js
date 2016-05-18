var controls=require('controls');

// get main and menu view as objects
var menuView=controls.getMenuView();
var mainView=controls.getMainView();
var reportView=controls.getReportView();



//add menu view to ConfigView exposed by widget
reportView.menuButton.add(controls.getMenuButton({
                h: '40',
                w: '40'
            }));
             

//Minor changes to click event. Update the menuOpen status;
reportView.menuButton.addEventListener('click',function(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}); // method is exposed by widget

reportView.collapsibleButton.add(controls.getCollapseButton({
	h: '40',
	w: '40'
}));


// attach event listener to menu button
mainView.menuButton.add(controls.getMenuButton({
	h: '40',
	w: '40'
}));

//Minor changes to click event. Update the menuOpen status;
mainView.menuButton.addEventListener('click',function(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}); // method is exposed by widget

mainView.collapsibleButton.add(controls.getCollapseButton({
	h: '40',
	w: '40'
}));

var passChangeView = controls.getPasswordChangeView();

//add menu view to ConfigView exposed by widget
passChangeView.menuButton.add(controls.getMenuButton({
                h: '40',
                w: '40'
            }));

//Minor changes to click event. Update the menuOpen status;
passChangeView.menuButton.addEventListener('click',function(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}); // method is exposed by widget

passChangeView.collapsibleButton.add(controls.getCollapseButton({
	h: '40',
	w: '40'
}));

// get config view as objects
var accountView=controls.getAccountView();


//add menu view to ConfigView exposed by widget
accountView.menuButton.add(controls.getMenuButton({
                h: '40',
                w: '40'
            }));

//Minor changes to click event. Update the menuOpen status;
accountView.menuButton.addEventListener('click',function(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}); // method is exposed by widget

accountView.collapsibleButton.add(controls.getCollapseButton({
	h: '40',
	w: '40'
}));

//var account2View=controls.getAccount2View();

$.drawermenu.init({
    menuview:menuView.getView(),
    mainview:mainView.getView(),
    duration:200,
    parent: $.index
});

//variable to controler de open/close slide
var activeView = 1;

// add event listener in this context
menuView.menuTable.addEventListener('click',function(e){
    $.drawermenu.showhidemenu();
    $.drawermenu.menuOpen = false; //update menuOpen status to prevent inconsistency.
    switch(e.rowData.id){
    	case "home":
    		switch(activeView){
    			case 1:
    				break;
    			case 2:
    			    var childrens = $.drawermenu.drawermainview.getChildren();
    				for(var i=0; i<childrens.length; i++){
    					childrens[i].fireEvent('resetView');
    				}
    				$.drawermenu.drawermainview.remove(accountView.getView());
    				activeView = 1;
    				break;
    			case 3:
    				$.drawermenu.drawermainview.remove(passChangeView.getView());
    				activeView = 1;
    				break;
    		};
    		break;
    	case "account":
    		switch(activeView){
    			case 1:
    				$.drawermenu.drawermainview.add(accountView.getView());
    				activeView = 2;
    				break;
    			case 2:
    				break;
    			case 3:
    				$.drawermenu.drawermainview.remove(passChangeView.getView());
    				$.drawermenu.drawermainview.add(accountView.getView());
    				activeView = 2;
    				break;
    		};
    		break;
    	case "passchange":
    		switch(activeView){
    			case 1:
    				$.drawermenu.drawermainview.add(passChangeView.getView());
    				activeView = 3;
    				break;
    			case 2:
    				var childrens = $.drawermenu.drawermainview.getChildren();
    				for(var i=0; i<childrens.length; i++){
    					childrens[i].fireEvent('resetView');
    				}
    				$.drawermenu.drawermainview.remove(accountView.getView());
    				$.drawermenu.drawermainview.add(passChangeView.getView());
    				activeView = 3;
    				break;
    			case 3:
    				break;
    		};
    		break;
    	case "wise":
    		mainView.appTitleLabel.text = "WISE";
    		reportView.reportName.text = "Auditoría de manejo";
    		reportView.form.add(controls.getWISEPaso1().getView());
    		
    		$.drawermenu.drawermainview.add(reportView.getView());
    		
    		break;
    };
});
$.index.open();
