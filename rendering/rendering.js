var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = (window.innerHeight/3)*4;
canvas.height = window.innerHeight;

var fps = 30;
var loop = setInterval(main, 1000/fps);
var cam = new Camera();

function main(){

}

function get2dCoords(camera, vertex){

}

//classes
function Shape(){
    this.vertecies = [];

    this.addVertex = function(vertex){
        this.vertecies.push(vertex);
    }
}

function Vertex(nx, ny, nz){
    this.x = nx;
    this.y = ny;
    this.z = nz;
}

function Camera(){
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rx = 0;
    this.ry = 0;
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
}
