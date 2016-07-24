function Linework(){
  this.lineWidth = random(1,10);
	this.direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	this.secondsTilChange = randomFloat(1,4) * 60;
}
Linework.prototype.speed = 1;
Linework.setContext = function (ctx){
	this.prototype.ctx = ctx;
}

Linework.prototype.setPosition = function (x, y){
  this.origin = {x: x, y: y};
  this.currPos = {x: x, y: y};
}
Linework.prototype.drawTo = function (x, y){
  var _this = this;
  var ctx = this.ctx;
  this.destination = {x: x, y: y};
  this.nextPos = {x: x, y: y}
  console.log(this.findDegrees(this.currPos, this.nextPos));
  //move one step forward
  function step(){
    ctx.beginPath();
    ctx.moveTo(_this.currPos.x, _this.currPos.y);
    ctx.lineTo(_this.nextPos.x, _this.nextPos.y);
    ctx.stroke();
    ctx.closePath();
  }
  // step();
  requestAnimationFrame(step)
}

Linework.prototype.findDegrees = function(p1, p2){
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}


//Desired API
// var line = new Linework()
// line.setPosition(x,y)
// line.drawTo(x, y, speed(optional), callback(optional))
// line.CurveTo(centerPointX, centerPointY, degrees, callback(optional))
// must be chainable

// Linework.prototype.draw = function (last, current, lineWidth, ctx){
// 	ctx.beginPath();
// 	ctx.moveTo(last.x, last.y);
// 	ctx.lineTo(current.x, current.y);
//   ctx.lineWidth = lineWidth;
// 	ctx.stroke();
// 	ctx.closePath();
// }
