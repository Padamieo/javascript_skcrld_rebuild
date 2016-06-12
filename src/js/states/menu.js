var g = require('general');

var menu = {};

function start_new_game(){
  game.state.start('main');
}

menu.create = function () {
  
  // window.analytics.trackView('menu');

this.game.phaserJSON = this.game.cache.getJSON('language');

  eight = (this.game.height/8);

  var menu_items = [this.game.phaserJSON.start, this.game.phaserJSON.options, this.game.phaserJSON.leaderboards, 'Get Lives', this.game.phaserJSON.exit];

  // this should be a function
  biggest_width = 0;
  for (i = 0, l = menu_items.length; i < l; ++i) {
    v = g.calculate_button_width(menu_items[i]);
    if(v > biggest_width){
      biggest_width = v;
    }
  }
  this.game.button = '';

  s = g.button_new(this.game.phaserJSON.start, eight*1, start_new_game, biggest_width);
  console.log(s.v_pos);

  g.button(this.game.phaserJSON.leaderboards, eight*2, g.o_leaderboards, biggest_width);

  g.button_new(this.game.phaserJSON.options, eight*3, g.o_options, biggest_width);

  g.button_new(this.game.phaserJSON.getlives, eight*4, g.o_options);

  //call update live directly then set timer to check
  g.check_store(this.game);

  var lives_update = this.game.time.create(false);
  lives_update.loop(10000, g.update_lives, this.game, this.game);
  lives_update.start();

  this.game.text_lives = g.display_text(this.game.phaserJSON.lives+' '+this.game.lives, eight*5);

  g.display_text(this.game.phaserJSON.score+' '+this.game.highscore, eight*6);

  g.button(this.game.phaserJSON.exit, eight*7, g.click_exit, biggest_width);

  // window.plugins.playGamesServices.isSignedIn(function (result) {
  //   //console.log(“Do something with result.isSignedIn”);
  //   g.display_text(result.isSignedIn, eight*2);
  // });
  //
  // window.plugins.playGamesServices.showPlayer(function (playerData) {
  //   //console.log(“Authenticated as ”+playerData['displayName']);
  //   g.display_text(playerData['displayName'], eight*4);
  // });

  //text(vv, eight*7);

};

menu.update = function (){

  if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
    console.log("shake");
    //s.kill();
    g.clickListener(s); //interesting
    //s = g.button_new(this.game.phaserJSON.start, eight*1.5, start_new_game, biggest_width);
  }

  //console.log("your on menu");
  // console.log(s.v_pos);
  // s.v_pos+0.001;
};

module.exports = menu;
