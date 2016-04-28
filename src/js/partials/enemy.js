var g = require('general');

var enemy = function(game, enemy_type = '') {
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

  this.anchor.setTo(0.5, 0.5);

  this.scale.y = 1;
  this.scale.x = 1;

  this.x_velocity = 0;
  this.max_velocity = 1;
  this.alive = true;
  this.enemy_type = (enemy_type === '' ? 0 : enemy_type );

  game.enemies.add(this);
};

enemy.prototype = Object.create(Phaser.Sprite.prototype);
enemy.prototype.constructor = enemy;

enemy.prototype.update = function(game) {
	game = this.game;

  if(p.lazers === true){
    speed = 0.08;
  }else{
    speed = 0.1;
  }

  dt = game.time.elapsed;

  if(this.alive === true){
    if(this.enemy_type === 0){
      dt = game.time.elapsed;
      this.y = this.y -( speed * dt );
    }

    if(this.enemy_type === 1){
      this.y = this.y -( speed * dt );

      this.x = this.x - this.x_velocity * dt;

      if(this.x > this.game.kitty.x){
        this.x_velocity = this.x_velocity + (0.0001 * dt);
      }else{
        this.x_velocity = this.x_velocity - (0.0001 * dt);
      }
      var rad = Math.atan2((this.game.kitty.y - this.y), (this.game.kitty.x - this.x));
      this.angle = game.math.radToDeg(rad);
    }


  }

  if(this.y < 0+(game.height/10)){
    this.alive = false;
  }

};

// var revive = function(game, enemy, enemy_type){
//   enemy.enemy_type = (enemy_type === '' ? 0 : enemy_type );
// 	enemy.tint = '0xFF9999';
// }

module.exports = enemy;
