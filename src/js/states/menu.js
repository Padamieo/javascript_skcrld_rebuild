var g = require('general');

var menu = {};

function start_new_game(){
  game.state.start('main');
}

menu.create = function () {

  if(this.game.online){
    window.analytics.trackView('menu');
  }

  this.game.phaserJSON = this.game.cache.getJSON('language');

  //call update live directly then set timer to check
  g.check_store(this.game);

  var lives_update = this.game.time.create(false);
  lives_update.loop(10000, g.update_lives, this.game, this.game);
  lives_update.start();

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

  //this.game.text_lives = g.display_text(this.game.phaserJSON.lives+' '+this.game.lives, eight*1);
  heart_setup(eight*1);

  //this.game.button = '';
  start = ( this.game.lives >= 1 ? start_new_game : '' );
  //s = g.button(this.game.phaserJSON.start, [eight*1,biggest_width], start);
  s = g.button(this.game.phaserJSON.start, [eight*4,biggest_width], start, ['0x58d83a', '0x555555'], 25);

  leadboards = ( phone ? g.o_leaderboards : '' );
  g.button(this.game.phaserJSON.leaderboards, [eight*5,biggest_width], leadboards);

  g.button(this.game.phaserJSON.options, [eight*6,biggest_width], g.o_options);

  // live_menu = ( game.online ? g.o_options : '' );
  // g.button(this.game.phaserJSON.getlives, [eight*6,biggest_width], live_menu);

  g.display_text(this.game.phaserJSON.score+' '+this.game.highscore, eight*3);

  g.button(this.game.phaserJSON.exit, eight*7, ( phone ? g.click_exit : '' ));

  // window.plugins.playGamesServices.isSignedIn(function (result) {
  //   //console.log(“Do something with result.isSignedIn”);
  //   g.display_text(result.isSignedIn, eight*2);
  // });
  //
  // window.plugins.playGamesServices.showPlayer(function (playerData) {
  //   //console.log(“Authenticated as ”+playerData['displayName']);
  //   g.display_text(playerData['displayName'], eight*4);
  // });

};

function heart_setup(loc){

  loc = [loc, game.world.centerX];

  heart_back = game.add.sprite( loc[1], loc[0], 'heart' );
  heart_back.anchor.setTo(0.5, 0.5);
  heart_back.tint = 0xDE77AE;

  heart_level = game.add.sprite( loc[1], loc[0], 'heart' );
  heart_level.anchor.setTo(0.5, 0.5);
  heart_level.tint = 0x555555;

  visual_control = game.add.graphics(0, 0);
  visual_control.beginFill(0xDE77AE);
  var inverse_health = ((game.lives*-1)+9)*11;
  visual_control.drawRoundedRect( loc[1]-50, loc[0]-50, 100, inverse_health, 8 );
  visual_control.endFill();
  heart_level.mask = visual_control;
  game.stored_lives = game.lives;

  game.text_lives = g.display_text(game.lives, [loc[1],loc[0]], 40, '#ffffff');

}

menu.update = function (){

  if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
    console.log("Set Lives Too 1");
    //s = g.button(this.game.phaserJSON.start, eight*1.5, start_new_game, biggest_width);
    this.game.lives = 1;
    game.lives = 1;
  }

  if(game.lives != game.stored_lives){
    console.log("something changed");
    heart_back.kill();
    heart_level.kill();
    visual_control.kill();
    game.stored_lives = game.lives;
    heart_setup(eight*1); // maybe this should update better
  }

  //if lives change update button s
  // if(!game.lives >= 1){
  //   //start = ( this.game.lives >= 1 ? start_new_game : '' );
  //   s.text.kill();
  //   s.kill();
  //   start = ( this.game.lives >= 1 ? start_new_game : '' );
  //   s = g.button(this.game.phaserJSON.start, eight*1, start, biggest_width);
  // }
  //console.log("your on menu");
  // console.log(s.v_pos);
  // s.v_pos+0.001;
};

module.exports = menu;
