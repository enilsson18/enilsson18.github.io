var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = (window.innerHeight/3)*4;
canvas.height = window.innerHeight;

var fps = 30;
var loop = setInterval(main, 1000/fps);
var cam = new Camera();
var cube1 = Object.assign({}, Cube);;
var cube2 = Object.assign({}, Cube);
var blue = new Color(0,0,255,0);
var scene = [cube1,cube2];

cube2.x = 2;
cube2.color = "#F00";


setInterval(keyLoop, 40);

function main(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    /*
    var p = get2dCoords(cam, new Vertex(0,0,0,0));
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    */

    //console.log(p);
    //console.log(cam, scene);

    //spin(cube);
    renderScene(cam, scene)
}


//classes
//everything is made out of vertecies and triangles

var keyState = {};
window.document.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.document.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
}, true);

function keyLoop() {
    var speed = 0.2;
    var turnSpeed = 2;
    if (keyState[37]) {
        // left arrow
        cam.ry -= turnSpeed;
    }
    if (keyState[87]) {
        //w
        cam.move("forward", speed);
    }
    if (keyState[38]){
        cam.rx += turnSpeed;
    }
    if (keyState[39]) {
        // right arrow
        cam.ry += turnSpeed;
    }
    if (keyState[40]){
        //down arrow
        cam.rx -= turnSpeed;
    }
    if (keyState[83]) {
        // d
        cam.move("backward", speed);
    }
    if (keyState[68]) {
        cam.move("right", speed);
    }
    if (keyState[65]) {
        cam.move("left", speed);
    }
    if (keyState[32]){
        cam.move("up", speed);
    }
    if (keyState[16]){
        cam.move("down", speed);
    }
    cam.rx = natRot(cam.rx);
    cam.ry = natRot(cam.ry);
    cam.rz = natRot(cam.rz);
}