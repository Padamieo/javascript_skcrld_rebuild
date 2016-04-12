var rainbow = require('rainbow');
var cat = require('cat');

var main = {};

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

  b = this.add.existing(new cat(this.game));
  b.name = 'f';

  c = this.add.existing(new cat(this.game));
  c.name = 'n';
  c.tint = Math.random() * 0xffffff;

  a = this.add.existing(new cat(this.game));
  a.angle = -45; //Phaser.Math.degToRad(45);
  a.name = 'n';

  // this.add.existing(new rainbow(this.game));


  function collisionCheck(one, two) {
    var V = SAT.Vector;
    var P = SAT.Polygon;
    // points are negative because objects are bottom right aligned
    //var carPoly = new P(new V(car.x, car.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);
    //var obstaclePoly = new P(new V(obstacle.x, obstacle.y), [new V(-200, -184), new V(-6, -76), new V(-90, -25), new V(-285, -132)]);
    var response = new SAT.Response();
    var collided = SAT.testPolygonPolygon(one.poly, two.poly, response);
    console.log(one.key, two.key, collided);
    //if (collided){		car.tint = 0xFF0000; }
  }

  function rotate(cx, cy, x, y, angle) {
      var radians = (Math.PI / 180) * angle,
          cos = Math.cos(radians),
          sin = Math.sin(radians),
          nx = (cos * (x - cx)) - (sin * (y - cy)) + cx,
          ny = (cos * (y - cy)) + (sin * (x - cx)) + cy;
      return [nx, ny];
  }

  // console.log(a.bottom + 'v' + a.y);
  // console.log(a.left + 'v' + a.x);
  vv = rotate(a.x, a.y, a.right, a.top, a.angle);
  console.log(vv);

  var graphics = this.game.add.graphics();

  graphics.lineStyle(10, 0xffd900, 1);
  graphics.moveTo(vv[0],vv[1]);
  graphics.lineTo(vv[0], (vv[1]+1));
  graphics.endFill();
};

main.update = function (){

  //console.log(b);




};

module.exports = main;
