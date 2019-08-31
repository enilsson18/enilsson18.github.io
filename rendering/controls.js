//setup vars for key reading

var mouseControl = false;
var mouseSpeedScale = 16;
var cam;
var cv = document.getElementById('game');

document.addEventListener('mousemove', mouseMovement);
cv.addEventListener('mousedown', mouseClicks);

function mouseMovement(event){
    if (document.pointerLockElement === cv && mouseControl){
        cam.rotate("y",event.movementX/(mouseSpeedScale));
        cam.rotate("x",-event.movementY/(mouseSpeedScale));
    }
}

function mouseClicks(event){
    if (document.pointerLockElement != cv && mouseControl){
        if (event.button == 0){
            cv.requestPointerLock();
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

//default controls for the camera
function defaultKeyLoop(camera) {
    var speed = 0.1;
    var turnSpeed = 0.5;
    cam = camera;

    if (keyState[38]){
        //up arrow
        if (camera.rx + turnSpeed >= 270 || camera.rx + turnSpeed <= 90){
            camera.rotate("x",turnSpeed)
        } else {
            camera.rx = 90;
        }
    }
    if (keyState[40]){
        //down arrow
        if (camera.rx -turnSpeed >= 270 || camera.rx - turnSpeed <= 90){
            camera.rotate("x",-turnSpeed);
        } else {
            camera.rx = 270;
        }
    }
    if (keyState[39]) {
        // right arrow
        camera.rotate("y",turnSpeed)
    }
    if (keyState[37]) {
        // left arrow
        camera.rotate("y",-turnSpeed)
    }

    if (keyState[87]) {
        //w
        camera.move("forward", speed);
    }
    if (keyState[83]) {
        // s
        camera.move("backward", speed);
    }
    if (keyState[68]) {
        //d
        camera.move("right", speed);
    }
    if (keyState[65]) {
        //a
        camera.move("left", speed);
    }
    if (keyState[32]){
        //space
        camera.move("up", speed);
    }
    if (keyState[16]){
        //shift
        camera.move("down", speed);
    }
    camera.rx = natRot(camera.rx);
    camera.ry = natRot(camera.ry);
    camera.rz = natRot(camera.rz);
}