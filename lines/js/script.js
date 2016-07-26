var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width  = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var fps = 60;
var lines = [];

//sort out the inconsistent speed
//chop off the extra edges
// add curves

Linework.setContext(ctx);
var line1 = new Linework();
line1.setPosition(100,100);
line1.drawTo(200,400).drawTo(350,250).drawTo(400,400).drawTo(50,200);

// var line2 = new Linework();
// line2.setPosition(200,100);
// line2.drawTo(155,150);
//
// var line3 = new Linework();
// line3.setPosition(200,200);
// line3.drawTo(200,100);



// for(var i = 0; i<150; i++){
// 	lines.push( new Linework() );
// }

// var interval = setInterval(()=>{
// 	lines.forEach(function(line){
// 		console.log(line.lineWidth);
// 		if(line.lastPosition){
// 			line.draw(line.lastPosition, line.currentPosition, line.lineWidth, ctx);
// 		}
// 		//set new positions
// 		line.lastPosition = $.extend({}, line.currentPosition); //deep copy current pos
// 		line.currentPosition = move(line.currentPosition, line.direction);
// 		//wrap positions if necessary
// 		[line.currentPosition, line.lastPosition] = wrapAround(line.currentPosition, line.lastPosition)
//
// 		line.secondsTilChange--;
// 		if(line.secondsTilChange <= 0){
// 			line.secondsTilChange = random(3,6) * 60;
// 			line.direction = turnLeftOrRight( line.direction, random(0,1) );
// 		}
// 		// line.lineWidth += .02;
// 	})
// },1000/fps)
