$(document).ready(function(){
	var wheight = $(window).outerHeight();
	var $wrap = $('.wrap');
	$(document).on('mousemove', function(e){
		var yPos = e.pageY/wheight;
		var deg = 50 - (10*yPos);
		$wrap.css('transform', `rotateX(${deg}deg)`)
	})

	$(document).on('click', '.seat', function(){
		$(this).find('.seat-front').toggleClass('s-flipped');
	})
})
