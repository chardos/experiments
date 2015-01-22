function prepareEventHandlers() {
	var boxHeight = 200;
	var maxWidth = 1800;

	var wrapper = document.getElementById("wrapper");
	var widthdisplay = document.getElementById("width");
	var numberOfBoxes = $('.box').length;
	var isResizing = false;	
	
	//-------------------ADD ID'S TO EACH BOX (#box1, #box2) etc-------------------------
		var i = 1;
		$('.box').each(function() {					
			this.id = 'box' + i;
			i++
		});	
		
		
	//-------------------COMMON FUNCTIONS-------------------------
	
	function setWrapperHeight(){
		height = Math.ceil($('.box').length / (i/300)) * boxHeight;
		wrapper.style.height = height + 'px';
		widthdisplay.innerHTML = 'Window width: <b>' + $(window).width() + 'px</b>' ;
	}
	
	//-------------------FILL ARRAYS WITH ABSOLUTE POSITIONS-------------------------
		
		
		//create arrays
		for (i=300; i <= maxWidth; i = i + 300){
			window['array' + i + 'tops'] = new Array();
			window['array' + i + 'lefts'] = new Array();
		}
		
		// put values in arrays
		for (i=300; i <= maxWidth; i = i + 300){			
			var top = 0;
			var left = 0;
			numberOfColumns = i/300;
			requiredRows = Math.ceil(numberOfBoxes / numberOfColumns);
			
			
			// does 1 row at a time
			for ( rows = 1; rows <= requiredRows; rows++ ){ 				//s = amount of rows
				for ( times = 1; times <= numberOfColumns; times++ ){ 		//1 times for 300, 2 times for 600 etc
					window['array' + i + 'tops'].push(top);
				}				
				top += boxHeight;
							
				for (times=1; times<=i/300; times++){ 						//1 times for 300, 2 times for 600 etc
					window['array' + i + 'lefts'].push(left);
					left += 300;
				}	
				left = 0;
			}
		}
	
	//-------------------SET THE COLUMNS UP ON LOAD-------------------------
		
		
		for ( i = 300; i <= maxWidth; i = i + 300 ){
			
			if ($(window).width() > i && $(window).width() < i + 299){	
				
				// resize the wrapper
				$('#wrapper').animate({width: i + 'px'}, 500, 'swing');
				
				// animate the boxes
				var increment = 0;
				$('.box').each(function() {					
					 $(this).animate( {
						top: window['array' + i + 'tops'][increment], 
						left: window['array' + i + 'lefts'][increment]}, 
						500, 
						'swing' 
						);
					 increment++;
				});
				
				setWrapperHeight()
				
				
			}
		}

	
	//-------------------ANIMATE ON RESIZE-------------------------
	
	
	$(window).resize(function(){
		function animateBoxes(){
			if(isResizing == false){			
				for ( i = 300; i <= maxWidth; i = i + 300 ){
					if ($(window).width() > i && $(window).width() < i + 299){	
						// resize wrapper
						if ($('#wrapper').width() != i) {  //stop excess animations
							$('#wrapper').animate({width: i + 'px'}, 400, 'swing');
						}
						
						// move boxes		
							if ($('#wrapper').width() != i) {
								var increment = 0;
								isResizing = true;
								$('.box').each(function() {
								
									 $(this).animate( {
										top: window['array' + i + 'tops'][increment], 
										left: window['array' + i + 'lefts'][increment]}, 
										400, 
										function(){
											isResizing = false;
										});
									 
									 increment++;
									 
								});
							}

						setWrapperHeight()
						
					}
				}
			}			
		}
		animateBoxes();
		var t=setTimeout(function(){
			animateBoxes();
		},1000)
	});
} //end prepareEventHandlers()

window.onload = function(){
	prepareEventHandlers();
}