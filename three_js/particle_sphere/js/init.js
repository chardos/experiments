//config


var V = V || {};

V.config = {
  viz: 0,
  baseZoom: 200,
  fps: 60,
  fftSize: 512
}

var lastCalledTime;
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
// the main three.js components
var camera, scene, renderer

var mouseX = 0;
var mouseY = 0;
var particles;


V.init = function() {

  // field of view, aspect ratio for render output, near and far clipping plane. 
  camera = new THREE.PerspectiveCamera(80, windowWidth / window.innerHeight, 1, 4000 );
  camera.position.z = V.config.baseZoom;

  // the scene contains all the 3D object data
  scene = new THREE.Scene();
  
  // camera needs to go in the scene 
  scene.add(camera);


  // and the CanvasRenderer figures out what the 
  // stuff in the scene looks like and draws it!

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  // the renderer's canvas domElement is added to the body
  document.body.appendChild( renderer.domElement );
  V.wave.makeParticles(); 

  // add the mouse move listener
  document.addEventListener( 'mousemove', updateMouseCoords, false );
  // render 30 times a second (should also look 
  // at requestAnimationFrame) 
  int = setInterval(update,1000/V.config.fps); 
  renderer.render( scene, camera );

  /*var changeViz = setInterval(function(){
    V.changeViz();
  },1500)*/

}

function update() {
  renderer.render( scene, camera ); // and render the scene from the perspective of the camera
  V.wave.updateParticles();
  calcFPS();
}


// --------------------------------------------------------------------------
// AUDIO STARTS HERE
// --------------------------------------------------------------------------

var context = new AudioContext();
var audioElement = document.getElementById("player");
var analyser = context.createAnalyser();
analyser.fftSize = V.config.fftSize;

var source = context.createMediaElementSource(audioElement);
source.connect(analyser);
source.connect(context.destination);


V.init();
