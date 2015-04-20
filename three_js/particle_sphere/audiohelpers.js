var gettrack = document.getElementById('gettrack');
var textinput = document.getElementById('textinput');
var pauseBtn = document.getElementById('pause');
var playBtn = document.getElementById('play');

gettrack.addEventListener("click", function(e){
  console.log(SC);
  track_url = textinput.value;
  SC.get('/resolve', { url: track_url }, function(track) {
    console.log(track.id);
    audioElement.src = 'https://api.soundcloud.com/tracks/' + track.id + '/stream?client_id=74a591aaa5e9a7723d674ccf5fffe0bc'
  });
});

pause.addEventListener("click", function(e){
  audioElement.pause();
});

play.addEventListener("click", function(e){
  audioElement.play();
});
