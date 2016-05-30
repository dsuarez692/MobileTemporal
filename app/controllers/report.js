var models=require('models');
var report = $.args.Page;

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

function changePage(page){
	removeAllViews($.form);
	switch(page){
		case 1 : 
			$.form.add(report.Page1);
			break;
		case 2 : 
			$.form.add(report.Page2);
			break;
		case 3 : 
			$.form.add(report.Page3);
			break;
		case 4 : 
			$.form.add(report.Page4);
			break;
	}	
}

$.volverBtn.addEventListener("click",function(){if(models.getWISEModel()._Page > 1){models.getWISEModel()._Page = models.getWISEModel()._Page - 1; changePage(models.getWISEModel()._Page);}});

$.siguienteBtn.addEventListener("click",function(){if(models.getWISEModel()._Page < 4){models.getWISEModel()._Page = models.getWISEModel()._Page + 1; changePage(models.getWISEModel()._Page);}}); //Despues veo como sacar la pagina final del reporte
    		