//TODO: make centreline red (as test)
//TODO: make centreline affect by music



var V = V || {};

V.wave = {};

V.wave.config = {
  particleBaseSize: 1.5,
  panMultiplier: 75, //how much mouse affects pan
  height: 64, // number of particles high
  width: 200,
  spacing: 5.3
}

V.wave.vars={
  sphereFloor: 0,
  sphereRange: 1,
  baseHue: 0
}

V.wave.makeParticles = function() { 
        
  var wCfg = V.wave.config;
  var wVars = V.wave.vars;
  particleGeom = new THREE.Geometry();
  var material; 
  var colors = [];

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
      colors[index].setHSL( Math.random(), 1.0, 0.5 );
    }
  }
  particleGeom.colors = colors;
    
  // material
  material = new THREE.PointCloudMaterial({
    size: wCfg.particleBaseSize,
    vertexColors: THREE.VertexColors
  });

  particles = new THREE.PointCloud(particleGeom, material);
  
  a = V.wave.selectColumn(5);

  for(var i=0; i<a.length; i++) {
    particle = a[i]; 
    particle.x -= 50;
  }

  scene.add( particles );
}

V.wave.selectColumn = function(index) { 
  var column = [];
  var startI = this.config.height*index;
  var endI = this.config.height*index + this.config.height
  console.log(startI);
  console.log(endI);
  for(var i=startI; i<endI; i++) {
    column.push(particles.geometry.vertices[i]); 
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
  //get average
  var averageVolume = 0;
  for(var i=0; i<frequencyData.length/5; i++) { //divide by 4 = just the bass
    averageVolume += frequencyData[i];
  }
  averageVolume /= 500;

  //PARTICLES ------------------------------------

  particles.geometry.verticesNeedUpdate = true;

  //move only 2nd column left

  // move particles to the left
  for(var i=0; i<particles.geometry.vertices.length; i++) {
    particle = particles.geometry.vertices[i]; 
    //particle.x -= 5;
  }
  //move cam up down out on mouseY
  var cameraOffset = mouseY/windowHeight - 0.5;
  camera.position.y = cameraOffset * wCfg.panMultiplier;

  //rotate cam left right on mouseX
  var cameraOffset = mouseX/windowWidth - 0.5;
  camera.position.x = cameraOffset * wCfg.panMultiplier * -1;
  camera.lookAt(new THREE.Vector3(0,0,0));

}