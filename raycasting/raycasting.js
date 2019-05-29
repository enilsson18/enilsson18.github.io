var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

var x, y, rot, fovData;
var fov = 45, quality = 10, accuracy = 0.02;
var standardColor = new color(0,0,255);
var red = new color(255,0,0);
var speed = 0.08;
var turnSpeed = 4;
var scale = canvas.width/(fov*quality);
var globalScale = canvas.height/969;

var Map = [

   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
   [1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
   [1,1,1,1,1,0,9,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
   [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1],
   [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,1],
   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
   [1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,1],
   [1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,1,1,1],
   [1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1],
   [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
   [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,0,1],
   [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
   [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,1],
   [1,1,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,1,1,0,1],
   [2,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,1],
   [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
   [1,0,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1],
   [1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
   [1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
   [1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
   [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
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
    ctx.fillStyle = "#2B2B2B";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    sense();

    for (var i = 0; i < fovData.length; i++){
        var height = canvas.height/fovData[i].dist;
        ctx.fillStyle = fovData[i].color;
        if (canvas.height-height < 0){
            height = canvas.height;
        }
        ctx.fillRect(i*scale, (canvas.height-height)/2, scale+0.8, height);
    }

    MiniMap();
    Menu();
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

        dist = Math.sqrt((Math.pow((x-tX),2)+Math.pow((y-tY),2)));

        //console.log(tX + " " + tY + " " + getQuadrant(tX,tY));
        if (getQuadrant(tX,tY) == 1) {
            fovData.push(new fovSeg(dist, darken(standardColor.r,standardColor.g,standardColor.b,
                canvas.height-dist)));
        }
		if (getQuadrant(tX,tY) == 2) {
            fovData.push(new fovSeg(dist, darken(red.r,red.g,red.b,
                canvas.height-dist)));
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
    };
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
    var factor = (amount-(950*globalScale))*(5/80);
    r *= factor;
    g *= factor;
    b *= factor;

    if (r<0){
        r = 0;
    }
    if (g<0){
        g = 0;
    }
    if (b<0){
        b = 0;
    }
    if (r > 255) {
        r = 255;
    }
    if (g > 255) {
        g = 255;
    }
    if (g > 255) {
        g = 255;
    }
    return "rgb(" + r + "," + g + "," + b + ")";
}

function MiniMap() {
	var mapScale = 30 * globalScale;
	var bScale = 20 * globalScale;
    var mapWidth = mapScale * Map[0].length;
    var mapHeight = mapScale * Map.length;
    ctx.fillStyle = "#000";
    ctx.fillRect(10, 10, mapWidth + 20, mapHeight + 20);
    for (var i = 0; i < Map.length; i++) {
        for (var j = 0; j < Map[0].length; j++) {
            if (Map[i][j] == 1){
				ctx.fillStyle = standardColor.getColor();
			} else if (Map[i][j] == 2){
				ctx.fillStyle = red.getColor();
			}
            if (Map[i][j] != 0 && Map[i][j] != 9) {
                ctx.fillRect(20 + (mapScale * j), 20 + (mapScale * i), mapScale, mapScale);
            }
        }
    }

    ctx.fillStyle = "#fff";
    ctx.fillRect(20 + (x * mapScale)-5, 20 + (y * mapScale)-5, 10, 10);
}

function Menu(){

}

var keyState = {};
setInterval(keyLoop, 40);
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
    if (keyState[38] || keyState[87]) {
        // up arrow

        x += Math.cos((natRot((rot)))*(Math.PI/180))*speed;
        if (getQuadrant(x,y) != 0 && getQuadrant(x,y) != 9) {
            x -= Math.cos((natRot((rot)))*(Math.PI/180))*speed;
        }
        y += Math.sin((natRot((rot)))*(Math.PI/180))*speed;
        if (getQuadrant(x,y) != 0 && getQuadrant(x,y) != 9) {
            y -= Math.sin((natRot((rot)))*(Math.PI/180))*speed;
        }
    }
    if (keyState[39]) {
        // right arrow
        rot += turnSpeed;
        rot %= 360;
    }
    if (keyState[40] || keyState[83]) {
        // down arrow
        x -= Math.cos((natRot((rot)))*(Math.PI/180))*speed;
        if (getQuadrant(x,y) != 0 && getQuadrant(x,y) != 9) {
            x += Math.cos((natRot((rot)))*(Math.PI/180))*speed;
        }
        y -= Math.sin((natRot((rot)))*(Math.PI/180))*speed;
        if (getQuadrant(x,y) != 0 && getQuadrant(x,y) != 9) {
            y += Math.sin((natRot((rot)))*(Math.PI/180))*speed;
        }
    }
    if (keyState[68]) {
        x += Math.cos((natRot((rot+90)))*(Math.PI/180))*speed;
        if (getQuadrant(x,y) != 0 && getQuadrant(x,y) != 9) {
            x -= Math.cos((natRot((rot+90)))*(Math.PI/180))*speed;
        }
        y += Math.sin((natRot((rot+90)))*(Math.PI/180))*speed;
        if (getQuadrant(x,y) != 0 && getQuadrant(x,y) != 9) {
            y -= Math.sin((natRot((rot+90)))*(Math.PI/180))*speed;
        }
    }
    if (keyState[65]) {
        x += Math.cos((natRot((rot-90)))*(Math.PI/180))*speed;
        if (getQuadrant(x,y) != 0 && getQuadrant(x,y) != 9) {
            x -= Math.cos((natRot((rot-90)))*(Math.PI/180))*speed;
        }
        y += Math.sin((natRot((rot-90)))*(Math.PI/180))*speed;
        if (getQuadrant(x,y) != 0 && getQuadrant(x,y) != 9) {
            y -= Math.sin((natRot((rot-90)))*(Math.PI/180))*speed;
        }
    }
    if (keyState[187]){
        // =/+
        if (quality < 1){
            quality *= 2;
        } else {
            quality += 1;
        }
        scale = canvas.width / (fov * quality);
    }
    if (keyState[189]) {
        // -/_
        if (quality > 1){
            quality -= 1;
        } else {
            quality /= 2;
        }
        scale = canvas.width/(fov*quality);
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