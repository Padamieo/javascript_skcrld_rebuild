var g = require('general');

var menu = {};

menu.create = function () {

  button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', g.click_exit, this, 1, 0, 2);
  button.anchor.setTo(0.5, 0.5);

};

menu.update = function (){
  //console.log("your on menu");
};

module.exports = menu;
