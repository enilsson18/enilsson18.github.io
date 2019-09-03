function Camera(x = 0,y = 0,z = 0,rx = 0,ry = 0,rz = 0){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    //fov 1 = 45 degrees
    this.aspectRatio = 9/16;
    this.fovX = 1;
    this.fovY = this.fovX * this.aspectRatio;
    this.dist = 1;
    this.speed = 0.1;
    this.turnSpeed = 0.5;

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

    this.rotate = function(axis, amount){
        if (axis == "x"){
            this.rx = natRot(this.rx+amount);
        } else if(axis == "y"){
            this.ry = natRot(this.ry+amount);
        } else if(axis == "z"){
            this.rz = natRot(this.rz+amount);
        }
    }
}