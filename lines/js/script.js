var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width  = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var lines = [];

// try storing functions in the queue, instead of coordinates and types
//set speed functions for the class, and instances
// add curves

//Only happening to last drawn.


Linework.setContext(ctx);

var line = new Linework();
line.setPosition(100, 100);
line.drawLine(45,100)

// for(var i = 0; i<150; i++){
// 	lines.push( new Linework() );
// }
//
// lines.forEach(function(line){
//   //pick a random coordinate to animate to and start to.
//   line.setPosition(random(0,windowWidth), random(0,windowHeight))
//   line.drawLineTo(random(0,windowWidth), random(0,windowHeight))
//   //Start drawing in that direction, with a callback to make the next one
// })
