var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width  = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var fps = 60;

//randomize direction change timing
//start wrapping to otherside of screen
//create an array holding all line instances

function Line(){
  var x = Math.ceil(Math.random() * windowWidth)
  var y = Math.ceil(Math.random() * innerHeight)
	var direction = getRandomDirection( random(0,3) );
	var secondsTilChange = random(1,4) * 60;
	var lastPosition;
	var currentPosition = {x, y};
	var interval = setInterval(function(){
		if(lastPosition){
			draw(lastPosition, currentPosition, ctx);
		}
		lastPosition = $.extend({}, currentPosition); //deep copy current pos
		currentPosition = move(currentPosition, direction);

		secondsTilChange--;
		if(secondsTilChange <= 0){
			secondsTilChange = random(3,6) * 60;
			direction = getRandomDirection( random(0,3) );
		}

	},1000/fps)
}



var line = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
var line = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
var line2 = new Line();
