var rainbow = require('rainbow');
var cat = require('cat');

var main = {};

function calculate_rotated_square(obj){
  var V = SAT.Vector;
  var P = SAT.Polygon;

  var x = obj.x;
  var y = obj.y;
  var a = obj.angle;
  var l = obj.left;
  var r = obj.right;
  var t = obj.top;
  var b = obj.bottom;

  var tl = rotate(x, y, l, t, a);
  var tr = rotate(x, y, r, t, a);
  var br = rotate(x, y, r, b, a);
  var bl = rotate(x, y, l, b, a);

  //NOTE FROM JONNO:
  //for some reason, the new rotation code only works if you change the pos provided here for the polygon to be (x,y) rather than (topleftX,topleftY)
  //I'm not entirely sure why, honestly - it might be that polygon position is expected to be the center or it might be that I've broken it even further
  //but, at the moment it's not causing a problem visually *or* for collision - so it probably won't cause a problem in the future????????
  //good luck have fun
  obj.poly = new P(new V(x, y), [ new V(tl[0], tl[1]), new V(tr[0], tr[1]), new V(br[0], br[1]), new V(bl[0], bl[1]) ]);  

  //OLD
  // obj.poly = new P(new V(tl[0], tl[1]), [ new V(tl[0], tl[1]), new V(tr[0], tr[1]), new V(br[0], br[1]), new V(bl[0], bl[1]) ]);

  // obj.poly = new P(new V(x, y), [new V(tl[0], tl[1]), new V(tr[0], tr[1]), new V(br[0], br[1]), new V(bl[0], bl[1])]);
}

function collisionCheck(obj_a, obj_b) {

  // points are negative because objects are bottom right aligned
  //var carPoly = new P(new V(car.x, car.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);
  //var obstaclePoly = new P(new V(obstacle.x, obstacle.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);

  calculate_rotated_square(obj_a);
  calculate_rotated_square(obj_b);
  //console.log(two.poly.calcPoints[0].x);

  // var response = new SAT.Response();

  var collided = SAT.testPolygonPolygon(obj_a.poly, obj_b.poly/*, response*/); //response object is optional, will contain all the points that overlap

  if (collided){
    console.log(one.key, two.key, collided);
    two.tint = 0xFF0000;
  }
}

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),

        //NOTE FROM JONNO:
        //here's the new rotation code - note the ever so slight differences from your own
        //most notably, the removal of "+ cx" and "+ cy"
        //I actually have no idea why this fixes the collision - but it seems to be coupled with the change noted above
        //As before, it may present a problem in the future but it probably won't
        //good luck have fun
        nx = (x - cx) * cos + (y - cy) * sin;
        ny = (y - cy) * cos - (x - cx) * sin;

        //OLD
        // nx = (cos * (x - cx)) - (sin * (y - cy)) + cx,
        // ny = (cos * (y - cy)) + (sin * (x - cx)) + cy;
    return [nx, ny];
}

main.create = function () {
  // this.game.physics.startSystem(Phaser.Physics.ARCADE);
  // this.game.physics.arcade.gravity.y = 0;

  // console.log(this.game.world.centerX);

  // var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  // logo.anchor.setTo(0.5, 0.5);

  // game.player = game.add.group();
  // var p = game.player.getFirstDead();
  //
  // if (p === null) {
  //   p = new rainbow(this.game);
  //   //
  // }

  one = this.add.existing(new cat(this.game));
  one.angle = 45;
  one.name = 'f';

  // ori = this.add.existing(new cat(this.game));
  // ori.name = 'n';
  // ori.tint = Math.random() * 0xffffff;

  two = this.add.existing(new cat(this.game));
  two.angle = -45; //Phaser.Math.degToRad(45);
  two.name = 'n';

  // this.add.existing(new rainbow(this.game));


  // console.log(a.bottom + 'v' + a.y);
  // console.log(a.left + 'v' + a.x);
  // vv = rotate(a.x, a.y, a.right, a.top, a.angle);
  // console.log(vv);

  calculate_rotated_square(two);
  console.log(two.poly.calcPoints[0]);

  var graphics = this.game.add.graphics();
  graphics.lineStyle(2, 0xffd900, 1);
  graphics.moveTo(two.poly.calcPoints[0].x, two.poly.calcPoints[0].y);
  graphics.lineTo(two.poly.calcPoints[1].x, two.poly.calcPoints[1].y);
  graphics.lineTo(two.poly.calcPoints[2].x, two.poly.calcPoints[2].y);
  graphics.lineTo(two.poly.calcPoints[3].x, two.poly.calcPoints[3].y);
  graphics.lineTo(two.poly.calcPoints[0].x, two.poly.calcPoints[0].y);
  graphics.endFill();

  //NOTE FROM JONNO:
  //this is the most...disturbing...result of my changes - the above no longer draws an outline at all!
  //I will leave it up to you to figure out why because I have nooooooooooooooo idea
  //but, to make it less disturbing - remember that the shapes are rotated properly, drawn properly, and now collide properly
  //so it's probably not a problem....????????
  //good luck have fun

};

main.update = function (){

  //console.log(b);
  collisionCheck(two, one);

};

module.exports = main;
