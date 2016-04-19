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

  scale = game.width/250;
  this.scale.y = scale;
  this.scale.x = scale;

  this.offset = this.game.kitty.height/4;

	this.game.add.existing(this);
};

rainbow.prototype = Object.create(Phaser.Sprite.prototype);
rainbow.prototype.constructor = rainbow;

rainbow.prototype.update = function(game) {
	game = this.game;

  if(p.lazers === true){
    if (game.kitty != null) {
      this.y = game.kitty.y+this.offset;
      this.x = game.kitty.x;
    }
    this.alpha = 1;
		this.animations.play('start', 25, true);
	}else{
    this.alpha = 0;
		this.animations.stop(null, true);
	}

};

module.exports = rainbow;
