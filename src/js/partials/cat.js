// var pickup = require('pickup');

var cat = function(game) {
  h = (game.height/2);
  w = (game.width/2);
  Phaser.Sprite.call(this, game, w, game.world.centerX, 'cat');

  // game.physics.enable(this, Phaser.Physics.ARCADE);
	// game.player.add(this);
  
  this.anchor.setTo(0.5, 0.5);

	// var frames = [];
	// for (var i = 0; i < 18; i++) {
	// 	frames.push(i);
	// }
  // this.animations.add('start', frames);

  this.scale.y = 1;
  this.scale.x = 1;

	this.game.add.existing(this);
}

cat.prototype = Object.create(Phaser.Sprite.prototype);
cat.prototype.constructor = cat;

cat.prototype.update = function(game) {
	game = this.game;
  //
	// if(game.input.activePointer.isDown === true){
	// 	this.animations.play('start', 30, true);
	// }else{
	// 	this.animations.stop(null, true);
	// }
};

module.exports = cat;
