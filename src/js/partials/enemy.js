var g = require('general');

var enemy = function(game) {
  //var h = (game.height/2);
  var w = (game.width/2);

  randomx = game.rnd.integerInRange(10, game.width);

  Phaser.Sprite.call(this, game, randomx, game.world.centerY-50, 'cat');

  this.events.onKilled.add(function(){ g.explosion(game, this)}, this);

  this.anchor.setTo(0.5, 0.5);

  this.scale.y = 1;
  this.scale.x = 1;

  this.x_velocity = 0;
  this.alive = true;

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

  if(this.alive == true){
    dt = game.time.elapsed;
    this.y = this.y -( speed * dt )
  }

  if(this.y < 0+(game.height/10)){
    this.alive = false;
  }

};

module.exports = enemy;
