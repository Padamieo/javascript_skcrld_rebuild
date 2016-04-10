var rainbow = require('rainbow');
var cat = require('cat');

var game = {};

game.create = function () {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = 0;

  // console.log(this.game.world.centerX);

  var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5, 0.5);

  // game.player = game.add.group();
  // var p = game.player.getFirstDead();
  //
  // if (p === null) {
  //   p = new rainbow(this.game);
  //   //
  // }
  game.add.existing(new cat(this.game));

  game.add.existing(new rainbow(this.game));
};

game.update = function (){

};

module.exports = game;
