
//TODO: change particle brightness by amplitude
//TODO: make the particles repeatable




var V = V || {};

V.wave = {};

V.wave.config = {
  particleBaseSize: 3,
  panMultiplier: 1400, //how much mouse affects pan
  height: 128, // number of particles high
  width: 4000,
  spacing: 8,
  baseZoom: 600
}

V.wave.vars={
  heightToFFTratio: null,
  sphereFloor: 0,
  sphereRange: 1,
  baseHue: 0,
  column: 0,
  colors: []
}

V.wave.makeParticles = function() { 


  var wCfg = V.wave.config;
  var wVars = V.wave.vars;
  particleGeom = new THREE.Geometry();
  var material; 
  var colors = [];
  camera.position.z = wCfg.baseZoom;


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
      colors[index].setHSL( hue, 1.0, 0.5 );
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


  //PARTICLES ------------------------------------

  particles.geometry.verticesNeedUpdate = true;
  particles.geometry.colorsNeedUpdate = true;

  currentColumn = V.wave.selectColumn(wVars.column);
  wVars.column++;


  // move particles to the left
  for(var i=0; i<particles.geometry.vertices.length; i++) {
    particle = particles.geometry.vertices[i]; 
    particle.x -= wCfg.spacing;
  }

  for(var i=0; i< currentColumn.particles.length; i++) {
    particle = currentColumn.particles[i]; 
    index = currentColumn.indices[i]; 

    //assign each particle to a FFT band
    var fftBand = i%(cfg.fftSize/wVars.heightToFFTratio)
    var amplitude = frequencyData[fftBand];

    particle.z = amplitude;

    //colorize the particle
    wVars.colors[index] = new THREE.Color();
    var hue = particle.hue;
    wVars.colors[index].setHSL( hue, 1, amplitude/255 );

  }
  particles.geometry.colors = wVars.colors;



  //move cam up down out on mouseY
  var cameraOffset = mouseY/windowHeight - 0.5;
  camera.position.y = cameraOffset * wCfg.panMultiplier;

  //rotate cam left right on mouseX
  var cameraOffset = mouseX/windowWidth - 0.5;
  camera.position.x = cameraOffset * wCfg.panMultiplier * -1;
  camera.lookAt(new THREE.Vector3(0,0,0));

}

