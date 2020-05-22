//canvas setup
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

//scale canvas to fit screen size at 16:9 res
if (window.innerWidth >= window.innerHeight) {
    canvas.width = (window.innerHeight / 9) * 16;
    canvas.height = window.innerHeight;
} else {
    canvas.height = (window.innerWidth / 16) * 9;
    canvas.width = window.innerWidth;
}

var fps = 40;
var loop = setInterval(main, 1000/fps);
var player = new Player(0,0,10,0,180,0);
var scene = [];

generateBaseMap();
generateTree(0,0,0);
scene = getBlockModels();

function main(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    player.main(scene);
    renderScene(player.cam, scene)
}