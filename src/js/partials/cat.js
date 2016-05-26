//var g = require('general');

var cat = function(game) {

  Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'cat');

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('fall', [1]);
  this.animations.add('fire', [0]);

  this.scale.y = 1;
  this.scale.x = 1;

  this.y_velocity = 0;
  this.dead = false;
  this.fall = false;

  //moment we create a cat for the game remove live, because they will die or leave game
  game.lives = game.lives - 1;
  //console.log(game.lives);
  if(localStorage !== undefined){
    localStorage.setItem('lives', game.lives );
    game.timestamp = (+new Date() / 60000);
    //console.log(game.timestamp);
    localStorage.setItem('timestamp', game.timestamp );
  }


	this.game.add.existing(this);
};

cat.prototype = Object.create(Phaser.Sprite.prototype);
cat.prototype.constructor = cat;

cat.prototype.update = function(game) {
	game = this.game;

  var dt = game.time.elapsed;

  //need to disable some elements untill tutorial ends

  if(this.fall === false){
    if(game.player.lazers === true){
      var h = game.height;
      var offset = this.y-(h/10);
      this.y = this.y - (offset/100);
      this.y_velocity = ( this.y_velocity <= 0 ? 0 : this.y_velocity/0.8 );
      this.animations.play('fire', 1, true);
    }else{

      if(game.background_action === true){
        var gravity = 0.1;
        this.animations.play('fall', 1, true);
      }else{
        var gravity = 0;
        //custom animation here
        this.animations.play('fall', 1, true);
      }

      this.y = this.y - this.y_velocity;
      this.y_velocity = this.y_velocity - gravity / dt;

    }
  }else{
    this.tint = 0xd65151;
    var gravity = 0.1;
    this.y = this.y - this.y_velocity;
    this.y_velocity = this.y_velocity - gravity / dt;
    this.animations.play('fall', 1, true);
  }

  if(this.y > game.height-(game.height/10)){
    this.dead = true;
  }

};

module.exports = cat;
