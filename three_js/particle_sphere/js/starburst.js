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
  baseHue: 0,
  view: 0,
  particleGeom: null
}

V.starburst.reset = function() { 
  V.starburst.vars.particleGeom.dispose();
}
V.starburst.makeParticles = function() { 
        
  var sCfg = V.starburst.config;
  var sVars = V.starburst.vars;

  sVars.particleGeom = new THREE.Geometry()
  var particleGeom = sVars.particleGeom;
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

  changeViewInt = setInterval(function(){
    V.starburst.changeView();
  },1500)
  
}


V.starburst.updateFrame = function() { 

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

  }
  sVars.baseHue += + 0.005;
  if (sVars.baseHue > 1) sVars.baseHue = 0;
  geometry.colors = colors;

  //move cam up down out on mouseY
  var cameraOffset = mouseY/windowHeight - 0.5;
  camera.position.y = cameraOffset * sCfg.panMultiplier;

  //rotate cam left right on mouseX
  var cameraOffset = mouseX/windowWidth - 0.5;
  camera.position.x = cameraOffset * sCfg.panMultiplier * -1;
  camera.lookAt(new THREE.Vector3(0,0,0));

}


V.starburst.changeView = function(){
  var cfg = V.config;
  var sVars = V.starburst.vars;

  if(sVars.view == 0){
    console.log(0);
    sVars.sphereFloor = 100;
    sVars.sphereRange = 0.6;
    setTimeout(function(){
      cfg.baseZoom = 300;
    },700)
  }
  if(sVars.view == 1){
    console.log(1);
    cfg.baseZoom = 175;
    setTimeout(function(){
      particles.material.size = sVars.particleBaseSize * 2;
    },700)
    setTimeout(function(){
      particles.material.size = sVars.particleBaseSize = 0.7;
    },1200)
  }
  if(sVars.view == 2){
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
  if(sVars.view == 3){
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
  if(sVars.view == 4){
    console.log(4);
    V.starburst.vars.sphereFloor=120;
    V.starburst.vars.sphereRange=.05;
    setTimeout(function(){
      cfg.baseZoom = 160;
    },1300)
  }


  sVars.view++;
  if(sVars.view > 4){
    sVars.view = 0;
  }
}

