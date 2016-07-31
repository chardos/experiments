function Linework(){
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
