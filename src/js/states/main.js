var rainbow = require('rainbow');
var cat = require('cat');
var col = require('col');

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

  one = this.add.existing(new cat(this.game));
  one.angle = 0;
  one.name = 'f';

  // ori = this.add.existing(new cat(this.game));
  // ori.name = 'n';
  // ori.tint = Math.random() * 0xffffff;

  two = this.add.existing(new cat(this.game));
  two.angle = 45; //Phaser.Math.degToRad(45);
  two.name = 'n';


  // this.add.existing(new rainbow(this.game));


  col.calculate_rotated_square(two);

  var graphics = this.game.add.graphics();
  graphics.lineStyle(2, 0xffd900, 1);
  graphics.moveTo(two.poly.calcPoints[0].x+two.x, two.poly.calcPoints[0].y+two.y);
  graphics.lineTo(two.poly.calcPoints[1].x+two.x, two.poly.calcPoints[1].y+two.y);
  graphics.lineTo(two.poly.calcPoints[2].x+two.x, two.poly.calcPoints[2].y+two.y);
  graphics.lineTo(two.poly.calcPoints[3].x+two.x, two.poly.calcPoints[3].y+two.y);
  graphics.lineTo(two.poly.calcPoints[0].x+two.x, two.poly.calcPoints[0].y+two.y);
  graphics.endFill();

};

main.update = function (){

  col.isionCheck(two, one);

};

module.exports = main;
