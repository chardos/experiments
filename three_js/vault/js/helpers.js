

// called when the mouse moves
function updateMouseCoords( event ) {
  // store the mouseX and mouseY position 
  mouseX = event.clientX;
  mouseY = event.clientY;
}

//calc fps
function calcFPS(){
 if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (new Date().getTime() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = Math.ceil(1/delta);
  document.getElementById('fps').innerHTML = fps + 'fps';
}


function s(){ // stop
  clearInterval(int)
}