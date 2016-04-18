//var g = require('general');

var cat = function(game) {
  //var h = (game.height/2);
  var w = (game.width/2);
  Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'cat');

  // game.physics.enable(this, Phaser.Physics.ARCADE);

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('fall', [1]);
  this.animations.add('fire', [0]);


  this.scale.y = 1;
  this.scale.x = 1;

  this.y_velocity = 0;
  this.dead = false

  //moment we create a cat for the game remove live, because they will die or leave game
  game.lives = game.lives - 1;
  console.log(game.lives);

	this.game.add.existing(this);
};

cat.prototype = Object.create(Phaser.Sprite.prototype);
cat.prototype.constructor = cat;

cat.prototype.update = function(game) {
	game = this.game;

	if(game.input.activePointer.isDown === true){
		// this.animations.play('start', 30, true);
	}else{
		// this.animations.stop(null, true);
	}

  dt = game.time.elapsed;

  if(p.lazers === true){

    h = game.height;
    offset = this.y-(h/8);
    this.y = this.y - (offset/100);
    this.y_velocity = ( this.y_velocity <= 0 ? 0 : this.y_velocity/0.8 );
    this.animations.play('fire', 1, true);
  }else{

    gravity = 0.1;
    this.y = this.y - this.y_velocity;
    this.y_velocity = this.y_velocity - gravity / dt;
    this.animations.play('fall', 1, true);

  }

  if(this.y > game.height-(game.height/10)){
    this.dead = true;
  }

};

module.exports = cat;
