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

  obj.poly = new P(new V(tl[0], tl[1]), [ new V(tl[0], tl[1]), new V(tr[0], tr[1]), new V(br[0], br[1]), new V(bl[0], bl[1]) ]);

  // obj.poly = new P(new V(x, y), [new V(tl[0], tl[1]), new V(tr[0], tr[1]), new V(br[0], br[1]), new V(bl[0], bl[1])]);
}

function collisionCheck(obj_a, obj_b) {

  // points are negative because objects are bottom right aligned
  //var carPoly = new P(new V(car.x, car.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);
  //var obstaclePoly = new P(new V(obstacle.x, obstacle.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);

  calculate_rotated_square(obj_a);
  calculate_rotated_square(obj_b);
  //console.log(two.poly.calcPoints[0].x);

  var response = new SAT.Response();

  var collided = SAT.testPolygonPolygon(obj_a.poly, obj_b.poly, response);

  if (collided){
    console.log(one.key, two.key, collided);
    two.tint = 0xFF0000;
  }
}

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) - (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) + (sin * (x - cx)) + cy;
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

  ori = this.add.existing(new cat(this.game));
  ori.name = 'n';
  ori.tint = Math.random() * 0xffffff;

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

};

main.update = function (){

  //console.log(b);
  collisionCheck(two, one);

};

module.exports = main;
