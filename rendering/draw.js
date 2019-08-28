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
            var p1 = get2dCoords(camera, shapes[g].getVertecies()[shapes[g].surfaces[i][0]]);
            var p2 = get2dCoords(camera, shapes[g].getVertecies()[shapes[g].surfaces[i][1]]);
            var p3 = get2dCoords(camera, shapes[g].getVertecies()[shapes[g].surfaces[i][2]]);

            var avg = (p1.dist + p2.dist + p3.dist) / 3;
            for (var j = 0; j < renderedSurfaces.length; j++) {
                if (avg > (renderedSurfaces[j][0].dist + renderedSurfaces[j][1].dist + renderedSurfaces[j][2].dist)/3) {
                    renderedSurfaces.splice(j, 0, [p1, p2, p3, shapes[g].color]);
                    break;
                }
                if (j == renderedSurfaces.length - 1) {
                    renderedSurfaces.push([p1, p2, p3, shapes[g].color]);
                    break;
                }
            }
            if (renderedSurfaces.length <= 0) {
                renderedSurfaces.push([p1, p2, p3, shapes[g].color]);
            }
        }
    }

    for (var i = 0; i < renderedSurfaces.length; i++){
        p1 = renderedSurfaces[i][0];
        p2 = renderedSurfaces[i][1];
        p3 = renderedSurfaces[i][2];

        if (p1 != null && p2 != null && p3 != null) {
            ctx.strokeStyle = renderedSurfaces[i][3];
            ctx.fillStyle = renderedSurfaces[i][3];
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