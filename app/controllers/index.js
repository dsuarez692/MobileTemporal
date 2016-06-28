//Modulo de controles, tiene funciones relacionadas con manejo de views y menus
var controls=require('controls');
//Modulo de persistencia
var persistence = require('persistence');
//Modulo de modelos
var models=require('models');

var sessionControl;

var loggedIn = false;

function hideSideMenu(){
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
}

var loginView = null;
var menuView=controls.getMenuView();
var mainView=controls.getMainView();

controls.addMenuIcons(mainView,hideSideMenu);


//view 2
var accountView=null;
//view 2.1
var account2View = null;
//view 3
var passChangeView = null;

//Encabezado de los reportes
var reportView=null;
//Wise
var auditoria = controls.getWISEPaso1();
var chequeoVehicular = controls.getChequeoVehicular();
var avisoDeRiesgo = controls.getAvisoDeRiesgo();
var accidenteIncidente = controls.getAccidenteIncidente();

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
    if(controls.isCollapsibleMenuOpen){
    	controls.showHideCollapsibleMenu(mainView);
    	controls.setCollapsibleMenuOpen(false);
    }
    switch(e.rowData.id){
    	case "account":
    		if(accountView == null){
    			accountView = controls.getAccountView();

				controls.addMenuIcons(accountView,hideSideMenu);
				
				accountView.continueBtn.addEventListener('click', function(){
					if(OS_ANDROID){
						Titanium.UI.Android.hideSoftKeyboard();
					}
					if(accountView.validateData()){
						if(account2View == null){
							account2View = controls.getAccount2View();
							
							controls.addMenuIcons(account2View, hideSideMenu);
							
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
										"password" : persistence.getUserData().password,
										"sector" : account2View.getSector(),
										"bossname" : account2View.bossname.value,
										"bosslast" : account2View.bosslast.value,
										"Comercial" : account2View.getLineaComercial()
									});
									accountView.savePhotoProfile();
									Ti.API.info(persistence.getUserPhotoPath());
									$.drawermenu.drawermainview.remove(account2View.getView());
									loadDefaultValues();
									activeView = 1;
									accountView = null;
									account2View = null;
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
    			passChangeView = controls.getPasswordChangeView();

				controls.addMenuIcons(passChangeView, hideSideMenu);
    		}
    		removeCurrentOpenedView();
    		$.drawermenu.drawermainview.add(passChangeView.getView());
    		activeView = 3;
    		break;
    	case 'wise':
    		if(wiseMenuView == null){
    			wiseMenuView = controls.getWiseMenu();
    			
    			wiseMenuView.wiseMenu.addEventListener('click', function(e){
    				Ti.API.info(e.rowData.id);
    				switch(e.rowData.id){
    					case 'auditoria_manejo':
    						removeCurrentOpenedView();
				    		models.resetWISEModel();
				    		GenerateReport(auditoria);
				    		reportView.volverBtn.visible = false;
			    			models.getWISEModel().Type = e.rowData.id;
				    		models.getWISEModel().ImageMax = 1;
				    		models.getWISEModel().RequiredPic = true;
				    		reportView.reportName.text = "Auditoría de manejo";
				    		reportView.form.add(auditoria.GetPrimeraPagina());
				    		auditoria.LoadFromModel(models.getWISEModel());
				    		$.drawermenu.drawermainview.add(reportView.getView());
    						activeView = 4;
    						break;
    					case 'chequeo_vehicular':
    						removeCurrentOpenedView();
				    		models.resetWISEModel();
				    		GenerateReport(chequeoVehicular);
				    		reportView.volverBtn.visible = false;
			    			models.getWISEModel().Type = e.rowData.id;
				    		models.getWISEModel().ImageMax = 1;
				    		models.getWISEModel().RequiredPic = true;
				    		reportView.reportName.text = "Chequeo vehicular";
				    		reportView.form.add(chequeoVehicular.GetPrimeraPagina());
				    		chequeoVehicular.LoadFromModel(models.getWISEModel());
				    		$.drawermenu.drawermainview.add(reportView.getView());
    						activeView = 4;
    						break;
    					case 'aviso_riesgo':
    						removeCurrentOpenedView();
				    		models.resetWISEModel();
				    		GenerateReport(avisoDeRiesgo);
				    		reportView.volverBtn.visible = false;
			    			models.getWISEModel().Type = e.rowData.id;
				    		models.getWISEModel().ImageMax = 1;
				    		models.getWISEModel().RequiredPic = true;
				    		reportView.reportName.text = "Aviso de Riesgo";
				    		reportView.form.add(avisoDeRiesgo.GetPrimeraPagina());
				    		avisoDeRiesgo.LoadFromModel(models.getWISEModel());
				    		$.drawermenu.drawermainview.add(reportView.getView());
    						activeView = 4;
    						break;
    					case 'acci_inci':
    						removeCurrentOpenedView();
				    		models.resetWISEModel();
				    		GenerateReport(accidenteIncidente);
				    		reportView.volverBtn.visible = false;
			    			models.getWISEModel().Type = e.rowData.id;
				    		models.getWISEModel().ImageMax = 1;
				    		models.getWISEModel().RequiredPic = true;
				    		reportView.reportName.text = "Incidente o Accidente";
				    		reportView.form.add(accidenteIncidente.GetPrimeraPagina());
				    		accidenteIncidente.LoadFromModel(models.getWISEModel());
				    		$.drawermenu.drawermainview.add(reportView.getView());
    						activeView = 4;
    						break;	
    						
    				};
    			});
    		}
    		switch(activeView){
    			case 1:
    				controls.initWise(mainView, wiseMenuView);
    				break;
    			case 2:
    				controls.initWise(accountView, wiseMenuView);
    				break;
    			case 2.1:
    				controls.initWise(account2View, wiseMenuView);
    				break;
    			case 3:
    				controls.initWise(passChangeView, wiseMenuView);
    				break;
    		}
    		break;
    };
});

