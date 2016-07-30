var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width  = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var lines = [];

//chop off the extra edges
//set speed functions for the class, and instances
// add curves

//Only happening to last drawn.

Linework.setContext(ctx);
var line1 = new Linework();
line1.setPosition(100,100);
line1.drawTo(165,100)
     .drawTo(155,205)
     .drawTo(255,305)
     .drawTo(125,405)
     .drawTo(535,300)

// var line2 = new Linework();
// line2.setPosition(200,100);
// line2.drawTo(155,150);
//
// var line3 = new Linework();
// line3.setPosition(200,200);
// line3.drawTo(200,100);



for(var i = 0; i<150; i++){
	lines.push( new Linework() );
}

	lines.forEach(function(line){
    //pick a random coordinate to animate to and start to.
    line.setPosition(random(0,windowWidth), random(0,windowHeight))
    line.drawTo(random(0,windowWidth), random(0,windowHeight))
    //Start drawing in that direction, with a callback to make the next one

	})
	// lines.forEach(function(line){
	// 	console.log(line.lineWidth);
	// 	if(line.lastPosition){
	// 		line.draw(line.lastPosition, line.currentPosition, line.lineWidth, ctx);
	// 	}
	// 	//set new positions
	// 	line.lastPosition = $.extend({}, line.currentPosition); //deep copy current pos
	// 	line.currentPosition = move(line.currentPosition, line.direction);
	// 	//wrap positions if necessary
	// 	[line.currentPosition, line.lastPosition] = wrapAround(line.currentPosition, line.lastPosition)
  //
	// 	line.secondsTilChange--;
	// 	if(line.secondsTilChange <= 0){
	// 		line.secondsTilChange = random(3,6) * 60;
	// 		line.direction = turnLeftOrRight( line.direction, random(0,1) );
	// 	}
	// 	// line.lineWidth += .02;
	// })
