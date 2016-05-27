
var rainbow = function(game) {

  Phaser.Sprite.call(this, game, game.world.centerY, game.world.centerX, 'rainbow');

  //this.blendMode = PIXI.blendModes.ADD;

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

  //this is only temp untill i sort out better rainbow effect
  this.game.rainbow_colour = this.game.time.create(false);
  this.game.rainbow_colour.loop(200, rainbow_colour_change, this.game, this.game);
  this.game.rainbow_colour.start();

	this.game.add.existing(this);
};

rainbow.prototype = Object.create(Phaser.Sprite.prototype);
rainbow.prototype.constructor = rainbow;

rainbow.prototype.update = function(game) {
	game = this.game;

  if(game.kitty.fall === false){
    if(game.player.lazers === true){

      //navigator.vibrate([200, 200, 200, 200, 200]);

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
  }else{
    this.alpha = 0;
    this.animations.stop(null, true);
  }

};

// temporary function for colour change
function rainbow_colour_change(game){
  game.rainbow.tint = Math.random() * 0xffffff;
}

module.exports = rainbow;
