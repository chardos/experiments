function Linework(){
  this.lineWidth = random(1,10);
	this.direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	this.secondsTilChange = randomFloat(1,4) * 60;
  this.speed = 50;
}


Linework.prototype.drawTo = function (x, y){
  var _this = this;
  var ctx = this.ctx;
  this.destination = {x: x, y: y};
  var angle = this.findDegrees(this.currPos, this.destination);
  //move one step forward
  function step(){
    //get the nextPos
    _this.nextPos = _this.getNextPos(angle);
    //draw the line
    ctx.beginPath();
    ctx.moveTo(_this.currPos.x, _this.currPos.y);
    ctx.lineTo(_this.nextPos.x, _this.nextPos.y);
    ctx.stroke();
    ctx.closePath();

    //
    // requestAnimationFrame(step)
  }
  // step();
  requestAnimationFrame(step)
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
