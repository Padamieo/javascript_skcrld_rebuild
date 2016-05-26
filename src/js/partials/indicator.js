
var indicator = function(game) {

  Phaser.Graphics.call(this, game, 0, 0);

	this.game.add.existing(this);

};

indicator.prototype = Object.create(Phaser.Graphics.prototype);
indicator.prototype.constructor = indicator;

indicator.prototype.update = function(game) {
  if(this.game.tutorial == true){
    game = this.game;
    this.clear();

    for (var i = 0, l = game.enemies.children.length; i < l; i++){
      if(game.enemies.children[i].alive){

        this.x = this.game.enemies.children[i].x;
        this.y = this.game.enemies.children[i].y;
        this.lineStyle(2, 0xFFFFFF, 0.5);
        this.drawCircle(0, 0, 100);

        // var style = { font: 'bold 30pt Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: this.game.width };
        // this._text = this.game.add.text(this.x, this.y, "TAP HERE", style);
        // this._text.anchor.setTo(1, 1);

      }
    }
  }

};

module.exports = indicator;
