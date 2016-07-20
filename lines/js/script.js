var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvas = document.createElement('canvas');
canvas.width  = windowWidth;
canvas.height = windowHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(100, 150);
ctx.lineTo(450, 50);
ctx.stroke();

function Line(){
  var x = Math.ceil(Math.random() * windowWidth)
  var y = Math.ceil(Math.random() * innerHeight)
	var last;
	var current = {x, y};
	var interval = setInterval(function(){
		if(last){
			ctx.beginPath();
			ctx.moveTo(last.x, last.y);
			ctx.lineTo(current.x, current.y);
			ctx.stroke();
			ctx.closePath();
		}
		last = $.extend({}, current);
		current.x++;


		//move the pointer 1px right
	},16)
}

var line = new Line();
var line2 = new Line();
