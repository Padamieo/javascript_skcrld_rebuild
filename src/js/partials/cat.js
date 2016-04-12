// var pickup = require('pickup');

var cat = function(game) {
  //var h = (game.height/2);
  var w = (game.width/2);
  Phaser.Sprite.call(this, game, w, game.world.centerX, 'cat');

  // game.physics.enable(this, Phaser.Physics.ARCADE);
	// game.player.add(this);

  this.anchor.setTo(0.5, 0.5);

	// var frames = [];
	// for (var i = 0; i < 18; i++) {
	// 	frames.push(i);
	// }
  // this.animations.add('start', frames);

  this.scale.y = 2;
  this.scale.x = 2;

	this.game.add.existing(this);
};

cat.prototype = Object.create(Phaser.Sprite.prototype);
cat.prototype.constructor = cat;

cat.prototype.update = function(game) {
	game = this.game;

	// if(game.input.activePointer.isDown === true){
	// 	this.animations.play('start', 30, true);
	// }else{
	// 	this.animations.stop(null, true);
	// }

  if(this.name == 'f'){
    this.x = game.input.x;
    this.y = game.input.y;
  }


};

module.exports = cat;