function GenerateReport(view){
	if(reportView != null){
		controls.removeAllViews(reportView.form);		
	}
	reportView = controls.getReportView({ Page: view });
	controls.addMenuIcons(reportView, hideSideMenu);
	controls.removeAllViews(reportView.form);
	
	controls.initWise(reportView, wiseMenuView);
	
	reportView.enviarBtn.addEventListener("click",
		function(){
			if(view.ValidateData()){
				persistence.addReport(models.getWISEModel());
				//Aca iria la persistencia
				$.drawermenu.drawermainview.remove(reportView.getView());
				loadDefaultValues();
				activeView = 1;
				
				var dialog = Ti.UI.createAlertDialog({
				    message: 'El reporte sera procesado a la brevedad.',
				    ok: 'Okay',
				    title: 'Muchas Gracias'
				  });
			    dialog.show();
			    if(controls.isCollapsibleMenuOpen){
			    	controls.showHideCollapsibleMenu(mainView);
			    	controls.setCollapsibleMenuOpen(false);
			    }
			    controls.removeAllViews(reportView.collapsibleMenu);
			}
		}); 	
}

//Funcion que realiza el chequeo de sesion
function checkSession(){
	Ti.API.info('Checkeo de sesion');
	sessionControl = setTimeout(checkSession, 10000);
}

