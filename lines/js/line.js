function Linework(){
  this.lineWidth = random(1,10);
	// this.direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	this.secondsTilChange = randomFloat(1,4) * 60;
  this.speed = 5;
  this.isAnimating = false;
  this.requiresSetup = true; //Only want to allow setup to happen once.
}

Linework.prototype.drawTo = function (x, y){
  var ctx = this.ctx;
  this.pushToQueue('drawTo', x,y)
  this.destination = this.queue[0].position;
  if(this.requiresSetup){
    this.setup();
    this.requiresSetup = false;
  }
  var self = this;

  //move one step forward
  function step(){
    // check if the current pos has reached (or gone past) the destination
    if(self.hasReachedDestination(self.direction, self.nextPos, self.destination)){

      //draw the line segment to the destination (instead of the nextPos,
      //so it doesn't go past the destination).
      self.drawLineSegment(ctx, self.currPos, self.destination);

      self.queue.shift(1);
      if(self.queue.length){
        self.origin = self.destination;
        self.destination = self.queue[0].position;
        self.setup();
      }
      else{
        //Queue has been completed.
        self.origin = self.destination;
        self.isAnimating = false;
        self.requiresSetup = true;
        return;
      }
    }
    else{
      self.drawLineSegment(ctx, self.currPos, self.nextPos);
      //set next coordinates
      self.currPos =  $.extend({}, self.nextPos);
      self.nextPos = self.getNextPos(self.angle);
    }

    requestAnimationFrame(step)

  }
  if(!this.isAnimating){
    // setInterval(step, 700)
    step()
    this.isAnimating = true;
  }

  return this;
}

//Desired API
// var line = new Linework()
// line.setPosition(x,y)
// line.drawTo(x, y, speed(optional), callback(optional))
// line.drawTo('30deg', distance, callback)
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
