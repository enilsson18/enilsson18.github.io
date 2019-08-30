var defColor = "#00F";
//cube
var v = [];
v.push(new Vertex(-1, -1, -1, 0));
v.push(new Vertex(-1, 1, -1, 1));
v.push(new Vertex(1, 1, -1, 2));
v.push(new Vertex(1, -1, -1, 3));
v.push(new Vertex(-1, -1, 1, 4));
v.push(new Vertex(-1, 1, 1, 5));
v.push(new Vertex(1, 1, 1, 6));
v.push(new Vertex(1, -1, 1, 7));

var c = [];
/*
c.push([0,1]);
c.push([1,2]);
c.push([2,3]);
c.push([3,0]);
c.push([4,5]);
c.push([5,6]);
c.push([6,7]);
c.push([7,4]);
c.push([0,4]);
c.push([1,5]);
c.push([2,6]);
c.push([3,7]);
*/


c.push(new Surface([0,1,2,3]));

c.push(new Surface([4,5,6,7]));

c.push(new Surface([0,1,5,4]));

c.push(new Surface([3,0,4,7]));

c.push(new Surface([3,7,6,2]));

c.push(new Surface([2,1,5,6]));

var Cube = new Model(v,c,defColor);
v = [];
c = [];
///////////////////////////////////////////////////////////////////////////////
//square
v.push(new Vertex(0,-1,-1,0));
v.push(new Vertex(0,1,-1,1));
v.push(new Vertex(0,1,1,2));
v.push(new Vertex(0,-1,1,3));

c.push(new Surface([0,1,2,3]));

var Square = new Model(v,c,defColor);
v = [];
c = [];
///////////////////////////////////////////////////////////////////////////////
//pyramid
v.push(new Vertex(-1,1,-1,0));
v.push(new Vertex(-1,1,1,1));
v.push(new Vertex(1,1,1,2));
v.push(new Vertex(1,1,-1,3));
v.push(new Vertex(0,-1,0,4));

c.push(new Surface([0,1,2,3]));

c.push(new Surface([0,4,1]));
c.push(new Surface([1,4,2]));

c.push(new Surface([2,4,3]));
c.push(new Surface([3,4,0]));

var Pyramid = new Model(v,c,defColor);
v = [];
c = [];