//Funcion que se ejecuta al cargar la pantalla, que setea todos los textos relacionados con datos del usuario al momento de cargar la aplicacion
function loadDefaultValues(){
	var user = persistence.getUserData();
	if(user != null && user.name != undefined){
		loggedIn = true;
		activeView = 1;
		menuView.rowNombreUsuario.text = user.username;
		var f = Ti.Filesystem.getFile(persistence.getUserPhotoPath());
		if(f.exists() === true){
			menuView.menuTopBar.backgroundImage = persistence.getUserPhotoPath();
		}else{
			menuView.menuTopBar.backgroundImage = "/media/image10.png";
		}
		menuView.menuTopBarLogOut.addEventListener('click', function(){
			//Si presionan logout
			
			//Cierro sidemenu
			hideSideMenu();
			
			Ti.API.info('Cerrar sesion');
			//Elimino datos de sesion
			persistence.logOut();
			loggedIn = false;
			
			//Seteo imagen default de perfil
			menuView.menuTopBar.backgroundImage = "/media/image10.png";
			
			//Seteo a null todos los controllers
			accountView = null;
			account2View = null;
			passChangeView = null;
			
			activeView = 0;
			
			//Abro login
			openLogin();
		});
		sessionControl = setTimeout(checkSession, 10000);
	}else{
		activeView = 0;
		openLogin();
	}
}

function openLogin(){
	if(loginView == null){
		loginView = controls.getLoginView();
		loginView.loginBtn.addEventListener('click', function(){
			if(OS_ANDROID){
				Ti.UI.Android.hideSoftKeyboard();
			}
			if(loginView.validateData()){
				if(persistence.logIn({
						"username" : loginView.username.value,
						"password" : Ti.Utils.sha256(loginView.password.value),
					})){
					activeView = 1;
					$.drawermenu.drawermainview.remove(loginView.getView());
					sessionControl = setTimeout(checkSession, 10000);
					loadDefaultValues();
					loginView = null;
				}
			}
		});
		loginView.registerBtn.addEventListener('click', function(){
			activeView = 2;
			if(OS_ANDROID){
				Ti.UI.Android.hideSoftKeyboard();
			}
			if(accountView == null){
				accountView = controls.getAccountView();
				
				accountView.continueBtn.addEventListener('click', function(){
					if(accountView.validateData()){
						if(account2View == null){
							activeView = 2.1;
							account2View = controls.getAccount2View();
							
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
										"sector" : account2View.getSector(),
										"bossname" : account2View.bossname.value,
										"bosslast" : account2View.bosslast.value,
										"Comercial" : account2View.getLineaComercial()
									});
									Ti.API.info(JSON.stringify(persistence.getUserData()));
									$.drawermenu.drawermainview.remove(account2View.getView());
									loadDefaultValues();
									activeView = 1;
									
									//Hacer control de sesion web
									
									funcVacia = function(){};
									accountView.continueBtn.removeEventListener('click', funcVacia);
									account2View.continueBtn.removeEventListener('click', funcVacia);
									accountView = null;
									account2View = null;
									$.drawermenu.drawermainview.remove(loginView.getView());
									sessionControl = setTimeout(checkSession, 10000);
									loginView = null;
								}
							});
						}
						
						$.drawermenu.drawermainview.remove(accountView.getView());
						$.drawermenu.drawermainview.add(account2View.getView());
					}
				});
			}
			$.drawermenu.drawermainview.add(accountView.getView());
		});
	$.drawermenu.drawermainview.add(loginView.getView());
	}
}

//Funcion que saca la vista actual del mainview
function removeCurrentOpenedView(){
	switch(activeView){
		case 1:
			mainView.appTitleLabel.text = 'Flujo de actividades';
			controls.removeAllViews(mainView.collapsibleMenu);
			break;
		case 2:
			$.drawermenu.drawermainview.remove(accountView.getView());
			accountView.resetView();
			accountView = null;
			activeView = 1;
			break;
		case 2.1:
			$.drawermenu.drawermainview.remove(account2View.getView());
			$.drawermenu.drawermainview.remove(accountView.getView());
			account2View.resetView();
			account2View = null;
			activeView = 2;
			break;
		case 3:
			$.drawermenu.drawermainview.remove(passChangeView.getView());
			passChangeView.resetView();
			passChangeView = null;
			activeView = 1;
			break;
		case 4:
			$.drawermenu.drawermainview.remove(reportView.getView());
			controls.removeAllViews(reportView.collapsibleMenu);
			break;
	};
}

$.index.addEventListener('androidback',function(){
	removeCurrentOpenedView();
});

loadDefaultValues();

$.index.open();
