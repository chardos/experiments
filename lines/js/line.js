function Line(){
  var x = Math.ceil(Math.random() * windowWidth)
  var y = Math.ceil(Math.random() * innerHeight)
	this.direction = getRandomDirection( random(0,3) );
	// var direction = getRandomDirection( random(0,3) );
	this.secondsTilChange = random(1,4) * 60;
	this.lastPosition = null;
	this.currentPosition = {x, y};

}

Line.prototype.draw = function (last, current, ctx){
	ctx.beginPath();
	ctx.moveTo(last.x, last.y);
	ctx.lineTo(current.x, current.y);
	ctx.stroke();
	ctx.closePath();
}
