
var indicator = function(game) {

  //var phaserJSON = this.game.cache.getJSON('language');

  Phaser.Graphics.call(this, game, 0, 0);

  var style = { font: 'bold 20pt Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: this.game.width };
  this._text = this.game.add.text(this.x, this.y, 'TAP HERE', style);
  this._text.anchor.setTo(1, 0.5);

	this.game.add.existing(this);

};

indicator.prototype = Object.create(Phaser.Graphics.prototype);
indicator.prototype.constructor = indicator;

indicator.prototype.update = function(game) {
  if(this.game.tutorial === 1){
    game = this.game;
    this.clear();

    for (var i = 0, l = game.enemies.children.length; i < l; i++){
      if(game.enemies.children[i].alive){
        this.x = this.game.enemies.children[i].x;
        this.y = this.game.enemies.children[i].y;
        this.lineStyle(2, 0xFFFFFF, 0.5);
        this.drawCircle(0, 0, 100);
        var offset = 50;
        if(this.x < game.width/2){
          this._text.anchor.setTo(0, 0.5);
          offset = 50;
        }else{
          this._text.anchor.setTo(1, 0.5);
          offset = -50;
        }
        this._text.x = this.x+offset;
        this._text.y = this.y;
      }
    }
  }

};


module.exports = indicator;
