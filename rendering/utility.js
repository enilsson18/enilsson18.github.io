function Vec(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}

function Color(r,g,b,a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

function Point(x,y, dist){
    this.x = x;
    this.y = y;
    this.dist = dist;
}

function Vertex(nx, ny, nz, id){
    this.x = nx;
    this.y = ny;
    this.z = nz;
    this.id = id;
}

function natRot(r){
    if (r < 0){
        return r + 360;
    }
    return r % 360;
}

function getDist(x1,y1,z1,x2,y2,z2){
    return Math.sqrt((Math.pow((x2-x1),2)+Math.pow((y2-y1),2) + Math.pow((z2-z1),2)));
}