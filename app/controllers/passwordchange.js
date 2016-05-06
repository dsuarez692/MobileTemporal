function validateData(){
	
}

function changeColor(e){
	if(e.type == 'touchstart'){
		if(e.source.id=='continueBtn'){
			e.source.backgroundColor = '#3f8fac';
		}
		if(e.source.id=='cancelBtn'){
			e.source.backgroundColor = '#cecece';
		}
	}
	if(e.type == 'touchend'){
		if(e.source.id=='continueBtn'){
			e.source.backgroundColor = '#1f4e79';
		}
		if(e.source.id=='cancelBtn'){
			e.source.backgroundColor = '#FFFFFF';
		}
	}
}
