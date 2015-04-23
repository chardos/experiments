var V = V || {};

V.starburst = {};

V.starburst.config = {
  zoomMultiplier:  100, //how much the mouse will affect zoom
  panMultiplier:  300, //how much mouse affects pan
  particleBaseSize:  0.7,
  numberParticles:  15000
}

V.starburst.vars={
  sphereFloor: 0,
  sphereRange: 1
}

V.starburst.makeParticles = function() { 
        
  var cfg = V.starburst.config;
  var particleGeom = new THREE.Geometry();
  var material; 
  var colors = [];

  //CREATE THE SPHERE
  for (var i = 0; i < cfg.numberParticles; i++){

    //create particle within half sphere
    var x = -1 + Math.random() * 2;
    var y = -1 + Math.random() * 2;
    var z = Math.abs( -1 + Math.random() * 2 ); //abs = half sphere
    var sphere = spherize(x,y,z);

    particleGeom.vertices.push( new THREE.Vector3() );
    particleGeom.vertices[i].origX = sphere.x
    particleGeom.vertices[i].origY = sphere.y
    particleGeom.vertices[i].origZ = sphere.z

    // vertex colors
    colors[i] = new THREE.Color(1,1,1);
    colors[i].setHSL( Math.random(), 1.0, 0.5 );

  }
  particleGeom.colors = colors;
    
  // material
  material = new THREE.PointCloudMaterial({
      size: cfg.particleBaseSize,
      vertexColors: THREE.VertexColors
  });

  particles = new THREE.PointCloud(particleGeom, material);
  scene.add( particles );
  
}


V.starburst.updateParticles = function() { 

  var cfg = V.starburst.config;
  var vars = V.starburst.vars;

  //AUDIO ------------------------------------

  //get audio data
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);

  //PARTICLES ------------------------------------

  particles.geometry.verticesNeedUpdate = true;
  particles.geometry.colorsNeedUpdate = true;
  var colors = [];
  geometry = particles.geometry;

  // iterate through every particle
  for(var i=0; i<particles.geometry.vertices.length; i++) {
    particle = particles.geometry.vertices[i]; 

    //distance from center determined by mod
    var mod = i%(fftSize/2)
    var distFromCentre = frequencyData[mod];
    particle.x = particle.origX * distFromCentre * vars.sphereRange + particle.origX*vars.sphereFloor;
    particle.y = particle.origY * distFromCentre * vars.sphereRange + particle.origY*vars.sphereFloor;
    particle.z = particle.origZ * distFromCentre * vars.sphereRange + particle.origZ*vars.sphereFloor;

    colors[i] = new THREE.Color();
    var modifiedSaturation = baseSaturation + (frequencyData[mod]/250)
    colors[i].setHSL( modifiedSaturation, 1, .6 );

    //move cam zoom in out on mouseY
    var cameraOffset = mouseY/windowHeight - 0.5;
    camera.position.z = V.config.baseZoom + cameraOffset * cfg.zoomMultiplier;

    //rotate cam left right on mouseX
    var cameraOffset = mouseX/windowWidth - 0.5;
    camera.position.x = cameraOffset * cfg.panMultiplier * -1;
    camera.lookAt(new THREE.Vector3(0,0,0));

  }
  baseSaturation += + 0.005;
  if (baseSaturation > 1) baseSaturation = 0;
  geometry.colors = colors;

}