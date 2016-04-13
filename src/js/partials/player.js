var player = function(game) {
  // var h = (game.height/2);
  // var w = (game.width/2);

  Phaser.Graphics.call(this, game, 0, 0);
	this.game.add.existing(this);
};

player.prototype = Object.create(Phaser.Graphics.prototype);
player.prototype.constructor = player;

player.prototype.update = function(game) {
	game = this.game;
  this.clear();

	if(game.input.activePointer.isDown === true){

    this.x = game.input.x;;
    this.y = game.input.y;
    this.lineStyle(2, 0x0ffff2, 0.5);
    this.drawCircle(0, 0, 100);

	}else{

	}

};

module.exports = player;
