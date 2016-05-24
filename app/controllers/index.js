var controls=require('controls');
var models=require('models');

// get main and menu view as objects
var menuView=controls.getMenuView();
var mainView=controls.getMainView();
var reportView=controls.getReportView();
var wise = controls.getWISEPaso1();



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

function removeAllViews(view){
	if(view.children.length > 0){
		var removeData = [];
	    for (i = view.children.length; i > 0; i--){
	        removeData.push(view.children[i - 1]);  
	    };
	    // Remove childrens
	    for (i = 0; i < removeData.length; i++){
	        view.remove(removeData[i]);
	    }
	    removeData = null;
	}
    
}

// add event listener in this context
menuView.menuTable.addEventListener('click',function(e){
    $.drawermenu.showhidemenu();
    $.drawermenu.menuOpen = false; //update menuOpen status to prevent inconsistency.
    removeAllViews($.drawermenu.drawermainview);
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
    		models.resetWISEModel();
    		
    		removeAllViews(reportView.form);
    		reportView.reportName.text = "Auditoría de manejo";
    		
    		reportView.form.add(wise.getView());
    		
    		reportView.volverBtn.addEventListener("click",function(){alert(models.getWISEModel()._Page); if(models.getWISEModel()._Page > 1){models.getWISEModel()._Page = models.getWISEModel()._Page - 1; wise.changePage(models.getWISEModel()._Page);}});
    		reportView.siguienteBtn.addEventListener("click",function(){alert(models.getWISEModel()._Page); if(models.getWISEModel()._Page < 3){models.getWISEModel()._Page = models.getWISEModel()._Page + 1; wise.changePage(models.getWISEModel()._Page);}}); //Despues veo como sacar la pagina final del reporte
    		
    		wise.LoadFromModel(models.getWISEModel());
    		$.drawermenu.drawermainview.add(reportView.getView());
    		
    		break;
    };
});
$.index.open();
