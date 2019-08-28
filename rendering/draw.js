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

function drawShape(camera, shape, color) {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = color;

    var renderedSurfaces = [];

    for (var i = 0; i < shape.surfaces.length; i++){
        var p1 = get2dCoords(camera, shape.getVertecies()[shape.surfaces[i][0]]);
        var p2 = get2dCoords(camera, shape.getVertecies()[shape.surfaces[i][1]]);
        var p3 = get2dCoords(camera, shape.getVertecies()[shape.surfaces[i][2]]);

        renderedSurfaces.push([p1,p2,p3]);
    }

    for (var i = 0; i < renderedSurfaces.length; i++){
        p1 = renderedSurfaces[i][0];
        p2 = renderedSurfaces[i][1];
        p3 = renderedSurfaces[i][2];

        if (p1 != null && p2 != null && p3 != null) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p1.x, p1.y);
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