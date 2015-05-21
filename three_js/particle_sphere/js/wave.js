
//TODO: create view following behind the wave
//TODO: make view where wave increases height based on ave volume
//TODO: alternate between the 2 (wave and sphere)


var V = V || {};

V.wave = {};

V.wave.config = {
  particleBaseSize: 3,
  cameraOffsetX: 800,
  panMultiplier: 1400, //how much mouse affects pan
  height: 128,//128 // number of particles high
  width: 500,
  spacing: 8,
  baseCamY: -400,
  baseCamZ: 900
}

V.wave.vars={
  heightToFFTratio: null,
  sphereFloor: 0,
  sphereRange: 1,
  baseHue: Math.random(),
  column: 0,
  colors: [],
  viz: 1,
  currentVolume: null,
  lastVolume: 500 //random large number
}

V.wave.makeParticles = function() { 

  var wCfg = V.wave.config;
  var wVars = V.wave.vars;
  particleGeom = new THREE.Geometry();
  var material; 
  var colors = [];
  camera.position.x = wCfg.cameraOffsetX * -1;
  camera.position.y = wCfg.baseCamY;
  camera.position.z = wCfg.baseCamZ;

  //set ratio
  wVars.heightToFFTratio = V.config.fftSize / V.wave.config.height;

  //CREATE THE PARTICLE GRID
  for (var i = 0; i < wCfg.width; i++){
    for (var i2 = 0; i2 < wCfg.height; i2++){
      //create sheet of particles
      var x = i * wCfg.spacing;
      var y = i2 * wCfg.spacing;
      var z = 0; 

      particleGeom.vertices.push( new THREE.Vector3() );
      var index = i*wCfg.height + i2;
      particleGeom.vertices[index].x = x;
      particleGeom.vertices[index].y = y - (wCfg.height * wCfg.spacing/2);
      particleGeom.vertices[index].z = z;

      // vertex colors
      colors[index] = new THREE.Color(1,1,1);
      var hue = Math.random();
      colors[index].setHSL( hue, 1.0, 0 );
      particleGeom.vertices[index].hue = hue;
    }
  }
  particleGeom.colors = colors;
    
  // material
  material = new THREE.PointCloudMaterial({
    size: wCfg.particleBaseSize,
    vertexColors: THREE.VertexColors,
    sizeAttenuation: true
  });

  particles = new THREE.PointCloud(particleGeom, material);
  
 
  scene.add( particles );

}

V.wave.selectColumn = function(index) { 
  var column = {};
  column.particles = [];
  column.indices = [];
  var startI = this.config.height*index;
  var endI = this.config.height*index + this.config.height
  for(var i=startI; i<endI; i++) {
    column.particles.push(particles.geometry.vertices[i]); 
    column.indices.push(i); 
  }
  return column;
}

V.wave.updateParticles = function() { 

  var cfg = V.config;
  var wCfg = V.wave.config;
  var wVars = V.wave.vars;

  //AUDIO ------------------------------------

  //get audio data
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);

  wVars.currentVolume = 0;
  for(var i=0; i<frequencyData.length; i++) { 
    wVars.currentVolume += frequencyData[i];
  }
  wVars.currentVolume /= V.config.fftSize;

  var volumeDelta = wVars.currentVolume - wVars.lastVolume;
  if(volumeDelta > 5){
    V.waveChangeViz();
  };


  //var volAdjust = (1 - audioElement.volume)  ;


  wVars.lastVolume = wVars.currentVolume; 





  //PARTICLES ------------------------------------

  particles.geometry.verticesNeedUpdate = true;
  particles.geometry.colorsNeedUpdate = true;

  currentColumn = V.wave.selectColumn(wVars.column);
  wVars.column++;
  if(wVars.column >= wCfg.width){
    wVars.column = 0;
  }

  // move particles to the left
  for(var i=0; i<particles.geometry.vertices.length; i++) {
    particle = particles.geometry.vertices[i]; 
    particle.x -= wCfg.spacing;
    if(particle.x < wCfg.width * wCfg.spacing * -1){
      particle.x = 0 - wCfg.spacing;
    }
  }

  //set z values + colors
  for(var i=0; i < currentColumn.particles.length; i++) {
    particle = currentColumn.particles[i]; 
    index = currentColumn.indices[i]; 

    //assign each particle to a FFT band
    var fftBand = i%(cfg.fftSize/wVars.heightToFFTratio)
    var amplitude = frequencyData[fftBand];

    particle.z = amplitude;

    //colorize the particle
    wVars.colors[index] = new THREE.Color();
    var modifiedHue = wVars.baseHue + (frequencyData[fftBand]/600)
    wVars.colors[index].setHSL( modifiedHue, 1, amplitude/255 );

  }
  particles.geometry.colors = wVars.colors;

  wVars.baseHue += + 0.0003;
  if (wVars.baseHue > 1) wVars.baseHue = 0;


  //move cam up down out on mouseY
  //var cameraOffset = mouseY/windowHeight - 0.5;
  //camera.position.y = cameraOffset * wCfg.panMultiplier;

  //rotate cam left right on mouseX
  //var cameraOffset = mouseX/windowWidth - 0.5;
  //camera.position.x = cameraOffset * wCfg.panMultiplier * -1 - wCfg.cameraOffsetX;
  camera.lookAt(new THREE.Vector3(camera.position.x,0,0));

}


V.waveChangeViz = function(){
  var wCfg = V.wave.config;
  var wVars = V.wave.vars;

  wVars.viz = V.oneToRand(4)
  if(wVars.viz == 1){
    camera.position.z = wCfg.baseCamZ* 0.7;
  }
  if(wVars.viz == 2){
    camera.position.z = wCfg.baseCamZ* 0.8;
  }
  if(wVars.viz == 3){
    camera.position.z = wCfg.baseCamZ* 1;
  }
  if(wVars.viz == 4){
    camera.position.z = wCfg.baseCamZ* 0.6;
  }
}


