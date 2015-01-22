window.onload = function() {
	
	selectedColorSet = "random";
	window.customArray = new Array();
	
	//SET CANVAS CLICK TO SPIN-----------------------------------------------
	$("#button").click(function() {
	  spin();
	});
	
	//REMOVE SCROLLBARS-----------------------------------------------
	$("body").css("overflow", "hidden");
	
	
	//DROPDOWN FUNCTIONALITY-----------------------------------------------
	
	//dropdown show and hide
	$(".dropdown").click(function() {
		
		if ( $("#popupcolors").css("display") == "none" ) {
			$("#popupcolors").css("display", "block").fadeTo(250, 1);
		} else {
			$("#popupcolors").fadeTo(250, 0, function(){
				$("#popupcolors").css("display","none");
			});
		}
	});
	
	//place clicked color text in dropdown and set the color variable
	dropArray = ["random","red","green","blue","orange","custom"];
	for(i=0; i<dropArray.length; i++){
		$("#" + dropArray[i] + "-drop").click(function() {
			newtext = $(this).html();
			$(".dropdowntext").html(newtext);
			window.selectedColorSet = $(this).html().toLowerCase();
			
			/*//pass colors into footer swatches
			for (var s=1;s<=12;s++){
				$("#swatch" + s).css("background-color", window.colorArray[s-1]);
			}*/
			
			
		});
	}
	
	
	// COLOR PICKER-----------------------------------------------
	
	//Set colorpicker to open on swatch click
	$('.swatch').colorpicker({
		inline: false
	});
	
	//determine the ID of clicked swatch
	for (var i=1;i<=12;i++){
		$(document).on("click", "#swatch" + i,function(){
			selectedSwatch = "#" + this.id;
		});
	}
	
	//change swatch bg color on okay, set selectedcolor to custom
	$(document).on( 'click', '.ui-colorpicker-ok', function () {
		value = $(selectedSwatch).val();
		$(selectedSwatch).css("background-color", "#" + value);
	   
		$(".dropdowntext").html("Custom");
		window.selectedColorSet = "custom";
		
		for( i=1; i<=12; i++ ){
			window.customArray[i-1] = $('#swatch' + i).css('background-color');
		}
	   
	});
	
	
	
	//CALL SPIN FUNCTION!-----------------------------------------------
	spin();
	
	
	//FADE IN CLICK TO SPIN-----------------------------------------------
	setTimeout(function(){
		$("#clicktospin")
		.css('left', ($(window).width()/2) - $("#clicktospin").width()/2)
		.css('top', ($(window).height()/2) - $("#clicktospin").height()/2)
		.fadeTo(600, .88);
	},700); 
	
	
}

