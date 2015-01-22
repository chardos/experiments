var speed = 200;
var easingType = 'ease';
var skewAngle = '45deg';

function openMenu(){
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
}
function closeMenu(){
	$('#menu-container').delay(speed*4).hide(0);
	$('#close').delay(speed*3).transition({ 
		skewY: skewAngle,
		top: '-20px',
		width: '0px'
	}, speed, easingType);
	
	$('#whats-new').delay(speed*2).transition({ 
		skewY: skewAngle,
		top: '-20px', 
		width: '0px'
	}, speed, easingType);
	
	$('#good-to-know').delay(speed*1).transition({ 
		skewX: skewAngle,
		right: '118px', 
		height: '0px' 
	}, speed, easingType);
	
	$('#global-connections').transition({ 
		skewY: skewAngle,
		top: '158px', 
		width: '0px' 
	}, speed, easingType);
}

function openMenuIE(){
	$('#menu-container').css('display', 'block');
	
	$('#close').css('top','0px').animate({ 
		width: '138px'
	}, speed);
	
	$('#whats-new').css('top','0px').delay(speed*1).animate({ 
		width: '138px'
	}, speed);
	
	$('#good-to-know').css('right','138px').delay(speed*2).animate({ 
		height: '138px' 
	}, speed);
	
	$('#global-connections').css('top','138px').delay(speed*3).animate({ 
		width: '138px' 
	}, speed);
}

function closeMenuIE(){
	$('#menu-container').delay(speed*4).hide(0);
	$('#close').delay(speed*3).animate({ 
		width: '0px'
	}, speed);
	
	$('#whats-new').delay(speed*2).animate({ 
		width: '0px'
	}, speed);
	
	$('#good-to-know').delay(speed*1).animate({ 
		height: '0px' 
	}, speed);
	
	$('#global-connections').animate({ 
		width: '0px' 
	}, speed);
}


window.onload = function() {
	//IF BROWSER SUPPORTS TRANSITIONS
	if( $('html').hasClass('csstransitions') == true){
		
		//ON CLICK: FOLD OUT MENU
		$('#menu-button').on("click", function(event){
			openMenu();
			
			//ALLOW CLOSE MENU ONLY AFTER FOLD OUT FINISHES
			setTimeout(function(){
				$('#close').one("click", function(event){
					closeMenu();
				});
			},speed*4)
		});
		
	} 
	//IF BROWSER DOESNT SUPPORT TRANSITIONS
	else {
		//ON CLICK: FOLD OUT MENU
		$('#menu-button').on("click", function(event){
			openMenuIE();
			
			//ALLOW CLOSE MENU ONLY AFTER FOLD OUT FINISHES
			setTimeout(function(){
				$('#close').one("click", function(event){
					closeMenuIE();
				});
			},speed*4)
		});
	}
	
	
	
	
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