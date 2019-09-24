var stone = new Color(130,130,130);
var dirt = new Color(97,37,0);
var grass = new Color(0,196,3);
var leaves = new Color(12, 107, 0);
var grassTexture = new Texture("assets/Grass_Block.png");

var blocks = [];

function generateMap() {
    var scale = 0.5;

    Cube.scale(scale,scale,scale);

    var length = 0;
    for (var i = 0; i < 1; i++) {
        for (var j = -5; j <= 5; j++) {
            for (var g = -5; g <= 15; g++) {
                blocks.push(new Block("grass",j, i,g));

                //blocks[length].x = (j - 5) * scale * 2;
                //blocks[length].y = (i) * scale * 2;
                //blocks[length].z = (g - 5) * scale * 2;

                //length += 1;
            }
        }
    }
}

//specify base of the trunk
function generateTree(x,y,z){
    //trunk
    for (var i = 1; i <= 5; i++){
        blocks.push(new Block("log",x,y-i,z));
    }

    //leaves layer 1/2
    for (var i = 3; i < 5; i++){
        for (var g = -2; g <= 2; g++){
            for (var j = -2; j <= 2; j++){
                if (!(g == 0 && j == 0)) {
                    blocks.push(new Block("leaves", x + g, y - i, z + j));
                }
            }
        }
    }
    //leaves layer 3
    for (var g = -1; g <= 1; g++){
        for (var j = -1; j <= 1; j++){
            if (!(g == 0 && j == 0)) {
                blocks.push(new Block("leaves", x + g, y - 5, z + j));
            }
        }
    }
    //leaves layer 4
    var h = 6;
    blocks.push(new Block("leaves", x - 1, y - h, z + 0));
    blocks.push(new Block("leaves", x + 1, y - h, z + 0));
    blocks.push(new Block("leaves", x + 0, y - h, z + 0));
    blocks.push(new Block("leaves", x + 0, y - h, z - 1));
    blocks.push(new Block("leaves", x + 0, y - h, z + 1));
}

function getBlockModels(){
    var list = [];

    for (var i = 0; i < blocks.length; i++){
        list.push(blocks[i].model);
    }

    return list;
}

function Texture(address, view){
    this.img = new Image();
    this.img.src = address;
    this.view = view;

    this.draw = function(x1,y1,x2,y2){
        if (this.view == "top"){
            ctx.drawImage(this.img,16,16,16,16,x1,y1,x2-x1,y2-y1);
        } else if (this.view == "bottom"){
            ctx.drawImage(this.img,0,0,16,16,x1,y1,x2-x1,y2-y1);
        } else if (this.view == "side"){
            ctx.drawImage(this.img,0,16,16,16,x1,y1,x2-x1,y2-y1);
        }
    }
}

function Block(type,x,y,z){
    this.type = type;
    this.model = clone(Cube);
    this.model.x = x;
    this.model.y = y;
    this.model.z = z;
    this.collidable = true;

    if (type == "grass"){
        this.model.paint(grass);
        //this.model.surfaces[0].color = new Color(0,0,0,0,);
    }
    else if (type == "log"){
        this.model.paint(dirt);
    }
    else if (type == "leaves"){
        this.model.paint(leaves);
    }
}