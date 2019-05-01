window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  document.getElementById("recordButton").addEventListener("click", startRecording);
  var mediaSource = new MediaSource();
  var fileName;

  function selectSong(f){
  	startSong(f);
  }

  function startRecording() { console.log("recordButton clicked"); }
  
  file.onchange = function() {
    fileName = setFileName(file.value);
  	startSong(file.files);
  };

  function setFileName(fullPath){
    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    var filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
    return (filename);
  }

  function startSong(source){
  	if (source == file.files){
  		audio.src = URL.createObjectURL(source[0]);
  	}
  	else {
      navigator.mediaDevices.getUserMedia().then(function(stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
    /* use the stream */
    audio.src = URL.createObjectURL(audioContext.createMediaStreamSource(stream));
    recordButton.disabled = false;
    stopButton.disabled = true;
    pauseButton.disabled = true
});
}
    
  	audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    var canvas = document.getElementById("canvas");
    canvas.width = (window.innerWidth)*.8;
    canvas.height = canvas.width/1.5;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength)*1.8;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#1E1F26";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      
      ctx.fillStyle = "#fff";
      ctx.font = "5vh Arial";
      ctx.textAlign = "center";
      ctx.fillText("Now Playing " + fileName, WIDTH/2, 100);

      for (var i = 0; i < bufferLength; i+=2) {
        barHeight = dataArray[i]+2;
        
        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  }  
};