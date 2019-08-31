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

var fps = 30;
var loop = setInterval(main, 1000/fps);
var cam = new Camera(-10,-15,-10,315,45,0);
var cube1 = Object.assign({}, Cube);;
var cube2 = Object.assign({}, Cube);
var py = Object.assign({}, Pyramid);
var py2 = Object.assign({}, Pyramid);
var scene = [cube1,cube2,py,py2];

py.y = -2;
py2.y = -2;
py2.x = 1;
cube2.x = 1;
cube1.x = -1;
py.x = -1;
cube2.color = "#F00";
py2.color = "#F00";


setInterval(function(){defaultKeyLoop(cam)}, 40);

function main(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    renderScene(cam, scene)
}