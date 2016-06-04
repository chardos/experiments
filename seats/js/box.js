$(document).ready(function(){
	var wheight = $(window).outerHeight();
	var $wrap = $('.wrap');
  var xSensitivity = 180;
  var ySensitivity = 180;

	$(document).on('mousemove', function(e){
    var xPos = e.pageX/wheight;
		var yPos = e.pageY/wheight;
    var xDeg = (xSensitivity - (xSensitivity*2*xPos)) * -1 ;
		var yDeg = ySensitivity - (ySensitivity*2*yPos);
		$wrap.css('transform', `rotateX(${yDeg}deg) rotateY(${xDeg}deg)`)
	})

	$(document).on('click', '.seat', function(){
		$(this).find('.seat-front').toggleClass('s-flipped');
	})
})
