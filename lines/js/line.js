function Linework(){
  this.lineWidth = random(1,10);
	this.direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	this.secondsTilChange = randomFloat(1,4) * 60;
  this.speed = 1;
}


Linework.prototype.drawTo = function (x, y){
  var _this = this;
  var ctx = this.ctx;
  this.destination = {x: x, y: y};

  //setup
  this.currPos =  $.extend({}, this.origin);
  var angle = this.findDegrees(this.currPos, this.destination);
  this.nextPos = this.getNextPos(angle);
  var direction = this.getDirection(angle);
  console.log(angle);
  console.log(direction);

  //move one step forward
  function step(){
    //draw the line
    ctx.beginPath();
    ctx.moveTo(this.currPos.x, this.currPos.y);
    ctx.lineTo(this.nextPos.x, this.nextPos.y);
    ctx.stroke();
    ctx.closePath();

    //set next coordinates
    this.currPos =  $.extend({}, this.nextPos);
    this.nextPos = this.getNextPos(angle);

    // check if the current pos hasnt reached destination
    if(direction == 'up' && this.currPos.y > this.destination.y){
      requestAnimationFrame(step.bind(this))
    }
    if(direction == 'down' && this.currPos.y < this.destination.y){
      requestAnimationFrame(step.bind(this))
    }
    if(direction == 'left' && this.currPos.x > this.destination.x){
      requestAnimationFrame(step.bind(this))
    }
    if(direction == 'right' && this.currPos.x < this.destination.x){
      requestAnimationFrame(step.bind(this))
    }

  }
  // step();
  requestAnimationFrame(step.bind(this))
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
