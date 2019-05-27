var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

var x, y, rot, fovData;
var fov = 45, quality = 5, accuracy = .005;
var standardColor = new color(0,0,255);
var speed = .1;
var turnSpeed = 10;
var scale = canvas.width/(fov*quality);

var Map = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,9,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
];

reset();

function reset(){
    for (var i = 0; i < Map.length; i++) {
        for (var j = 0; j < Map[i].length; j++) {
            if (Map[i][j] == 9) {
                x = j;
                y = i;
            }
        }
    }
    rot = 180;

    const loop = setInterval(run, 25);
}

function run(){
    ctx.fillStyle = "#2B2B2B"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    sense();

    for (var i = 0; i < fovData.length; i++){
        var height = canvas.height/fovData[i].dist;
        ctx.fillStyle = fovData[i].color;
        if (canvas.height-(fovData[i].dist/10)*canvas.height < 0){
            distance = 1;
        }
        ctx.fillRect(i*scale, (canvas.height-height)/2, quality, height);
    }

    MiniMap();
}

function sense(){
    fovData = [];
    for (var i = 0; i < fov*quality; i++){
        var dist = 0;
        var tX = x;
        var tY = y;
        while(getQuadrant(tX,tY) == 0 || getQuadrant(tX,tY) == 9 ){
            tX += Math.cos((natRot((rot-(fov/2))+i/quality))*(Math.PI/180))*accuracy;
            tY += Math.sin((natRot((rot-(fov/2))+i/quality))*(Math.PI/180))*accuracy;
        }

        dist = Math.abs(Math.sqrt((Math.exp((x-tX))+Math.exp((y-tY)))));

        //console.log(tX + " " + tY + " " + getQuadrant(tX,tY));
        if (getQuadrant(tX,tY) == 1) {
            fovData.push(new fovSeg(dist, darken(standardColor.r,standardColor.g,standardColor.b,dist*10)));
        }
    }
}

function fovSeg(dist, c) {
    this.dist = dist;
    this.color = c;
}

function color(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;

    this.getColor = function(){
        return "rgb(" + r + "," + g + "," + b + ")";
    }
}

function getQuadrant(newX, newY){
    return Map[Math.floor(newY)][Math.floor(newX)];
}

function boundsCheck (){
    if (x > Map[0].length){
        x = Map[0].length;
    }
    if (y > Map.length){
        y = Map.length;
    }
    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }
}

function darken (r,g,b, amount){
    r -= amount;
    g -= amount;
    b -= amount;

    if (r<0){
        r = 0;
    }
    if (g<0){
        g = 0;
    }
    if (b<0){
        b = 0;
    }
    return "rgb(" + r + "," + g + "," + b + ")";
}

function MiniMap() {
    var mapWidth = 30 * Map[0].length;
    var mapHeight = 30 * Map.length;
    ctx.fillStyle = "#000";
    ctx.fillRect(10, 10, mapWidth + 20, mapHeight + 20);
    for (var i = 0; i < Map.length; i++) {
        for (var j = 0; j < Map[0].length; j++) {
            ctx.fillStyle = standardColor.getColor();
            if (Map[i][j] != 0 && Map[i][j] != 9) {
                ctx.fillRect(20 + (30 * j), 20 + (30 * i), 30, 30);
            }
        }
    }

    ctx.fillStyle = "#fff";
    ctx.fillRect(30 + (x * 30)-5, 30 + (y * 30)-5, 10, 10);
}

var keyState = {};
setInterval(keyLoop, 100);
window.document.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.document.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
}, true);

function keyLoop() {
    if (keyState[37]) {
        // left arrow
        rot -= turnSpeed;
    }
    if (keyState[38]) {
        // up arrow
        x += Math.cos((natRot((rot)))*(Math.PI/180))*speed;
        y += Math.sin((natRot((rot)))*(Math.PI/180))*speed;
    }
    if (keyState[39]) {
        // right arrow
        rot += turnSpeed;
        rot %= 360;
    }
    if (keyState[40]) {
        // down arrow
        x -= Math.cos((natRot((rot)))*(Math.PI/180))*speed;
        y -= Math.sin((natRot((rot)))*(Math.PI/180))*speed;
    }
    boundsCheck();
    rot = natRot(rot);
}

function natRot(r){
    if (r < 0){
        return r + 360;
    }
    return r % 360;
}