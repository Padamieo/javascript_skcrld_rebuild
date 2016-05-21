var g = require('general');

var enemy = function(game, enemy_type) {
  //var h = (game.height/2);
  //var w = (game.width/2);

  randomx = game.rnd.integerInRange(10, game.width);

  Phaser.Sprite.call(this, game, randomx, game.world.centerY-50, 'enemy');

  this.events.onKilled.add(function(){
    g.explosion(game, this);
  }, this);

  // this.events.onRevived.add(function(){
  //   revive(game, this, enemy_type = '')},
  // this);

  this.animations.add('rotate', [0, 1, 2, 3, 4]);

  this.anchor.setTo(0.5, 0.5);

  this.scale.y = 1.2;
  this.scale.x = 1.2;

  this.x_velocity = 0;
  this.max_velocity = 0.1;
  this.alive = true;
  this.enemy_type = (enemy_type === '' ? 0 : enemy_type );
  this.v_speed = 0.05;
  this.max_speed = 0.1;

  this.trigger_once = 0;

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

      this.animations.play('rotate', 12, true);
      //this.tint = 0x5056d3;
    }

  }

  if(this.y < 0+(game.height/50)){
    this.alive = false;
    if(this.trigger_once === 0){
      this.game.enemies_passed = this.game.enemies_passed + -1;
      this.trigger_once = 1;
    }


  }

};

// var revive = function(game, enemy, enemy_type){
//   enemy.enemy_type = (enemy_type === '' ? 0 : enemy_type );
// 	enemy.tint = '0xFF9999';
// }

module.exports = enemy;
