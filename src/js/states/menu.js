var g = require('general');

var menu = {};

function start_new_game(){
  this.game.state.start('main');
}

function go_options(){
  this.game.state.start('opti');
  //window.analytics.trackEvent('menu', 'options', 'Hits', 1);
}

function button_size(text, v_pos){

}

menu.create = function () {

  // window.analytics.startTrackerWithId('UA-10168261-8');
  // window.analytics.trackView('menu');

  var phaserJSON = this.game.cache.getJSON('language');

  var eight = (this.game.height/8);

  var start = this.game.add.button(this.game.world.centerX, eight*2, 'button', start_new_game, this, 1, 0, 2);
  s = phaserJSON.start.length/2.5;
  //max size will be 7.5 if it is reduce size of font
  start.scale.x = s;
  start.anchor.setTo(0.5, 0.5);

  var text_start = this.game.add.text(this.game.world.centerX, eight*2, phaserJSON.start, {
    font: '30px Arial',
    fill: '#ffffff',
    align: 'center'
  });
  text_start.anchor.setTo(0.5, 0.5);


  var options = this.game.add.button(this.game.world.centerX, eight*3, 'button', go_options, this, 1, 0, 2);
  s1 = phaserJSON.options.length/2;
  options.scale.x = s1;
  options.anchor.setTo(0.5, 0.5);

  var text_opt = this.game.add.text(this.game.world.centerX, eight*3, phaserJSON.options, {
    font: '30px Arial',
    fill: '#ffffff',
    align: 'center'
  });
  text_opt.anchor.setTo(0.5, 0.5);


  var exit = this.game.add.button(this.game.world.centerX, eight*4, 'button', g.click_exit, this, 1, 0, 2);
  s2 = phaserJSON.exit.length/2;
  exit.scale.x = s2;
  exit.anchor.setTo(0.5, 0.5);

  var text_exit = this.game.add.text(this.game.world.centerX, eight*4, phaserJSON.exit, {
    font: '30px Arial',
    fill: '#ffffff',
    align: 'center'
  });
  text_exit.anchor.setTo(0.5, 0.5);


  //call update live directly then set timer to check
  g.check_store(this.game);
  //g.update_lives(this.game);
  var lives_update = this.game.time.create(false);
  lives_update.loop(10000, g.update_lives, this.game, this.game);
  lives_update.start();

  text_lives = this.game.add.text(this.game.world.centerX, eight*5, phaserJSON.lives+' '+this.game.lives, {
    font: '50px Arial',
    fill: '#ff0044',
    align: 'center'
  });
  text_lives.anchor.setTo(0.5, 0.5);

  var text_highscore = this.game.add.text(this.game.world.centerX, eight*6, phaserJSON.score+' '+this.game.highscore, {
    font: '25px Arial',
    fill: '#ff0044',
    align: 'center'
  });
  text_highscore.anchor.setTo(0.5, 0.5);

  var lang = this.game.add.text(this.game.world.centerX, eight*7, set_language, {
    font: '15px Arial',
    fill: '#ff0044',
    align: 'center'
  });
  lang.anchor.setTo(0.5, 0.5);

};

menu.update = function (){
  //console.log("your on menu");
};

module.exports = menu;
