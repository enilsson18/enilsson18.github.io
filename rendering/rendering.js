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

    /*
    var p = get2dCoords(cam, new Vertex(0,0,0,0));
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    */

    //console.log(p);
    console.log(cam);

    spin(cube);

    drawMesh(cam, cube, "#000")
}

function drawMesh(camera, shape, color){
    ctx.strokeStyle = color;

    for (var i = 0; i < shape.connections.length; i++){
        var p1 = get2dCoords(camera, shape.getVertecies()[shape.connections[i][0]]);
        var p2 = get2dCoords(camera, shape.getVertecies()[shape.connections[i][1]]);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}

function get2dCoords(camera, vertex){
    /*
    //console.log(camera.x + " " + camera.y + " " + camera.z);
    var xRot = (180/Math.PI) * Math.atan2(vertex.y - camera.y, vertex.z - camera.z);
    var yRot = (180/Math.PI) * Math.atan2(vertex.z - camera.z, vertex.x - camera.x);
    //var zRot = (Math.PI/180) * Math.atan2(vertex.y - camera.y, vertex.x - camera.x);

    xRot -= camera.rx-camera.vfov/2;
    yRot -= camera.ry-camera.fov/2;
    //zRot += camera.rz-camera.fov/2;

    var x = (yRot/camera.fov) * canvas.width;
    var y = (xRot/camera.vfov) * canvas.height;
    console.log(x/canvas.width + " " + camera.ry);
    //console.log(y/canvas.height + " " + camera.rx);
    */

    var a = new Vec(vertex.x-camera.x, vertex.y-camera.y, vertex.z-camera.z);
    var o = new Vec((camera.rx)*(Math.PI/180), (camera.ry)*(Math.PI/180), (camera.rz)*(Math.PI/180));
    var d = new Vec(0,0,0);
    var e = new Vec(0.5,0.375,1);

    d.x = Math.cos(o.y)*(Math.sin(o.z)*a.y + Math.cos(o.z)*a.x) - Math.sin(o.y)*a.z;
    d.y = Math.sin(o.x)*(Math.cos(o.y)*a.z + Math.sin(o.y)*(Math.sin(o.z)*a.y + Math.cos(o.z)*a.x)) + Math.cos(o.x)*(Math.cos(o.z)*a.y-Math.sin(o.z)*a.x);
    d.z = Math.cos(o.x)*(Math.cos(o.y)*a.z + Math.sin(o.y)*(Math.sin(o.z)*a.y + Math.cos(o.z)*a.x)) - Math.sin(o.x)*(Math.cos(o.z)*a.y-Math.sin(o.z)*a.x);

    var x = (e.z/d.z)*d.x+e.x;
    var y = (e.z/d.z)*d.y+e.y;
    x *= canvas.width;
    y *= canvas.width;

    //console.log(x + " " + y);

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

    this.scale = function(fx, fy, fz){
        for (var i = 0; i < this.vertecies.length; i++){
            this.vertecies[i].x *= fx;
            this.vertecies[i].y *= fy;
            this.vertecies[i].z *= fz;
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
    this.ry = 0;
    this.rz = 0;
    this.fov = 60;
    this.vfov = this.fov * (canvas.height/canvas.width);

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
        if (type == "right") {
            this.z += Math.cos((this.ry+90) * (Math.PI / 180)) * speed;
            this.x += Math.sin((this.ry+90) * (Math.PI / 180)) * speed;
        }
        if (type == "left") {
            this.z += Math.cos((this.ry-90) * (Math.PI / 180)) * speed;
            this.x += Math.sin((this.ry-90) * (Math.PI / 180)) * speed;
        }
        if (type == "forward") {
            this.z += Math.cos((this.ry) * (Math.PI / 180)) * speed;
            this.x += Math.sin((this.ry) * (Math.PI / 180)) * speed;
        }
        if (type == "backward") {
            this.z -= Math.cos((this.ry) * (Math.PI / 180)) * speed;
            this.x -= Math.sin((this.ry) * (Math.PI / 180)) * speed;
        }
        if (type == "up") {
            this.y -= Math.cos((this.rx) * (Math.PI / 180)) * speed;
        }
        if (type == "down") {
            this.y += Math.cos((this.rx) * (Math.PI / 180)) * speed;
        }
    }
}

function spin(shape){
    var rot = new Rotation(0,1,0);

    for (var i = 0; i < shape.vertecies.length; i++){
        shape.vertecies[i] = rotate(shape.vertecies[i],rot);
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

function getDist(x1,y1,z1,x2,y2,z2){
    return Math.sqrt((Math.pow((x2-x1),2)+Math.pow((y2-y1),2) + Math.pow((z2-z1),2)));
}

function natRot(r){
    if (r < 0){
        return r + 360;
    }
    return r % 360;
}

function spin(shape){
    var rot = new Vec(1*(Math.PI/180),2*(Math.PI/180),3*(Math.PI/180));

    for (var i = 0; i < shape.vertecies.length; i++){
        shape.vertecies[i] = rotate(shape.vertecies[i],rot);
    }
}

function rotate(point, rotation) {
    const sin = new Vec(
        Math.sin(rotation.x),
        Math.sin(rotation.y),
        Math.sin(rotation.z));

    const cos = new Vec(
        Math.cos(rotation.x),
        Math.cos(rotation.y),
        Math.cos(rotation.z));

    var temp1, temp2;

    temp1 = cos.x * point.y + sin.x * point.z;
    temp2 = -sin.x * point.y + cos.x * point.z;
    point.y = temp1;
    point.z = temp2;

    temp1 = cos.y * point.x + sin.y * point.z;
    temp2 = -sin.y * point.x + cos.y * point.z;
    point.x = temp1;
    point.z = temp2;

    temp1 = cos.z * point.x + sin.z * point.y;
    temp2 = -sin.z * point.x + cos.z * point.y;
    point.x = temp1;
    point.y = temp2;

    return point;
}

function Vec(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}