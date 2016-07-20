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
	var direction = 'down';
	var last;
	var currentPosition = {x, y};
	var interval = setInterval(function(){
		if(last){
			ctx.beginPath();
			ctx.moveTo(last.x, last.y);
			ctx.lineTo(currentPosition.x, currentPosition.y);
			ctx.stroke();
			ctx.closePath();
		}
		last = $.extend({}, currentPosition);


		currentPosition = move(currentPosition, direction);


		//move the pointer 1px right
	},16)
}

function move(pos, direction){
	if(direction == 'up'){
		return { x: pos.x, y: pos.y - 1};
	}
	else if(direction == 'right'){
		return { x: pos.x + 1, y: pos.y };
	}
	else if( direction == 'down' ){
		return { x: pos.x, y: pos.y + 1 };
	}
	else if( direction == 'left' ){
		return { x: pos.x - 1, y: pos.y };
	}
}

var line = new Line();
var line2 = new Line();
