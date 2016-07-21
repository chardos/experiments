var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width  = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var fps = 60;
var lines = [];

//create an array holding all line instances
//add diagonals



for(var i = 0; i<100; i++){
	lines.push( new Line() );
}

var interval = setInterval(()=>{
	lines.forEach(function(line){
		if(line.lastPosition){
			line.draw(line.lastPosition, line.currentPosition, ctx);
		}
		//set new positions
		line.lastPosition = $.extend({}, line.currentPosition); //deep copy current pos
		line.currentPosition = move(line.currentPosition, line.direction);
		//wrap positions if necessary
		[line.currentPosition, line.lastPosition] = wrapAround(line.currentPosition, line.lastPosition)

		line.secondsTilChange--;
		if(line.secondsTilChange <= 0){
			line.secondsTilChange = random(3,6) * 60;
			line.direction = turnLeftOrRight( line.direction, random(0,1) );
		}
	})

},1000/fps)
