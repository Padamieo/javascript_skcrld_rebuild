// var pickup = require('pickup');

var rainbow = function(game) {

  //var h = (game.height/2);
  var w = (game.width/2);
  Phaser.Sprite.call(this, game, w, game.world.centerX, 'rainbow');

  this.anchor.setTo(0.5, 0);

	var frames = [];
	for (var i = 0; i < 18; i++) {
		frames.push(i);
	}
  this.animations.add('start', frames);

  this.scale.y = 1;
  this.scale.x = 1;

	this.game.add.existing(this);
};

rainbow.prototype = Object.create(Phaser.Sprite.prototype);
rainbow.prototype.constructor = rainbow;

rainbow.prototype.update = function(game) {
	game = this.game;

	if(game.input.activePointer.isDown === true){
    if (game.kitty != null) {
      this.y = game.kitty.y;
      this.x = game.kitty.x;
    }
		this.animations.play('start', 30, true);
	}else{
		this.animations.stop(null, true);
	}

};

module.exports = rainbow;
