mouseControl = true;

function Player(x=0, y=0, z=0, rx=0, ry=0, rz=0){
    this.x = x;
    this.y = y;
    this.z = z;
    this.vX = 0;
    this.vY = 0;
    this.vZ = 0;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this.camOffsetX = 0;
    this.camOffsetY = -2.5;
    this.camOffsetZ = 0;

    this.cam = new Camera(this.x,this.y,this.z,this.rx,this.ry,this.rz);

    this.speed = 0.15;
    this.turnSpeed = 1;
    this.scene = [];
    this.atkDist = 4;

    this.cam.fov = 0.0001;

    this.main = function(scene){
        this.scene = scene;
        defaultKeyLoop(this);

        this.x += this.vX;
        this.y += this.vY;
        this.z += this.vZ;

        this.cam.x = this.x+this.camOffsetX;
        this.cam.y = this.y+this.camOffsetY;
        this.cam.z = this.z+this.camOffsetZ;
        this.cam.rx = this.rx;
        this.cam.ry = this.ry;
        this.cam.rz = this.rz;

        this.vX *= 0.9;
        this.vY *= 0.9;
        this.vZ *= 0.9;
    };

    this.move = function(type, speed){
        if (type == "right") {
            this.vZ = Math.cos((this.ry+90) * (Math.PI / 180)) * speed;
            this.vX = Math.sin((this.ry+90) * (Math.PI / 180)) * speed;
        }
        if (type == "left") {
            this.vZ = Math.cos((this.ry-90) * (Math.PI / 180)) * speed;
            this.vX = Math.sin((this.ry-90) * (Math.PI / 180)) * speed;
        }
        if (type == "forward") {
            this.vZ = Math.cos((this.ry) * (Math.PI / 180)) * speed;
            this.vX = Math.sin((this.ry) * (Math.PI / 180)) * speed;
        }
        if (type == "backward") {
            this.vZ = -Math.cos((this.ry) * (Math.PI / 180)) * speed;
            this.vX = -Math.sin((this.ry) * (Math.PI / 180)) * speed;
        }
        if (type == "up") {
            //this.jump();
            this.vY = -Math.cos((this.rx) * (Math.PI / 180)) * speed;
        }
        if (type == "down") {
            //this.vY = Math.cos((this.rx) * (Math.PI / 180)) * speed;
        }
    }

    this.rotate = function(axis, amount){
        var old = rx;
        if (axis == "x"){
            this.rx = natRot(this.rx+amount);
        } else if(axis == "y"){
            this.ry = natRot(this.ry+amount);
        } else if(axis == "z"){
            this.rz = natRot(this.rz+amount);
        }
        if (this.rx < 270 && this.rx > 90){
            if (old > 270){
                this.rx = 270;
            } else if (old < 90){
                this.rx = 90;
            }
        }
    }

    this.click = function(type){
        if (type == "left"){

        } else if (type == "right"){

        }
    }

    this.jump = function(){
        //this.vY += .1;
    }
}