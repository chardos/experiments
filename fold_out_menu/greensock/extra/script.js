(function(){ //OPEN IIFE

var closeBtn;
var whatsNewBtn;
var gtkBtn;
var globalBtn;

var gsSpeed = .2;
var speed = 200;
var easingType = 'ease';
var skewAngle = '45deg';

function declareElements(){
	closeBtn = $('#close');
	whatsNewBtn = $('#whats-new');
	gtkBtn = $('#good-to-know');
	globalBtn = $('#global-connections');
}
function setElements(){
	TweenLite.set(closeBtn, {
		skewY: '45deg'
	});
	TweenLite.set(whatsNewBtn, {
		skewY: '45deg'
	});
	TweenLite.set(gtkBtn, {
		skewX: '-45deg'
	});
	TweenLite.set(globalBtn, {
		skewY: '45deg'
	});
}


function openMenu(){
	$('#menu-container').css('display', 'block');	
	
	TweenLite.to(closeBtn, gsSpeed, {
		skewY: '-45deg',
		top: '0px',
		width: '138px'
	});

	TweenLite.to(whatsNewBtn, gsSpeed, {
		skewY: '-45deg',
		top: '0px',
		width: '138px',
		right: '138px',
		delay: gsSpeed
	});

	TweenLite.to(gtkBtn, gsSpeed, {
		skewX: '0deg',
		top: '138px',
		right: '138px',
		height: '138px',		
		delay: gsSpeed * 2
	});

	TweenLite.to(globalBtn, gsSpeed, {
		skewY: '-45deg',
		top: '138px',
		left: '138px',
		width: '138px',
		delay: gsSpeed * 3
	});

}
function closeMenu(){
	$('#menu-container').delay(speed*4).hide(0);
	
	TweenLite.to(closeBtn, gsSpeed, {
		skewY: '45deg',
		top: '-20px',
		width: '0px',
		delay: gsSpeed * 3
	});

	TweenLite.to(whatsNewBtn, gsSpeed, {
		skewY: '45deg',
		top: '-20px',
		width: '0px',
		right: '130px',
		delay: gsSpeed * 2
	});

	TweenLite.to(gtkBtn, gsSpeed, {
		skewX: '-45deg',
		top: '118px',
		right: '118px',
		height: '0px',
		delay: gsSpeed
	});

	TweenLite.to(globalBtn, gsSpeed, {
		skewY: '45deg',
		left: '118px', 
		width: '0px'
	});

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

	declareElements();
	setElements();
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
			openMenu();
			
			//ALLOW CLOSE MENU ONLY AFTER FOLD OUT FINISHES
			setTimeout(function(){
				$('#close').one("click", function(event){
					closeMenu();
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

}()); //CLOSE IIFE