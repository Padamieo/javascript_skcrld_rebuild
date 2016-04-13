var rainbow = require('rainbow');
var cat = require('cat');
var player = require('player');
var col = require('col');

var main = {}

//var kitty = null;

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


  // ori = this.add.existing(new cat(this.game));
  // ori.name = 'n';
  // ori.tint = Math.random() * 0xffffff;

  this.game.kitty = this.add.existing(new cat(this.game));
  // col.calculate_rotated_square(cat);
  // this.char = this.add.group();
  // var kitty = this.char.getFirstDead();
  // if (kitty === null) {
  //   kitty = new cat(this.game);
  // }

  rainbow = this.add.existing(new rainbow(this.game));

  p = this.add.existing(new player(this.game));

};

main.update = function (){

  //col.isionCheck(cat, one);

  //need to perform some lives calculations
  if(this.game.kitty.dead === true ){
    this.game.state.start('menu');
  }

};

module.exports = main;
