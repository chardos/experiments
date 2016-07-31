Linework.prototype.setPosition = function (x, y){
  this.origin = {x: x, y: y};
  this.currPos = {x: x, y: y};
	this.queue = [];
}

Linework.prototype.drawLineTo = function (x, y){
  this.queue.push(this.drawLineToFunc.bind(this, x, y))
  this.kickStart();
  //in kickstart, run thru the array
  return this;
}
Linework.prototype.drawLineToFunc = function(x, y){
  this.destination = {x:x, y:y};
  var self = this;
  self.setup();
  function step(){
    console.log('==========');
    console.log('dir', self.direction);
    console.log('nextpos',self.nextPos);
    console.log('dest', self.destination);
    if(self.hasReachedDestination(self.direction, self.nextPos, self.destination)){
      console.log('reached');
      self.queue.shift(1);
      self.origin = self.destination;
      if(self.queue.length) self.queue[0]();

    }
    else{
      self.drawLineSegment(ctx, self.currPos, self.nextPos);
      self.currPos =  $.extend({}, self.nextPos);
      self.nextPos = self.getNextPos(self.angle);
      console.log('nextPos',self.nextPos);
      requestAnimationFrame( step )
    }
  }
  requestAnimationFrame( step )

  console.log('origin', this.origin);
  console.log('destination', this.destination);
  return this;
}

// Linework.prototype.drawLine = function (deg, distance){
//   console.log('currpos', this.currPos);
//   var coords = this.getAngledPosition(this.currPos, deg, distance);
//   this.drawLineTo(coords.x, coords.y);
//   return this;
// }



//Desired API
// var line = new Linework()
// line.setPosition(x,y)
// line.drawLine(degrees, distance, callback)
// line.drawLineTo(x, y, speed(optional), callback(optional))
// line.turnLeft(degrees, distance)
// line.curveLeft(degrees, radius)
// line.drawCircle(degrees, radius)
