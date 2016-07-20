//Figure out a way of composing this into the Line constructor

function draw(last, current, ctx){
	ctx.beginPath();
	ctx.moveTo(last.x, last.y);
	ctx.lineTo(current.x, current.y);
	ctx.stroke();
	ctx.closePath();
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
	var directions = ['up', 'down', 'left', 'right'];
	return directions[n];
}

function random(a, b){
	var range = b - a + 1;
	return Math.floor(Math.random()*range) + a;
}
