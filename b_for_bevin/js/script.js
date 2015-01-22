window.onload = function(){
		
		//load transitions stylesheet for modern browsers, regular for < IE8
		yepnope({
		  test : Modernizr.csstransitions,
		  yep  : ['css/reset.css', 'css/style-transitions.css'],
		  nope : ['css/reset.css', 'css/style.css']
		});
		
		//animate sprite
		var height = 0;
		var t=setInterval( function(){
			$('.cartoon .animation').css('background-position', '0px ' + height + 'px');
			height += 330;

			if ( height > 3300 ){
				height = 0;
			}
		},30);
    
}