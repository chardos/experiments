function Linework(){
  this.lineWidth = random(1,10);
	// this.direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	this.secondsTilChange = randomFloat(1,4) * 60;
  this.speed = 3;
  this.isAnimating = false;
  this.requiresSetup = true; //Only want to allow setup to happen once.
}





// Linework.prototype.draw = function (last, current, lineWidth, ctx){
// 	ctx.beginPath();
// 	ctx.moveTo(last.x, last.y);
// 	ctx.lineTo(current.x, current.y);
//   ctx.lineWidth = lineWidth;
// 	ctx.stroke();
// 	ctx.closePath();
// }
