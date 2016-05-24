var controls=require('controls');
var persistence = require('persistence');

var collapsibleMenuOpen = false;

var loggedIn = false;

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

addMenuIcons(mainView);

var passChangeView = null;

// get config view as objects
var accountView=null;

var account2View = null;

var wiseMenuView = null;

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
    if(collapsibleMenuOpen){
    	showHideCollapsibleMenu(mainView);
    	collapsibleMenuOpen = false;
    }
    switch(e.rowData.id){
    	case "home":
    		switch(activeView){
    			case 1:
    				break;
    			case 2:
    				accountView.resetView();
    				$.drawermenu.drawermainview.remove(accountView.getView());
    				activeView = 1;
    				break;
    			case 2.1:
    				account2View.resetView();
    				accountView.resetView();
    				$.drawermenu.drawermainview.remove(account2View.getView());
    				activeView = 1;
    			case 3:
    				passChangeView.resetView();
    				$.drawermenu.drawermainview.remove(passChangeView.getView());
    				activeView = 1;
    				break;
    		};
    		break;
    	case "account":
    		if(accountView == null){
    			accountView = controls.getAccountView(persistence.getUserData());

				addMenuIcons(accountView);
				
				accountView.continueBtn.addEventListener('click', function(){
					if(accountView.validateData()){
						if(account2View == null){
							account2View = controls.getAccount2View(persistence.getUserData());
							
							addMenuIcons(account2View);
							
							account2View.backBtn.addEventListener('click', function(){
								account2View.resetView();
								$.drawermenu.drawermainview.add(accountView.getView());
								$.drawermenu.drawermainview.remove(account2View.getView());
							});
							account2View.continueBtn.addEventListener('click',function(){
								if(account2View.validateData()){
									persistence.saveUserData({
										"name" : accountView.name.value,
										"last" : accountView.last.value,
										"username" : accountView.username.value,
										"password" : Ti.Utils.sha256(accountView.password.value),
										"sector" : account2View.sector.value,
										"bossname" : account2View.bossname.value,
										"bosslast" : account2View.bosslast.value
									});
									Ti.API.info(JSON.stringify(persistence.getUserData()));
									$.drawermenu.drawermainview.remove(account2View.getView());
									loadDefaultValues();
									activeView = 1;
								}
							});
						}
						
						$.drawermenu.drawermainview.add(account2View.getView());
						$.drawermenu.drawermainview.remove(accountView.getView());
						activeView = 2.1; 
					}
				});
    		}
    		switch(activeView){
    			case 1:
    				$.drawermenu.drawermainview.add(accountView.getView());
    				activeView = 2;
    				break;
    			case 2:
    				break;
    			case 2.1:
    				account2View.resetView();
    				$.drawermenu.drawermainview.add(accountView.getView());
    				$.drawermenu.drawermainview.remove(account2View.getView());
    				activeView = 2;
    				break;
    			case 3:
    				passChangeView.resetView();
    				$.drawermenu.drawermainview.remove(passChangeView.getView());
    				$.drawermenu.drawermainview.add(accountView.getView());
    				activeView = 2;
    				break;
    		};
    		break;
    	case "passchange":
    		if(passChangeView == null){
    			passChangeView = controls.getPasswordChangeView(persistence.getUserData());

				addMenuIcons(passChangeView);
    		}
    		switch(activeView){
    			case 1:
    				$.drawermenu.drawermainview.add(passChangeView.getView());
    				activeView = 3;
    				break;
    			case 2:
    				accountView.resetView();
    				$.drawermenu.drawermainview.add(passChangeView.getView());
    				$.drawermenu.drawermainview.remove(accountView.getView());
    				activeView = 3;
    				break;
    			case 2.1:
    				account2View.resetView();
    				accountView.resetView();
    				$.drawermenu.drawermainview.add(passChangeView.getView());
    				$.drawermenu.drawermainview.remove(account2View.getView());
    				activeView = 3;
    				break;
    			case 3:
    				break;
    		};
    		break;
    	case 'wise':
    		if(wiseMenuView == null){
    			wiseMenuView = controls.getWiseMenu();
    			
    			wiseMenuView.wiseMenu.addEventListener('click', function(e){
    				Ti.API.info(e.source.id);
    			});
    		}
    		switch(activeView){
    			case 1:
    				if(mainView.appTitleLabel.text != 'WISE'){
	    				mainView.appTitleLabel.text = 'WISE';
			    		mainView.collapsibleMenu.add(wiseMenuView.getView());
			    		mainView.collapsibleButton.addEventListener('click', function(e){
			    			showHideCollapsibleMenu(mainView);
			    		});
		    		}
    				break;
    			case 2:
    				if(accountView.appTitleLabel.text != 'WISE'){
	    				accountView.appTitleLabel.text = 'WISE';
			    		accountView.collapsibleMenu.add(wiseMenuView.getView());
			    		accountView.collapsibleButton.addEventListener('click', function(e){
			    			showHideCollapsibleMenu(accountView);
			    		});
		    		}
    				break;
    			case 2.1:
    				if(account2View.appTitleLabel.text != 'WISE'){
	    				account2View.appTitleLabel.text = 'WISE';
			    		account2View.collapsibleMenu.add(wiseMenuView.getView());
			    		account2View.collapsibleButton.addEventListener('click', function(e){
			    			showHideCollapsibleMenu(accountView);
			    		});
		    		}
    				break;
    			case 3:
    				if(passChangeView.appTitleLabel.text != 'WISE'){
	    				passChangeView.appTitleLabel.text = 'WISE';
			    		passChangeView.collapsibleMenu.add(wiseMenuView.getView());
			    		passChangeView.collapsibleButton.addEventListener('click', function(e){
			    			showHideCollapsibleMenu(passChangeView);
			    		});
		    		}
    				break;
    		}
    		break;
    };
});

function addMenuIcons(view){
	view.menuButton.add(controls.getMenuButton({
				                h: '40',
				                w: '40'
				            }));
				
	//Minor changes to click event. Update the menuOpen status;
	view.menuButton.addEventListener('click',function(){
		$.drawermenu.showhidemenu();
		$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	}); // method is exposed by widget
	
	view.collapsibleButton.add(controls.getCollapseButton({
		h: '40',
		w: '40'
	}));
}

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

function checkSession(){
	Ti.API.info('Checkeo de sesion');
	setTimeout(checkSession, 10000);
}

setTimeout(checkSession, 10000);

function loadDefaultValues(){
	var user = persistence.getUserData();
	if(user != null && user.name != undefined){
		loggedIn = true;
		menuView.rowNombreUsuario.text = user.username;
		menuView.menuTopBar.backgroundImage = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'userphoto.jpg').read();	
		menuView.rowLabel.addEventListener('click', function(){
			persistence.logOut();
			loggedIn = false;
			Ti.API.info('Aca debo abrir el login');
		});
	}else{
		Ti.API.info('Aca debo abrir el login');
		//Mostrar login
	}
}

loadDefaultValues();

$.index.open();
