
var pause;
var lastFD = 255;
var beatTolerance = 15;
var snare = false;
var colorArr = ['yellow', 'red', '#00f0ff', '#59ff3e'];
var activeColor;

$(document).ready(function() {

	//Initializing the canvas
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//canvas dimensions
	var W = $(document).width();
	var H = $(document).height()-5;
	canvas.width = W;
	canvas.height = H;
	
	
	var particles = [];

	//for (var i=0; i<50;i++){
	for (var i=0; i<128;i++){
		particles.push(new create_particle());
		console.log(i);
	}


	function create_particle(){
		this.x = Math.floor( Math.random() * W );
		this.y = Math.floor( Math.random() * H );
		this.vx = Math.random()*H/25 - (H/50);
		this.vy = Math.random()*H/25 - (H/50);
		this.r = Math.floor( Math.random() * W/20 );

		//random color
		var r = Math.ceil(( Math.random()*10 ))/10 + 0.3;
		this.color = 'rgba(0, 0, 0, '+r+')';
	}


	function draw(){

		//AUDIO ------------------------------------

		//get audio data
		frequencyData = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(frequencyData);

		//check values across the frequency range is going up
		var snareArr = [
			frequencyData[20] - lastFD[20],
			frequencyData[21] - lastFD[21],
			frequencyData[22] - lastFD[22],
			frequencyData[23] - lastFD[23],
			frequencyData[24] - lastFD[24],
			frequencyData[26] - lastFD[26],
			frequencyData[27] - lastFD[27]
		];

		//ATTEMPTED SNARE DETECTION
		var total = 0;

		for(var i = 0; i < snareArr.length; i++){
			total += snareArr[i];
		}

		var aveVolumeDelta = total / snareArr.length;
		//console.log(aveVolumeDelta);

		if (aveVolumeDelta > beatTolerance){
			snare = true;
			activeColor = colorArr[Math.floor(Math.random()*4)];
			console.log(snare);
		}
	
		//make a copy for comparison next frame
		lastFD = frequencyData;


		//VISUAL ------------------------------------

		ctx.fillStyle = activeColor;
		ctx.fillRect(0, 0, W, H);
		ctx.fillStyle = '#000000';

		for(var i=0; i<particles.length; i++){

			var p = particles[i];

		
			ctx.beginPath();

			//var soundRadius = p.r;
			var soundRadius = p.r * frequencyData[i] * frequencyData[i] * frequencyData[i] / 5000000;

			if (snare === true){
				if( Math.floor(Math.random()*2) == 1 ){
					p.vx *= -1;
					p.vy *= -1;
				}

				else{
					p.vx = Math.random()*H/25 - (H/50);
					p.vy = Math.random()*H/25 - (H/50);
				}
			}
			

			ctx.arc(p.x, p.y, soundRadius, 0, Math.PI*2);
			ctx.fillStyle = p.color;
			ctx.fill();

			//update arrays with new velocity
			p.y += p.vy;
			p.x += p.vx;

			//move balls back into canvas if they gone out
			var d = p.r*2; //diameter
			if(p.x > W + d && p.vx > 0){
				p.x = d * -1;
			}
			if(p.x < d*-1 && p.vx < 0){
				p.x = W + d;
			}
			if(p.y > H + d && p.vy > 0){
				p.y = d * -1;
			}
			if(p.y < d*-1 && p.vy < 0){
				p.y = H - d*-1;
			}
		}

		snare = false;

		if (pause === true){
			return;
		}
		//requestAnimationFrame(draw);

	}
	//requestAnimationFrame(draw);
	var a = setInterval(draw, 16)



	//add stop
	$('.start').click(function(){
		audioElement.play();
		pause = false;
		//requestAnimationFrame(draw);
		var a = setInterval(draw, 50)
	})
	$('.stop').click(function(){
		audioElement.pause();
		pause = true;
		clearInterval(a);

	})



	// --------------------------------------------------------------------------
	// AUDIO STARTS HERE
	// --------------------------------------------------------------------------

	var context = new webkitAudioContext();
	var audioElement = document.getElementById("player");
	var analyser = context.createAnalyser();
	analyser.fftSize = 256;

	audioElement.addEventListener("canplay", function() {
	    var source = context.createMediaElementSource(audioElement);
	    source.connect(analyser);
	    source.connect(context.destination);

	    
	});

	
});
