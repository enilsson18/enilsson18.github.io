

function clone(object){
    return _u.cloneDeep(object);
}

function Vec(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}

function Color(r,g,b, a = 1){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.getColor = function(){
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    };
}

function Point(x,y, dist){
    this.x = x;
    this.y = y;
    this.dist = dist;
}

function PointList(points, avg){
    this.points = points;
    this.avg = avg;
}

function Vertex(nx, ny, nz, id){
    this.x = nx;
    this.y = ny;
    this.z = nz;
    this.id = id;
}

function Surface(points, color){
    this.points = points;
    this.color = color;
    this.avg = 0;
    for (var i = 0; i < this.points.length; i++){
        this.avg += this.points[i];
    }
    this.avg /= this.points.length;
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