var g = require('general');

var enemy = function(game) {

  randomx = game.rnd.integerInRange(10, game.width);
  Phaser.Sprite.call(this, game, randomx, game.world.centerY-50, 'enemy');

  this.events.onKilled.add(function(){
    g.explosion(game, this);
    g.sound_vibration("explosion");
    this.trail.kill();
  }, this);

  this.events.onRevived.add(function(){
    enemy.revive(game, this)},
  this);

  this.animations.add('rotate', [0, 1, 2, 3, 4]);

  this.anchor.setTo(0.5, 0.5);

  this.scale.y = 1.2;
  this.scale.x = 1.2;
  this.angle = 0;
  this.x_velocity = 0;
  this.max_velocity = 0.1;
  this.alive = true;

  this.enemy_type = g.choose(game);
  this.v_speed = 0.05;
  this.max_speed = 0.1;

  this.trigger_once = 0;

  this.tint = g.enemy_colour(this.enemy_type);

  game.enemies.add(this);
};

enemy.prototype = Object.create(Phaser.Sprite.prototype);
enemy.prototype.constructor = enemy;

enemy.prototype.update = function(game) {
	game = this.game;

  if(game.player.lazers === true){
    if(this.v_speed > 0.05){
      this.v_speed -= 0.005;
    }
    v_speed = this.v_speed;
  }else{
    if(this.v_speed < this.max_speed){
      this.v_speed += 0.001;
    }
    v_speed = this.v_speed;
  }

  var dt = game.time.elapsed;

  if(this.alive === true){

    if(this.enemy_type >= 0){
      this.y = this.y -( this.v_speed * dt );
      this.animations.play('rotate', 12, true);
    }

    if(this.enemy_type === 1){
      this.x = this.x - this.x_velocity * dt;

      if(this.x > this.game.kitty.x){
        if(this.x > this.game.width/20 && this.x < this.game.width-(this.game.width/20)){
          h_speed = 0.0001;
        }else{
          h_speed = 0.0009;
        }
        this.x_velocity = this.x_velocity + (h_speed * dt);
      }else{
        if(this.x > this.game.width/20 && this.x < this.game.width-(this.game.width/20)){
          h_speed = 0.0001;
        }else{
          h_speed = 0.0009;
        }
        this.x_velocity = this.x_velocity - (h_speed * dt);
      }
      this.toAngle();
    }

    if(this.enemy_type === 3){
      this.x = this.x - this.x_velocity * dt;
      if(this.y < game.height-(game.height/4)){
        if(this.x < this.game.kitty.x ){
          this.x_velocity = this.x_velocity - (0.0001 * dt);
        }else if(this.x > this.game.kitty.x ){
          this.x_velocity = this.x_velocity + (0.0001 * dt);
        }else{
          this.x_velocity = (0.0 * dt);
        }
        this.trail.tint = '0xBCFCFF';
        this.trail.scale.y = 1.2;
        this.trail.scale.x = 1.2;
        this.toAngle();
      }
    }

    if(this.enemy_type === 2){
      //this.x = this.x - this.x_velocity * dt;

      // if(this.start_x < (this.game.width/2)){
      //   window.console.log(this.x / this.game.width);
      //   this.x = this.x + (0.025 * dt);
      // }else{
      //   this.x = this.x - (0.025 * dt);
      // }

      //if(this.x < this.start_x ){
        //this.x_velocity = this.x_velocity - (0.0001 * dt);
      //}else if(this.x > this.start_x ){
      //  this.x_velocity = this.x_velocity + (0.0001 * dt);
      //}else{
      //  this.x_velocity = (0.0 * dt);
      //}

      //this.toAngle();
      var toPlayerX = this.game.kitty.x - this.x;

       // Normalize
      var toPlayerLength = Math.sqrt(toPlayerX * toPlayerX);
      var toPlayerX = toPlayerX / toPlayerLength;

       // Move towards the player
       this.x += toPlayerX * (0.05 * dt);

    }

    this.trail.x = this.x;
    this.trail.y = this.y+this.height/2;
    this.trail.rotation = this.rotation/1.2;

  }

  if(this.y < 0-(game.height/30)){
    this.alive = false;
    this.trail.kill();
    if(this.trigger_once === 0){
      this.game.enemies_passed = this.game.enemies_passed + -1;
      this.trigger_once = 1;
    }
  }

};

enemy.prototype.toAngle = function(){
  var rad = Math.atan2((this.game.kitty.y - this.y), (this.game.kitty.x - this.x));
  var angle = rad+1.5707963267948966;
  if(angle > 0.35){
    angle = 0.35;
  }
  if(angle < -0.35){
    angle = -0.35
  }
  this.angle = game.math.radToDeg(angle);
}

enemy.revive = function(game, enemy){
  enemy.enemy_type = (game.tutorial != 0 ? 0 : g.choose(game));
  enemy.x = game.rnd.integerInRange(10, game.width-10);
  enemy.start_x = enemy.x;
  enemy.y = game.height;
  enemy.angle = 0;
  enemy.trigger_once = 0;
  enemy.tint = g.enemy_colour(enemy.enemy_type);
  enemy.x_velocity = 0;

  if (game.trail.countDead() === 0) {
    return;
  }
  enemy.trail = game.trail.getFirstExists(false);
  enemy.trail.reset(enemy.x, enemy.y);
  enemy.trail.tint = '0xFFFFFF';
  enemy.trail.scale.y = 1;
  enemy.trail.scale.x = 1;
};

module.exports = enemy;
