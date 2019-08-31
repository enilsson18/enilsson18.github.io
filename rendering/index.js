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

var fps = 60;
var loop = setInterval(main, 1000/fps);
var cam = new Camera(-10,-15,-10,315,45,0);
var cube1 = clone(Cube);
var cube2 = clone(Cube);
var py = clone(Pyramid);
var py2 = clone(Pyramid);
var scene = [cube1,cube2,py,py2];

py.y = -2;
py2.y = -2;
py2.x = 1;
cube2.x = 1;
cube1.x = -1;
py.x = -1;
cube2.paint(new Color(255,0,0));
py2.paint(new Color(255,0,0));
//py.scale(2,2,2);


setInterval(function(){defaultKeyLoop(cam)}, 1000/fps);
mouseControl = true;

function main(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    renderScene(cam, scene)
}