var g = require('general');

var enemy = function(game) {

  randomx = game.rnd.integerInRange(10, game.width);
  Phaser.Sprite.call(this, game, randomx, game.world.centerY-50, 'enemy');

  this.events.onKilled.add(function(){
    g.explosion(game, this);

      //vibration test
      console.log(this.game.vibration);
      if(this.game.vibration){
        navigator.vibrate([50]);
      }

    this.trail.kill();
  }, this);

  this.events.onRevived.add(function(){
    enemy.revive(game, this)},
  this);

  this.animations.add('rotate', [0, 1, 2, 3, 4]);

  this.anchor.setTo(0.5, 0.5);

  this.scale.y = 1.2;
  this.scale.x = 1.2;

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
      this.v_speed -= 0.001;
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
      this.y = this.y -( v_speed * dt );
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

      //console.log(this.x_velocity);
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

    this.trail.x = this.x;
    this.trail.y = this.y;
    this.trail.rotation = this.rotation/1.2;

  }

  if(this.y < 0+(game.height/50)){
    this.alive = false;
    if(this.trigger_once === 0){
      this.game.enemies_passed = this.game.enemies_passed + -1;
      this.trigger_once = 1;
    }
  }

};

enemy.revive = function(game, enemy){
  enemy.enemy_type = (game.tutorial != 0 ? g.choose(game) : 0);
  enemy.x = game.rnd.integerInRange(0, game.width);
  enemy.y = game.height;
  enemy.angle = 0;
  enemy.trigger_once = 0;
  enemy.tint = g.enemy_colour(enemy.enemy_type);

  if (game.trail.countDead() === 0) {
    return;
  }
  enemy.trail = game.trail.getFirstExists(false);
  enemy.trail.reset(enemy.x, enemy.y);
};

module.exports = enemy;
