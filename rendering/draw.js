function drawMesh(camera, shape, color){
    ctx.strokeStyle = color;

    for (var i = 0; i < shape.surfaces.length; i++){
        var p1 = get2dCoords(camera, shape.getVertecies()[shape.surfaces[i][0]]);
        var p2 = get2dCoords(camera, shape.getVertecies()[shape.surfaces[i][1]]);

        if (p1 != null && p2 != null) {
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
    }
}

function renderScene(camera, shapes) {
    var renderedSurfaces = [];

    for (var g = 0; g < shapes.length; g++)
    {
        for (var i = 0; i < shapes[g].surfaces.length; i++) {
            var ps = [];
            var verts = [];
            var avg = shapes[g].surfaces[i].avg;
            var color = shapes[g].surfaces[i].color;

            for (var j = 0; j < shapes[g].surfaces[i].points.length; j++) {
                ps.push(get2dCoords(camera, shapes[g].getVertecies()[shapes[g].surfaces[i].points[j]]));
                verts.push(shapes[g].getVertecies()[shapes[g].surfaces[i].points[j]]);
            }

            var temp = new Vertex(0,0,0,0);
            for (var j = 0; j < verts.length; j++){
                temp.x += verts[j].x;
                temp.y += verts[j].y;
                temp.z += verts[j].z;
            }
            temp.x /= verts.length;
            temp.y /= verts.length;
            temp.z /= verts.length;
            var avg = getDist(temp.x,temp.y,temp.z,camera.x,camera.y,camera.z);

            for (var j = 0; j < renderedSurfaces.length; j++) {
                if (avg > renderedSurfaces[j][0].avg) {
                    renderedSurfaces.splice(j, 0, [new PointList(ps,avg), color]);
                    break;
                }
                if (j == renderedSurfaces.length - 1) {
                    renderedSurfaces.push([new PointList(ps,avg), color]);
                    break;
                }
            }
            if (renderedSurfaces.length <= 0) {
                renderedSurfaces.push([new PointList(ps,avg), color]);
            }
        }
    }

    for (var i = 0; i < renderedSurfaces.length; i++){
        var ps = renderedSurfaces[i][0].points;

        if (!ps.includes(null)) {
            ctx.strokeStyle = "#000";
            //ctx.strokeStyle = renderedSurfaces[i][1].getColor();
            ctx.fillStyle = renderedSurfaces[i][1].getColor();
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ps[0].x, ps[0].y);
            for (var j = 1; j < ps.length; j++){
                ctx.lineTo(ps[j].x, ps[j].y);
            }
            ctx.lineTo(ps[0].x,ps[0].y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
    }
}

function setPixel(x,y,color){
    var id = ctx.createImageData(1,1); // only do this once per page
    var d  = id.data;                        // only do this once per page
    d[0]   = color.r;
    d[1]   = color.g;
    d[2]   = color.b;
    d[3]   = color.a;
    ctx.putImageData( id, x, y );
}