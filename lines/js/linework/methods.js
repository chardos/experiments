Linework.prototype.setPosition = function (x, y){
  this.origin = {x: x, y: y};
	this.queue = [];
}

Linework.prototype.drawTo = function (x, y){
  var ctx = this.ctx;
  this.pushToQueue('drawTo', x,y)
  this.destination = this.queue[0].position;
  if(this.requiresSetup){
    this.setup();
    this.requiresSetup = false;
  }

  if(!this.isAnimating){
    // setInterval(step, 700)
    this.step(this)
    this.isAnimating = true;
  }

  return this;
}
