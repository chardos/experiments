var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width  = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var fps = 60;

//create an array holding all line instances
//add diagonals

function Line(){
  var x = Math.ceil(Math.random() * windowWidth)
  var y = Math.ceil(Math.random() * innerHeight)
	var direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	var secondsTilChange = random(1,4) * 60;
	var lastPosition;
	var currentPosition = {x, y};
	var interval = setInterval(function(){
		if(lastPosition){
			draw(lastPosition, currentPosition, ctx);
		}
		//set new positions
		lastPosition = $.extend({}, currentPosition); //deep copy current pos
		currentPosition = move(currentPosition, direction);
		//wrap positions if necessary
		[currentPosition, lastPosition] = wrapAround(currentPosition, lastPosition)

		secondsTilChange--;
		if(secondsTilChange <= 0){
			secondsTilChange = random(3,6) * 60;
			direction = turnLeftOrRight( direction, random(0,1) );
		}

	},1000/fps)
}


for(var i = 0; i<50; i++){
	var line = new Line();
}
