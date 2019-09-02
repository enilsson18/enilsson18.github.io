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
var player = new Player(0,0,-10);
var scene = [];

var stone = new Color(130,130,130);
var dirt = new Color(97,37,0);
var grass = new Color(0,196,3);

function generateMap() {
    var length = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 10; j++) {
            for (var g = 0; g < 10; g++) {
                scene.push(clone(Cube));
                if (i == 0) {
                    scene[length].paint(grass);
                }
                if (i == 1) {
                    scene[length].paint(dirt);
                }
                if (i == 2){
                    scene[length].paint(stone);
                }

                scene[length].scale(0.5, 0.5, 0.5);
                scene[length].x = j - 5;
                scene[length].y = i + 3;
                scene[length].z = g - 15;

                length += 1;
            }
        }
    }
}

generateMap();

function main(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    player.main(scene);
    renderScene(player.cam, scene)
}