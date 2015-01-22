window.onload = function() {
	
	//ON CLICK: FOLD OUT MENU
	speed = 130;
	easingType = 'ease';
	$('#menu-button').one("click", function(event){
		
		$('#menu-container').css('display', 'block');
		
		$('#close').transition({ 
			skewY: '0deg',
			top: '0px',
			width: '138px'
		}, speed, easingType);
		
		$('#whats-new').delay(speed*1).transition({ 
			skewY: '0deg',
			top: '0px', 
			width: '138px'
		}, speed, easingType);
		
		$('#good-to-know').delay(speed*2).transition({ 
			skewX: '0deg',
			right: '138px', 
			height: '138px' 
		}, speed, easingType);
		
		$('#global-connections').delay(speed*3).transition({ 
			skewY: '0deg',
			top: '138px', 
			width: '138px' 
		}, speed, easingType);
	});
	
	//ON CLICK: CLOSE MENU
	$('#close').on("click", function(event){
		
		$('#menu-container').delay(speed*4).hide(0);
		
		$('#close').delay(speed*3).transition({ 
			skewY: '0deg',
			top: '-8px',
			width: '0px'
		}, speed, easingType);
		
		$('#whats-new').delay(speed*2).transition({ 
			skewY: '20deg',
			top: '-8px', 
			width: '0px'
		}, speed, easingType);
		
		$('#good-to-know').delay(speed*1).transition({ 
			skewX: '20deg',
			right: '130px', 
			height: '0px' 
		}, speed, easingType);
		
		$('#global-connections').transition({ 
			skewY: '20deg',
			top: '146px', 
			width: '0px' 
		}, speed, easingType);
		
		
		
		
	});
	
	
	//ON HOVER: CHANGE TO HOVER IMAGES
	$("#close").on("mouseover", function(){
		$(this).attr("src", "images/close-roll.png");
	});
	$("#close").on("mouseleave", function(){
		$(this).attr("src", "images/close.png");
	});
	$("#whats-new").on("mouseover", function(){
		$(this).attr("src", "images/whats-new-roll.png");
	});
	$("#whats-new").on("mouseleave", function(){
		$(this).attr("src", "images/whats-new.png");
	});
	$("#good-to-know").on("mouseover", function(){
		$(this).attr("src", "images/good-to-know-roll.png");
	});
	$("#good-to-know").on("mouseleave", function(){
		$(this).attr("src", "images/good-to-know.png");
	});
	$("#global-connections").on("mouseover", function(){
		$(this).attr("src", "images/global-connections-roll.png");
	});
	$("#global-connections").on("mouseleave", function(){
		$(this).attr("src", "images/global-connections.png");
	});
	
}