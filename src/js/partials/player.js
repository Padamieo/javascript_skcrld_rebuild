var g = require('general');

var player = function(game) {

  Phaser.Graphics.call(this, game, 0, 0);

  this.starttime = 0;
  this.endtime = 0;
  this.max = 200;
  this.lazers = false;
  this.circlesize = 100;
  this.duration = 1000;
  this.nextShotAt = 0;
  this.shotDelay = 50;
  this.tap = 1;
  this.colour = 0xFFFFFF;
	this.game.add.existing(this);
};

player.prototype = Object.create(Phaser.Graphics.prototype);
player.prototype.constructor = player;

player.prototype.update = function(game) {
	game = this.game;
  this.clear();

  if(this.game.kitty.fall === true){
    this.colour = 0xFF0000;
  }else{
    this.colour = 0xFFFFFF;
  }

	if(game.input.activePointer.isDown === true){
    if(this.press === false){
      this.starttime = game.time.now;
      this.endtime = game.time.now + this.duration;
      this.press = true;
      if(game.background_action === true){
        this.tap = 1;
      }else{
        this.tap = 0;
      }
    }

    this.x = game.input.x;
    this.y = game.input.y;
    this.lineStyle(2, this.colour, 0.5);
    this.drawCircle(0, 0, 200);

    if(this.press === true){
      var change_in_time = game.time.now - this.starttime;
      if(this.circlesize <= this.max){
        this.circlesize = change_in_time * (this.max / this.duration);
      }
      this.lineStyle(0, this.colour, 0);
      this.beginFill(this.colour, 0.5);
      this.drawCircle(0, 0, this.circlesize);
    }

    if(this.endtime < game.time.now){
      this.lazers = true;
      this.tap = 0;
    }

	}else{
    if(this.game.kitty.fall === false){
      if(this.tap === 1){
        if(this.endtime > game.time.now){
          this.tap = 0;
          if (this.nextShotAt > game.time.now) {
            return;
          }
          this.nextShotAt = game.time.now + this.shotDelay;

          if (game.bulletPool.countDead() === 0) {
            return;
          }

          //vibration and sound
          g.sound_vibration('meow', 50);

          //get a bullet
          var bullet = game.bulletPool.getFirstExists(false);

          //moves it to the current kitty location
          bullet.reset(this.game.kitty.x, this.game.kitty.y, 'bullet');

          var angle = game.math.angleBetween( bullet.x, bullet.y, this.x, this.y );
          bullet.rotation = angle;

          bullet.body.velocity.x = Math.cos(bullet.rotation) * 1000;
          bullet.body.velocity.y = Math.sin(bullet.rotation) * 1000;

        }
      }
    }

    this.lazers = false;
    this.press = false;
    this.circlesize = 0;
	}

};

module.exports = player;
