//Modulo de controles, tiene funciones relacionadas con manejo de views y menus
var controls=require('controls');
//Modulo de persistencia
var persistence = require('persistence');
//Modulo de modelos
var models=require('models');

var loggedIn = false;

var menuView=controls.getMenuView();
var mainView=controls.getMainView();

controls.addMenuIcons(mainView);


//view 2
var accountView=null;
//view 2.1
var account2View = null;
//view 3
var passChangeView = null;

//Encabezado de los reportes
var reportView=null;
//Wise
var wise1 = null;

//Menu collapsable wise
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
    		removeCurrentOpenedView();
    		$.drawermenu.drawermainview.add(accountView.getView());
    		activeView = 2;
    		break;
    	case "passchange":
    		if(passChangeView == null){
    			passChangeView = controls.getPasswordChangeView(persistence.getUserData());

				addMenuIcons(passChangeView);
    		}
    		removeCurrentOpenedView();
    		$.drawermenu.drawermainview.add(passChangeView.getView());
    		activeView = 3;
    		break;
    	case 'wise':
    		if(wiseMenuView == null){
    			wiseMenuView = controls.getWiseMenu();
    			
    			wiseMenuView.wiseMenu.addEventListener('click', function(e){
    				Ti.API.info(e.source.id);
    				switch(e.source.id){
    					case 'auditoria_manejo':
    						if(reportView == null){
    							reportView = controls.getReportView();
    							addMenuIcons(reportView);
    						}
    						if(wise == null){
    							wise = controls.getWISEPaso1();
    						}
    						removeCurrentOpenedView();
    						$.drawermenu.drawermainview.add(reportView.getView());
    						activeView = 4;
    						break;
    				};
    			});
    		}
    		switch(activeView){
    			case 1:
    				controls.initWise(mainView);
    				break;
    			case 2:
    				controls.initWise(accountView);
    				break;
    			case 2.1:
    				controls.initWise(account2View);
    				break;
    			case 3:
    				controls.initWise(passChangeView);
    				break;
    		}
    		break;
    };
});

//Funcion que realiza el chequeo de sesion
function checkSession(){
	Ti.API.info('Checkeo de sesion');
	Ti.API.info(loggedIn);
	setTimeout(checkSession, 10000);
}

setTimeout(checkSession, 10000);

//Funcion que se ejecuta al cargar la pantalla, que setea todos los textos relacionados con datos del usuario al momento de cargar la aplicacion
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

//Funcion que saca la vista actual del mainview
function removeCurrentOpenedView(){
	switch(activeView){
		case 2:
			$.drawermenu.drawermainview.remove(accountView.getView());
			accountView.resetView();
			break;
		case 2.1:
			$.drawermenu.drawermainview.remove(accountView2.getView());
			account2View.resetView();
			break;
		case 3:
			$.drawermenu.drawermainview.remove(passChangeView.getView());
			passChangeView.resetView();
			break;
		case 4:
			$.drawermenu.drawermainview.remove(reportView.getView());
			break;
	};
	activeView = 1;
}

loadDefaultValues();

$.index.open();