function spin() {
	
	//REMOVE CLICK TO SPIN
	$("#clicktospin").css('display', 'none');
	
	var theCanvas = document.getElementById('Canvas1');
	if (theCanvas && theCanvas.getContext) {
		window.ctx = theCanvas.getContext("2d");
		if (ctx) {
			
			
			//FIND BROWSER WIDTH AND HEIGHT and height and set longest dimension
			
			windowWidth = $(window).width();
			windowHeight = $(window).height();
			if (windowWidth > windowHeight){
				longestDimension = windowWidth;
			} else {
				longestDimension = windowHeight;
			}
			ldMultiplier = longestDimension / 20;
			
			//SET CANVAS ELEMENT  WIDTH & HEIGHT
			$("canvas").attr("width", windowWidth);
			$("canvas").attr("height", windowHeight);
			
			//SET MIDPOINTS						
			x = windowWidth/2;
			y = windowHeight/2;;
			
			
			//SET COLORS-----------------------------------------------
			
			//random color set			
			if (selectedColorSet == "random"){
				colorChoose = Math.ceil((Math.random()*4));	
				if (colorChoose == 1){
					// red set
					window.colorArray = ["#d30303","#f82727", "#ae0606", "#ff0000","#ff5353","#ff7d8c","#ff7391","#ffa4b8","#ee5b7b","#ffb4da","#ffdaed","#f086bc"];
				} else if (colorChoose == 2){
					//green set
					window.colorArray = ["#438711","#509a19", "#5eaf22", "#56c405","#86f038","#53b20d","#d1ff15","#dfff58","#add700","#fffd27","#ffffd0","#e7fa0d"];
				} else if (colorChoose == 3){
					//blue set
					window.colorArray = ["#2f1bed","#5241f7", "#1c0bc0", "#2b63e2","#5282ee","#1b4ec2","#5aa1f1","#7bb5f5","#3f8be1","#acdef7","#d7effa","#89cbec"];
				} else if (colorChoose == 4){
					//orange set
					window.colorArray = ["#ff6000","#ff7522", "#da4800", "#ff9c00","#ffb033","#ff6f18","#ffba00","#ffc62d","#ff9c00","#ffde00","#fff4ac","#f6bf00"];
				}
			}
			
			//red colorset
			if (selectedColorSet == "red"){
					window.colorArray = ["#d30303","#f82727", "#ae0606", "#ff0000","#ff5353","#ff7d8c","#ff7391","#ffa4b8","#ee5b7b","#ffb4da","#ffdaed","#f086bc"];
			}
			
			//green colorset
			if (selectedColorSet == "green"){
					window.colorArray = ["#438711","#509a19", "#5eaf22", "#56c405","#86f038","#53b20d","#d1ff15","#dfff58","#add700","#fffd27","#ffffd0","#e7fa0d"];
			}
			
			//blue colorset
			if (selectedColorSet == "blue"){
					window.colorArray = ["#2f1bed","#5241f7", "#1c0bc0", "#2b63e2","#5282ee","#1b4ec2","#5aa1f1","#7bb5f5","#3f8be1","#acdef7","#d7effa","#89cbec"];
			}
			
			//orange colorset
			if (selectedColorSet == "orange"){
					window.colorArray = ["#ff6000","#ff7522", "#da4800", "#ff9c00","#ffb033","#ff6f18","#ffba00","#ffc62d","#ff9c00","#ffde00","#fff4ac","#f6bf00"];
			}
			
			//custom colorset
			if (selectedColorSet == "custom"){
					for (var i=1;i<=12;i++){
						window.colorArray[i-1] = window.customArray[i-1];
					};
			}
			
			
			
			
			
			//pass colors into footer swatches
			for (var i=1;i<=12;i++){
				$("#swatch" + i).css("background-color", window.colorArray[i-1]);
			}
			
			
			//RANDOMIZE FUNCTION
			
			function randomize(colorA, colorB, colorC){
				// attaching variables to window to make them global
				window.startAngle = Math.floor((Math.random()*360)) * Math.PI/180;
				window.endAngle = Math.floor((Math.random()*360)) * Math.PI/180;
				
				//randomize clockwise or anti-clockwise
				preAC = Math.floor((Math.random()*2)+1);							
				if (preAC == 1){
					window.aC = true;
				} else {
					window.aC = false;
				}
				
				//randomize colors in groups of 3
				preColor = Math.ceil((Math.random()*3));
				if (preColor == 1){
					ctx.strokeStyle = colorA;
				} else if (preColor == 2){
					ctx.strokeStyle = colorB;
				} else if (preColor == 3){
					ctx.strokeStyle = colorC;
				} 
			}
			
			
			//LINE WIDTH INPUT
			lineWidthInput = $("#line-width .textfield").val();
			
			
			
			//DRAWING OF ARCS (in 4 layers)
			
			// layer 4
			
			var layer4 = setInterval(function(){ //(Math.random()*radius) + offset);
				
				for (var i=0;i<=12;i++){ //for loop adds more strokes per iteration
					//set random stroke width range
					ctx.lineWidth = Math.floor((Math.random()*longestDimension/60)*lineWidthInput);
					
					window.radius = Math.floor((Math.random()*ldMultiplier*4.3) + ldMultiplier*9.8);
					//randomize color
					randomize(colorArray[0], colorArray[1], colorArray[2]);
					ctx.beginPath();
					ctx.arc(window.x,window.y,window.radius, window.startAngle, window.endAngle, window.aC);
					ctx.stroke();	
				}
				
			},1); //50 iterations
			
			setTimeout(function(){						
				window.clearInterval(layer4)
			},700); 
			
			
			
			// layer 3
			
			setTimeout(function(){	
				var layer3 = setInterval(function(){
					for (var i=0;i<=12;i++){
						//set random stroke width range
						ctx.lineWidth = Math.floor((Math.random()*longestDimension/50)*lineWidthInput);
						window.radius = Math.floor((Math.random()*ldMultiplier*4)+ldMultiplier*6);
						randomize(colorArray[3],colorArray[4],colorArray[5]);
						ctx.beginPath();
						ctx.arc(window.x,window.y,window.radius, window.startAngle, window.endAngle, window.aC);
						ctx.stroke();
					}
				},1);
				
				setTimeout(function(){						
					window.clearInterval(layer3)
				},700);
			},125);
			
			
			
			
			
			// layer 2
			
			setTimeout(function(){	
				var layer2 = setInterval(function(){
					for (var i=0;i<=12;i++){
						ctx.lineWidth = Math.floor((Math.random()*longestDimension/70)*lineWidthInput);
						
						window.radius = Math.floor((Math.random()*ldMultiplier*3.6) + ldMultiplier*3.5);
						
						randomize(colorArray[6],colorArray[7],colorArray[8]);
						ctx.beginPath();
						ctx.arc(window.x,window.y,window.radius, window.startAngle, window.endAngle, window.aC);
						ctx.stroke();
					}
				},1);
				
				setTimeout(function(){						
					window.clearInterval(layer2)
				},700);
			},250);
			
			
			
			// layer 1
			
			setTimeout(function(){	
				
				var layer1 = setInterval(function(){
					
					for (var i=0;i<=12;i++){
					
						ctx.lineWidth = Math.floor((Math.random()*longestDimension/160)*lineWidthInput);
					
						window.radius = Math.floor((Math.random()*ldMultiplier*3.6)+ldMultiplier*0.1);
						
						randomize(colorArray[9],colorArray[10],colorArray[11]);
						ctx.beginPath();
						ctx.arc(window.x,window.y,window.radius, window.startAngle, window.endAngle, window.aC);
						ctx.stroke();
					}
					
				},1);
				setTimeout(function(){						
					window.clearInterval(layer1)
				},700);
			},375);
			
			
		}
	}
}