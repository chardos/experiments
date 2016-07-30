function Linework(){
  this.lineWidth = random(1,10);
	// this.direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	this.secondsTilChange = randomFloat(1,4) * 60;
  this.speed = 1;
  this.isAnimating = false;
}

Linework.prototype.drawTo = function (x, y){
  var ctx = this.ctx;
  this.pushToQueue('drawTo', x,y)
  this.destination = this.queue[0].position;
  this.setup();
  var self = this;

  //move one step forward
  function step(){
    //draw the line segment
    self.drawLineSegment(ctx, self.currPos, self.nextPos);

    //set next coordinates
    self.currPos =  $.extend({}, self.nextPos);
    self.nextPos = self.getNextPos(self.angle);

    // check if the current pos has reached destination
    if(self.hasReachedDestination(self.direction, self.currPos, self.destination)){
      console.log('reached');
      self.queue.shift(1);
      if(self.queue.length){
        self.origin = self.destination;
        self.destination = self.queue[0].position;
        self.setup();
        requestAnimationFrame(step)
      }
    }
    else{
      requestAnimationFrame(step)
    }

  }
  if(!this.isAnimating){
    step()
    this.isAnimating = true;
  }

  return this;
}

// [{
//   type: 'drawTo',
//   position: {
//     x: 10,
//     y: 20
//   }
// }]

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
