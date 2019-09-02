function Model(v, c, x=0, y=0, z=0, rx=0, ry=0, rz=0){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this.vertecies = v;
    this.surfaces = c;
    this.sizeScale = 1;

    this.paint = function(color){
        for(var i = 0; i < this.surfaces.length; i++){
            var s = Object.assign({}, this.surfaces[i]);
            s.color = color;
            this.surfaces[i] = s;
        }
    }

    this.scale = function(fx, fy, fz){
        for (var i = 0; i < this.vertecies.length; i++){
            this.vertecies[i].x *= fx;
            this.vertecies[i].y *= fy;
            this.vertecies[i].z *= fz;
        }
        this.sizeScale *= (fx + fy + fz)/3;
    }

    this.rotate = function(rot){
        for (var i = 0; i < this.vertecies.length; i++){
            this.vertecies[i] = rotate(this.vertecies[i],rot);
        }
    }

    this.getVertecies = function(){
        var list = [];
        for (var i = 0; i < this.vertecies.length; i++){
            list.push(new Vertex(this.vertecies[i].x + this.x, this.vertecies[i].y + this.y,this.vertecies[i].z + this.z));
        }
        return list;
    }

    this.addVertex = function(vertex){
        this.vertecies.push(new Vertex(vertex.x, vertex.y, vertex.z, vertecies.length));
    }
}

function spin(shape){
    var rot = new Vec(1*(Math.PI/180),2*(Math.PI/180),3*(Math.PI/180));

    for (var i = 0; i < shape.vertecies.length; i++){
        shape.vertecies[i] = rotate(shape.vertecies[i],rot);
    }
}