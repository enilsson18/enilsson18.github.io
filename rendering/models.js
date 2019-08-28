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


c.push([0,1,2]);
c.push([0,3,2]);

c.push([4,5,6]);
c.push([4,7,6]);

c.push([1,0,4]);
c.push([1,5,4]);

c.push([3,0,4]);
c.push([3,7,4]);

c.push([3,7,6]);
c.push([3,2,6]);

c.push([2,1,5]);
c.push([2,6,5]);

var Cube = new Model(v,c);

///////////////////////////////////////////////////////////////////////////////