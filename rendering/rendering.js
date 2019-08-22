var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = (window.innerHeight/3)*4;
canvas.height = window.innerHeight;

var fps = 30;
var loop = setInterval(main, 1000/fps);
var cam = new Camera();
var cube = new Shape("cube",0,0);

setInterval(keyLoop, 40);

function main(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, canvas.width, canvas.height);


    var p = get2dCoords(cam, new Vertex(0,0,0,0));
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 20, 0, 2 * Math.PI);
    ctx.fill();

    //console.log(p);
    //console.log(cam);

    drawMesh(cam, cube, "#000")
}

function drawMesh(camera, shape, color){
    ctx.strokeStyle = color;

    for (var i = 0; i < shape.connections.length; i++){
        var p1 = get2dCoords(camera, shape.getVertecies()[shape.connections[i][0]]);
        var p2 = get2dCoords(camera, shape.getVertecies()[shape.connections[i][1]]);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}

function get2dCoords(camera, vertex){
    console.log(camera.x + " " + camera.y + " " + camera.z);
    var xRot = (180/Math.PI) * Math.atan2(vertex.y - camera.y, vertex.z - camera.z);
    var yRot = (180/Math.PI) * Math.atan2(vertex.z - camera.z, vertex.x - camera.x);
    //var zRot = (Math.PI/180) * Math.atan2(vertex.y - camera.y, vertex.x - camera.x);

    xRot -= camera.rx-camera.fov/2;
    yRot -= camera.ry-camera.fov/2;
    //zRot += camera.rz-camera.fov/2;

    var x = (yRot/camera.fov) * canvas.width;
    var y = (xRot/camera.fov) * canvas.height;
    //console.log(x/canvas.width);

    return new Point(x,y);
}

//classes
function Shape(shape, v, c){
    //not recommended unless you know what you are doing
    if (shape == "none"){
        this.vertecies = v;
        this.connections = c;
    }
    else if (shape == "cube"){
        this.vertecies = [];
        this.connections = [];
        this.x = 0;
        this.y = 0;
        this.z = 0;

        //vertecies added
        this.vertecies.push(new Vertex(-1, -1, -1, 0));
        this.vertecies.push(new Vertex(-1, 1, -1, 1));
        this.vertecies.push(new Vertex(1, 1, -1, 2));
        this.vertecies.push(new Vertex(1, -1, -1, 3));
        this.vertecies.push(new Vertex(-1, -1, 1, 4));
        this.vertecies.push(new Vertex(-1, 1, 1, 5));
        this.vertecies.push(new Vertex(1, 1, 1, 6));
        this.vertecies.push(new Vertex(1, -1, 1, 7));

        //add the line connections
        this.connections.push([0,1]);
        this.connections.push([1,2]);
        this.connections.push([2,3]);
        this.connections.push([3,0]);
        this.connections.push([4,5]);
        this.connections.push([5,6]);
        this.connections.push([6,7]);
        this.connections.push([7,4]);
        this.connections.push([0,4]);
        this.connections.push([1,5]);
        this.connections.push([2,6]);
        this.connections.push([3,7]);
    }

    this.scale = function(factor){
        for (var i = 0; i < this.vertecies.length; i++){
            this.vertecies[i].x *= factor;
            this.vertecies[i].y *= factor;
            this.vertecies[i].z *= factor;
        }
    }

    this.rotate = function(degrees){
        for (var i = 0; i < this.vertecies.length; i++){

        }
    }

    this.getVertecies = function(){
        var list = this.vertecies;
        for (var i = 0; i < list.length; i++){
            list[i].x += this.x;
            list[i].y += this.y;
            list[i].z += this.z;
        }
        return list;
    }

    this.addVertex = function(vertex){
        this.vertecies.push(new Vertex(vertex.x, vertex.y, vertex.z, vertecies.length));
    }
}

function Point(x,y){
    this.x = x;
    this.y = y;
}

function Vertex(nx, ny, nz, id){
    this.x = nx;
    this.y = ny;
    this.z = nz;
    this.id = id;
}

function Camera(){
    this.x = 0;
    this.y = 0;
    this.z = -5;
    this.rx = 0;
    this.ry = 90;
    this.rz = 0;
    this.fov = 60;

    this.setProperties = function(nx, ny, nz, nrx, nry, nrz, nfov){
        this.x = nx;
        this.y = ny;
        this.z = nz;
        this.rx = nrx;
        this.ry = nry;
        this.rz = nrz;
        this.fov = nfov;
    };

    this.move = function(type, speed){
        if (type == "forward") {
            this.x += Math.cos(this.ry * (Math.PI / 180)) * speed;
            this.y += Math.sin(this.rx * (Math.PI / 180)) * speed;
            this.z += Math.sin(this.ry * (Math.PI / 180)) * speed;
        }
        if (type == "backward") {
            this.x -= Math.cos(this.ry * (Math.PI / 180)) * speed;
            this.y -= Math.sin(this.rx * (Math.PI / 180)) * speed;
            this.z -= Math.sin(this.ry * (Math.PI / 180)) * speed;
        }
        if (type == "right") {
            this.x += Math.cos((this.ry + 90) * (Math.PI / 180)) * speed;
            this.y += Math.sin((this.rx) * (Math.PI / 180)) * speed;
            this.z += Math.sin((this.ry + 90) * (Math.PI / 180)) * speed;
        }
        if (type == "left") {
            this.x -= Math.cos((this.ry + 90) * (Math.PI / 180)) * speed;
            this.y -= Math.sin((this.rx) * (Math.PI / 180)) * speed;
            this.z -= Math.sin((this.ry + 90) * (Math.PI / 180)) * speed;
        }
        if (type == "up") {
            this.y += Math.sin((this.rx - 90) * (Math.PI / 180)) * speed;
        }
        if (type == "down") {
            this.y -= Math.sin((this.rx - 90) * (Math.PI / 180)) * speed;
        }
    }
}

var keyState = {};
window.document.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.document.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
}, true);

function keyLoop() {
    var speed = 0.2;
    if (keyState[37]) {
        // left arrow
        cam.ry -= 1;
    }
    if (keyState[87]) {
        //w
        cam.move("forward", speed);
    }
    if (keyState[38]){
        cam.rx -= 1;
    }
    if (keyState[39]) {
        // right arrow
        cam.ry += 1;
    }
    if (keyState[40]){
        //down arrow
        cam.rx += 1;
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

function natRot(r){
    if (r < 0){
        return r + 360;
    }
    return r % 360;
}