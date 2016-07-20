var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width  = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var fps = 60;

function Line(){
  var x = Math.ceil(Math.random() * windowWidth)
  var y = Math.ceil(Math.random() * innerHeight)
	var direction = 'down';
	var lastPosition;
	var currentPosition = {x, y};
	var interval = setInterval(function(){
		if(lastPosition){
			draw(lastPosition, currentPosition, ctx);
		}
		lastPosition = $.extend({}, currentPosition);


		currentPosition = move(currentPosition, direction);

		//move the pointer 1px right
	},1000/fps)
}



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
