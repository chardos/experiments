var V = V || {};
V.changeViz = function(){
  var cfg = V.config;
  var sVars = V.starburst.vars;

  if(cfg.viz == 0){
    console.log(0);
    sVars.sphereFloor = 100;
    sVars.sphereRange = 0.6;
    setTimeout(function(){
      cfg.baseZoom = 300;
    },700)
  }
  if(cfg.viz == 1){
    console.log(1);
    cfg.baseZoom = 175;
    setTimeout(function(){
      particles.material.size = sVars.particleBaseSize * 2;
    },700)
    setTimeout(function(){
      particles.material.size = sVars.particleBaseSize = 0.7;
    },1200)
  }
  if(cfg.viz == 2){
    console.log(2);
    sVars.sphereFloor = 0;
    sVars.sphereRange = 1;
    setTimeout(function(){
      cfg.baseZoom = 100;
    },700)
    setTimeout(function(){
      cfg.baseZoom = 300;
      V.starburst.vars.sphereFloor=120;
    V.starburst.vars.sphereRange=.05;
    },1200)
  }
  if(cfg.viz == 3){
    console.log(3);
    sVars.sphereFloor = 50;
    sVars.sphereRange = 1;
    cfg.baseZoom = 200;
    setTimeout(function(){
      sVars.sphereFloor = 80;
      cfg.baseZoom = 500;
    },300)
    setTimeout(function(){
      cfg.baseZoom = 500;
    },700)
    setTimeout(function(){
      cfg.baseZoom = 200;
    },1200)
  }
  if(cfg.viz == 4){
    console.log(4);
    V.starburst.vars.sphereFloor=120;
    V.starburst.vars.sphereRange=.05;
    setTimeout(function(){
      cfg.baseZoom = 160;
    },1300)
  }


  cfg.viz++;
  if(cfg.viz > 4){
    cfg.viz = 0;
  }
}


function spherize(x,y,z){
  var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  x *= d;
  y *= d;
  z *= d;
  return {x: x, y: y, z: z}
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


function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

document.getElementById("fps").addEventListener("click", function(){
  console.log('yo');
});
console.log('yo');

var elem = document.body; // Make the body go full screen.
requestFullScreen(elem);