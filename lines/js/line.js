function Linework(){
  this.lineWidth = random(1,10);
	// this.direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	this.secondsTilChange = randomFloat(1,4) * 60;
  this.speed = 2.2;
}


Linework.prototype.drawTo = function (x, y){
  var ctx = this.ctx;
  this.pushToQueue('drawTo', x,y)
  this.destination = this.queue[0].position;
  this.setup();

  //move one step forward
  function step(){
    //draw the line segment
    this.drawLineSegment(ctx, this.currPos, this.nextPos);

    //set next coordinates
    this.currPos =  $.extend({}, this.nextPos);
    this.nextPos = this.getNextPos(this.angle);

    // check if the current pos has reached destination
    if(this.hasReachedDestination(this.direction, this.currPos, this.destination)){
      console.log('reached');
      //pop 1 off the queue, set the next destination
      this.queue.shift(1);
      if(this.queue.length){
        this.origin = this.destination;
        this.destination = this.queue[0].position;
        this.setup();
      }
    }
    else{
      requestAnimationFrame(step.bind(this))
    }

  }
  // step();
  requestAnimationFrame(step.bind(this))

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
