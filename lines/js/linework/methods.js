Linework.prototype.setPosition = function (x, y){
  this.origin = {x: x, y: y};
  this.currPos = {x: x, y: y};
	this.queue = [];
}

Linework.prototype.drawLineTo = function (x, y){
  var ctx = this.ctx;
  this.queue.push({
    type: 'drawLineTo',
    position:{
      x: x,
      y: y
    }
  })
  this.destination = this.queue[0].position;
  if(this.requiresSetup){
    this.setup();
    this.requiresSetup = false;
  }

  if(!this.isAnimating){
    this.step(this)
    this.isAnimating = true;
  }
  return this;
}
Linework.prototype.drawLine = function (deg, distance){
  console.log('currpos', this.currPos);
  var coords = this.getAngledPosition(this.currPos, deg, distance);
  this.drawLineTo(coords.x, coords.y);
  return this;
}

//Desired API
// var line = new Linework()
// line.setPosition(x,y)
// line.drawLine(degrees, distance, callback)
// line.drawLineTo(x, y, speed(optional), callback(optional))
// line.turnLeft(degrees, distance)
// line.curveLeft(degrees, radius)
// line.drawCircle(degrees, radius)
