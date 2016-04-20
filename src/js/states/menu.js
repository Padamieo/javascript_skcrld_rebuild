var g = require('general');

var menu = {};

function start_new_game(){
  this.game.state.start('main');
}

function go_options(){
  this.game.state.start('menu');
}

menu.create = function () {

  eight = (this.game.height/8);

  start = this.game.add.button(this.game.world.centerX, eight*2, 'button', start_new_game, this, 1, 0, 2);
  start.scale.x = 5;
  start.anchor.setTo(0.5, 0.5);

  options = this.game.add.button(this.game.world.centerX, eight*3, 'button', go_options, this, 1, 0, 2);
  options.scale.x = 5;
  options.anchor.setTo(0.5, 0.5);

  exit = this.game.add.button(this.game.world.centerX, eight*4, 'button', g.click_exit, this, 1, 0, 2);
  exit.scale.x = 5;
  exit.anchor.setTo(0.5, 0.5);

  //call update live directly then set timer to check
  g.check_store(this.game);
  //g.update_lives(this.game);
  lives_update = this.game.time.create(false);
  lives_update.loop(10000, g.update_lives, this.game, this.game);
  lives_update.start();

  text_lives = this.game.add.text(this.game.world.centerX, eight*5, "Lives "+this.game.lives, {
    font: "50px Arial",
    fill: "#ff0044",
    align: "center"
  });
  text_lives.anchor.setTo(0.5, 0.5);

  text_score = this.game.add.text(this.game.world.centerX, eight*6, "Score 0", {
    font: "50px Arial",
    fill: "#ff0044",
    align: "center"
  });
  text_score.anchor.setTo(0.5, 0.5);

};

function updateText() {
  text_lives.setText("Lives" + this.game.lives);
}

menu.update = function (){
  //console.log("your on menu");
};

module.exports = menu;
