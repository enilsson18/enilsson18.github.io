function Model(v, c){
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.vertecies = v;
    this.surfaces = c;

    this.scale = function(fx, fy, fz){
        for (var i = 0; i < this.vertecies.length; i++){
            this.vertecies[i].x *= fx;
            this.vertecies[i].y *= fy;
            this.vertecies[i].z *= fz;
        }
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