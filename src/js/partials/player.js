var player = function(game) {
  // var h = (game.height/2);
  // var w = (game.width/2);

  Phaser.Graphics.call(this, game, 0, 0);

  this.starttime = 0;
  this.endtime = 0;
  this.max = 100;
  this.lazers = false;
  this.ssize = 0;

	this.game.add.existing(this);
};

player.prototype = Object.create(Phaser.Graphics.prototype);
player.prototype.constructor = player;

player.prototype.update = function(game) {
	game = this.game;
  this.clear();

	if(game.input.activePointer.isDown === true){
    if(this.press == false){
      this.starttime = game.time.now;
      this.endtime = game.time.now + 1000;
      console.log(this.starttime+' - '+this.endtime);
      this.press = true;
      change_in_time = 0;
    }

    this.x = game.input.x;;
    this.y = game.input.y;
    this.lineStyle(2, 0xffffff, 0.5);
    this.drawCircle(0, 0, 100);

    if(this.press == true){
      change_in_time = game.time.now + this.starttime;
      //console.log(change_in_time);
      if(this.ssize <= this.max){
        this.ssize =  this.max*1000 / change_in_time; // (this.max / 10);
      }
      this.lineStyle(0, 0xffffff, 0);
      this.beginFill(0xffffff, 0.5);
      this.drawCircle(0, 0, this.ssize);
    }

    if(this.endtime < game.time.now){
      this.lazers = true;
    }

	}else{
    if(this.endtime > game.time.now){

      if (game.nextShotAt > game.time.now) {
        return;
      }
      game.nextShotAt = game.time.now + game.shotDelay;

      if (game.bulletPool.countDead() === 0) {
        return;
      }

      console.log("fire");
      //get a bullet
      bullet = game.bulletPool.getFirstExists(false);

      //moves it to the current kitty location
      bullet.reset(this.game.kitty.x, this.game.kitty.y, 'bullet');

      // var angle = game.math.angleBetween( bullet.x, bullet.y, this.x, this.y );
      // bullet.rotation = angle;
      // bullet.velocity.x = Math.cos(bullet.rotation) * 1000;
      // bullet.velocity.y = Math.sin(bullet.rotation) * 1000;

    }
    this.lazers = false;
    this.press = false;
    this.ssize = 0;
	}

};

module.exports = player;
