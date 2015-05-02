var V = V || {};

V.starburst = {};

V.starburst.config = {
  panMultiplier: 300, //how much mouse affects pan
  numberParticles: 15000,
}

V.starburst.vars={
  particleBaseSize: 0.7,
  sphereFloor: 0,
  sphereRange: 1,
  baseHue: 0
}

V.starburst.makeParticles = function() { 
        
  var sCfg = V.starburst.config;
  var sVars = V.starburst.vars;
  var particleGeom = new THREE.Geometry();
  var material; 
  var colors = [];

  //CREATE THE SPHERE
  for (var i = 0; i < sCfg.numberParticles; i++){

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
      size: sVars.particleBaseSize,
      vertexColors: THREE.VertexColors
  });

  particles = new THREE.PointCloud(particleGeom, material);
  scene.add( particles );
  
}


V.starburst.updateParticles = function() { 

  var cfg = V.config;
  var sCfg = V.starburst.config;
  var sVars = V.starburst.vars;

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

  // iterate through every particle
  for(var i=0; i<particles.geometry.vertices.length; i++) {
    particle = particles.geometry.vertices[i]; 

    //assign each particle to a FFT band
    var fftBand = i%(cfg.fftSize/2)
    var amplitude = frequencyData[fftBand];

    //make particles with 0 amplitude bounce to averagevolume
    if (amplitude == 0) amplitude = averageVolume; 

    particle.x = particle.origX * amplitude * sVars.sphereRange + particle.origX*sVars.sphereFloor;
    particle.y = particle.origY * amplitude * sVars.sphereRange + particle.origY*sVars.sphereFloor;
    particle.z = particle.origZ * amplitude * sVars.sphereRange + particle.origZ*sVars.sphereFloor;


    //colorize the particle
    colors[i] = new THREE.Color();
    var modifiedHue = sVars.baseHue + (frequencyData[fftBand]/250)
    colors[i].setHSL( modifiedHue, 1, .6 );

    //if no volume, blacken all particles.
    if (averageVolume == 0){
      colors[i].setHSL(0,0,0);
    }

    //move cam up down out on mouseY
    var cameraOffset = mouseY/windowHeight - 0.5;
    camera.position.y = cameraOffset * sCfg.panMultiplier;

    //rotate cam left right on mouseX
    var cameraOffset = mouseX/windowWidth - 0.5;
    camera.position.x = cameraOffset * sCfg.panMultiplier * -1;
    camera.lookAt(new THREE.Vector3(0,0,0));

  }
  sVars.baseHue += + 0.005;
  if (sVars.baseHue > 1) sVars.baseHue = 0;
  geometry.colors = colors;

}