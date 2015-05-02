var V = V || {};

V.wave = {};

V.wave.config = {
  particleBaseSize: 1.5,
  panMultiplier: 300, //how much mouse affects pan
  height: 256, // number of particles high
  width: 20,
  spacing: 5
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
      particleGeom.vertices[index].y = y;
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
  particles.position.y = -100
  scene.add( particles );
  
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
  particles.geometry.colorsNeedUpdate = true;
  var colors = []; //create the array that will house all the colors of each particle
  geometry = particles.geometry;

 
  wVars.baseHue += + 0.005;
  if (wVars.baseHue > 1) wVars.baseHue = 0;
  geometry.colors = colors;

}