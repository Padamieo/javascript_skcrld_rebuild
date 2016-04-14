var rainbow = require('rainbow');
var cat = require('cat');
var player = require('player');
var col = require('col');
var enemy = require('enemy');


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

  // this.game.enemies = this.game.add.group();
  this.game.enemies = new Phaser.Group(this.game);

  //this.game.enemies.create(200, 240, 'cat');

// tick = game.time.create(false);
// tick.loop(2000, updateTick, this, 'level');
// tick.start();

  this.game.max_enemy = 10;

};

main.update = function (){

  if(this.game.enemies.countLiving() < this.game.max_enemy){
    nme = this.game.enemies.getFirstDead();
    if (nme === null) {
      nme = new enemy(this.game);
    }
    nme.revive();
    nme.x = this.game.rnd.integerInRange(0, this.game.width);
    nme.y = this.game.height;
  }


  //col.isionCheck(cat, one);

  //need to perform some lives calculations
  if(this.game.kitty.dead === true ){
    this.game.state.start('menu');
  }

};

module.exports = main;
