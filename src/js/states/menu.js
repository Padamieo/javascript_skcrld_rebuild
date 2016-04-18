var g = require('general');

var menu = {};

menu.create = function () {

  button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', g.click_exit, this, 1, 0, 2);
  button.anchor.setTo(0.5, 0.5);

  lives_update = this.game.time.create(false);
  lives_update.loop(10000, g.update_lives, this.game, this.game);
  lives_update.start();

};

menu.update = function (){
  //console.log("your on menu");
};

module.exports = menu;
