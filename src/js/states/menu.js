var g = require('general');

var menu = {};

function start_new_game(){
  game.state.start('main');
}

menu.create = function () {

  // window.analytics.startTrackerWithId('UA-10168261-8');
  // window.analytics.trackView('menu');

  var phaserJSON = this.game.cache.getJSON('language');

  var eight = (this.game.height/8);

  var menu_items = [phaserJSON.start, phaserJSON.options, phaserJSON.leaderboards, 'Get Lives', phaserJSON.exit];

  // this should be a function
  biggest_width = 0;
  for (i = 0, l = menu_items.length; i < l; ++i) {
    v = g.calculate_button_width(menu_items[i]);
    if(v > biggest_width){
      biggest_width = v;
    }
  }

  g.button(phaserJSON.start, eight*1, start_new_game, biggest_width);

  g.button(phaserJSON.leaderboards, eight*2, g.o_leaderboards, biggest_width);

  g.button(phaserJSON.options, eight*3, g.o_options, biggest_width);

  g.button('Get Lives', eight*4, g.o_options);

  //call update live directly then set timer to check
  g.check_store(this.game);

  var lives_update = this.game.time.create(false);
  lives_update.loop(10000, g.update_lives, this.game, this.game);
  lives_update.start();

  this.game.text_lives = g.display_text(phaserJSON.lives+' '+this.game.lives, eight*5);

  g.display_text(phaserJSON.score+' '+this.game.highscore, eight*6);

  g.button(phaserJSON.exit, eight*7, g.click_exit, biggest_width);

  //text(vv, eight*7);

};

menu.update = function (){
  //console.log("your on menu");
};

module.exports = menu;
