//Awesome tutorial https://www.mathsisfun.com/algebra/trig-finding-side-right-triangle.html

function toRadians(deg){
	return deg * Math.PI / 180;
}
function toDegrees(radians) {
  return radians * 180 / Math.PI;
};


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.lineWidth = 3;
//draw first line
ctx.moveTo(100, 100);
ctx.lineTo(150, 100);
//----draw 39 degree line

//find y distance
var xDist = Math.cos(toRadians(20)) * 50;
var yDist = Math.sin(toRadians(20)) * -50;

ctx.lineTo(150 + xDist, 100 + yDist)

ctx.stroke();
ctx.closePath();
