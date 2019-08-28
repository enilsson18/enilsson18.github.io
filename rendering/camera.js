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