//Figure out a way of composing this into the Line constructor

Linework.setContext = function (ctx){
	this.prototype.ctx = ctx;
}
Linework.prototype.setPosition = function (x, y){
  this.origin = {x: x, y: y};
	this.queue = [];
}
Linework.prototype.pushToQueue = function (type, x, y){
  this.queue.push({
		type: type,
		position: {
			x: x,
			y: y
		}
	})
}
Linework.prototype.findDegrees = function(p1, p2){
  var deg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
	if(deg < 0) deg += 360;
	return deg;
}
Linework.prototype.getNextPos = function(angle){
	angle = toRadians(angle)
	var a = {
		x: this.currPos.x + (Math.cos(angle) * this.speed),
		y: this.currPos.y + (Math.sin(angle) * this.speed)
	}
	// console.log(a);
	return a
}
Linework.prototype.setup = function(origin, nextPos){
	this.currPos =  $.extend({}, this.origin);
  this.angle = this.findDegrees(this.currPos, this.destination);
  this.nextPos = this.getNextPos(this.angle);
  this.direction = this.getDirection(this.angle);
}
Linework.prototype.drawLineSegment = function(ctx, currPos, nextPos){
	ctx.beginPath();
	ctx.moveTo(currPos.x, currPos.y);
	ctx.lineTo(nextPos.x, nextPos.y);
	ctx.stroke();
	ctx.closePath();
}
Linework.prototype.getDirection = function(angle){
	// Get the direction the line is travelling in
	// console.log(angle);
	if(angle >= 225 && angle < 315){
		return 'up';
	}
	else if(angle >= 315 || angle < 45){
		return 'right';
	}
	else if(angle >= 45 && angle < 135){
		return 'down';
	}
	else if(angle >= 135 && angle < 225){
		// console.log('left');
		return 'left';
	}
}
Linework.prototype.hasReachedDestination = function(direction, currPos, dest){
	if(direction == 'up' && this.currPos.y > this.destination.y){
		return false;
	}
	if(direction == 'down' && this.currPos.y < this.destination.y){
		return false;
	}
	if(direction == 'left' && this.currPos.x > this.destination.x){
		return false;
	}
	if(direction == 'right' && this.currPos.x < this.destination.x){
		return false;
	}
	return true;
}



function move(pos, direction){
	if(direction == 'up'){
		return { x: pos.x, y: pos.y - 1};
	}
	else if(direction == 'right'){
		return { x: pos.x + 1, y: pos.y };
	}
	else if( direction == 'down' ){
		return { x: pos.x, y: pos.y + 1 };
	}
	else if( direction == 'left' ){
		return { x: pos.x - 1, y: pos.y };
	}
}

function getRandomDirection(n){
	var directions = ['up', 'right', 'down', 'left'];
	return directions[n];
}
function turnLeftOrRight(direction, n){
	var directions = ['up', 'right', 'down', 'left'];
	var direction = directions.indexOf(direction)
	if(n == 0){ //left
		direction--;
	}
	else{ //right
		direction++;
	}
	if(direction == 4) direction = 0;
	if(direction == -1) direction = 3;
	return directions[direction]
}

function wrapAround(pos, lastPos){
	if(pos.x > windowWidth){
		pos.x = 0;
		lastPos.x = 0;
	}
	if(pos.x < 0){
		pos.x = windowWidth;
		lastPos.x = windowWidth;
	}
	if(pos.y > windowHeight){
		pos.y = 0;
		lastPos.y = 0;
	}
	if(pos.y < 0){
		pos.y = windowHeight;
		lastPos.y = windowHeight;
	}
	return [pos, lastPos];
}
function toRadians(deg){
	return deg * Math.PI / 180;
}
function random(a, b){
	var range = b - a + 1;
	return Math.floor(Math.random()*range) + a;
}
function randomFloat(a, b){
	var range = b - a + 1;
	return Math.random()*range + a;
}
