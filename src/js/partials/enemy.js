// var pickup = require('pickup');

var enemy = function(game) {
  //var h = (game.height/2);
  var w = (game.width/2);

  random = Math.random();

  Phaser.Sprite.call(this, game, game.world.centerX-50, game.world.centerY-50, 'cat');

	game.enemies.add(this);

  this.anchor.setTo(0.5, 0.5);

  this.scale.y = 1;
  this.scale.x = 1;

  this.x_velocity = 0;
  this.dead = false

	this.game.add.existing(this);
};

enemy.prototype = Object.create(Phaser.Sprite.prototype);
enemy.prototype.constructor = enemy;

enemy.prototype.update = function(game) {
	game = this.game;

  if(p.lazers === true){
    speed = 15;
  }else{
    speed = 70;
  }

  dt = game.time.elapsed;

  if(self.dead == false){
    self.y = self.y -( speed * dt )
  }

  if(this.y < 0+(game.height/10)){
    this.dead = true;
  }

};

module.exports = enemy;
