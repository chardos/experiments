function spherize(x,y,z){
  var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  x *= d;
  y *= d;
  z *= d;
  return {x: x, y: y, z: z}
}


function colorize(freq){
  if (freq < 40) color = [1,0,0];
  else if (freq < 80) color = [1,0.2,0];
  else if (freq < 120) color = [1,0.4,0];
  else if (freq < 140) color = [1,0.6,0];
  else if (freq < 160) color = [1,0.8,0];
  else if (freq < 200) color = [1,1,0];
  else if (freq < 230) color = [0.8,1,0];
  else color = [0.6,1,0];
  return color;
}

      
// there isn't a built in circle particle renderer 
// so we have to define our own. 

function particleRender( context ) {
  // we get passed a reference to the canvas context
  context.beginPath();
  // and we just have to draw our shape at 0,0 - in this
  // case an arc from 0 to 2Pi radians or 360º - a full circle!
  context.arc( 0, 0, 1, 0,  Math.PI * 2, true );
  context.fill();
};


// called when the mouse moves
function updateMouseCoords( event ) {
  // store the mouseX and mouseY position 
  mouseX = event.clientX;
  mouseY = event.clientY;
}


function s(){ // stop
  clearInterval(int)
}