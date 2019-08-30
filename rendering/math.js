function get2dCoords(camera, vertex){
    /*
    //console.log(camera.x + " " + camera.y + " " + camera.z);
    var xRot = (180/Math.PI) * Math.atan2(vertex.y - camera.y, vertex.z - camera.z);
    var yRot = (180/Math.PI) * Math.atan2(vertex.z - camera.z, vertex.x - camera.x);
    //var zRot = (Math.PI/180) * Math.atan2(vertex.y - camera.y, vertex.x - camera.x);

    xRot -= camera.rx-camera.vfov/2;
    yRot -= camera.ry-camera.fov/2;
    //zRot += camera.rz-camera.fov/2;

    var x = (yRot/camera.fov) * canvas.width;
    var y = (xRot/camera.vfov) * canvas.height;
    console.log(x/canvas.width + " " + camera.ry);
    //console.log(y/canvas.height + " " + camera.rx);
    */

    var a = new Vec(vertex.x-camera.x, vertex.y-camera.y, vertex.z-camera.z);
    var o = new Vec((camera.rx)*(Math.PI/180), (camera.ry)*(Math.PI/180), (camera.rz)*(Math.PI/180));
    var d = new Vec(0,0,0);
    var e = new Vec(0.5,0.375,1);

    d.x = Math.cos(o.y)*(Math.sin(o.z)*a.y + Math.cos(o.z)*a.x) - Math.sin(o.y)*a.z;
    d.y = Math.sin(o.x)*(Math.cos(o.y)*a.z + Math.sin(o.y)*(Math.sin(o.z)*a.y + Math.cos(o.z)*a.x)) + Math.cos(o.x)*(Math.cos(o.z)*a.y-Math.sin(o.z)*a.x);
    d.z = Math.cos(o.x)*(Math.cos(o.y)*a.z + Math.sin(o.y)*(Math.sin(o.z)*a.y + Math.cos(o.z)*a.x)) - Math.sin(o.x)*(Math.cos(o.z)*a.y-Math.sin(o.z)*a.x);

    var dist = getDist(vertex.x,vertex.y,vertex.z,camera.x,camera.y,camera.z);
    var x = (e.z/d.z)*d.x+e.x;
    var y = (e.z/d.z)*d.y+e.y;
    x = (d.x*canvas.width)/((dist - e.z)*e.x)*e.z + canvas.width/2;
    y = (d.y*canvas.height)/((dist - e.z)*e.y)*e.z + canvas.height/2;

    //console.log(x + " " + y);

    var nx = camera.x + Math.sin(camera.ry*(Math.PI/180))*dist;
    var ny = camera.y + Math.cos(camera.rx*(Math.PI/180))*dist;
    var nz = camera.z + Math.cos(camera.ry*(Math.PI/180))*dist;


    if (getDist(nx,ny,nz,vertex.x,vertex.y,vertex.z) > dist*2){
        return null;
    }

    return new Point(x,y,dist);
}

function rotate(point, rotation) {
    const sin = new Vec(
        Math.sin(rotation.x),
        Math.sin(rotation.y),
        Math.sin(rotation.z));

    const cos = new Vec(
        Math.cos(rotation.x),
        Math.cos(rotation.y),
        Math.cos(rotation.z));

    var temp1, temp2;

    temp1 = cos.x * point.y + sin.x * point.z;
    temp2 = -sin.x * point.y + cos.x * point.z;
    point.y = temp1;
    point.z = temp2;

    temp1 = cos.y * point.x + sin.y * point.z;
    temp2 = -sin.y * point.x + cos.y * point.z;
    point.x = temp1;
    point.z = temp2;

    temp1 = cos.z * point.x + sin.z * point.y;
    temp2 = -sin.z * point.x + cos.z * point.y;
    point.x = temp1;
    point.y = temp2;

    return point;
}