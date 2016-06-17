
var general = {

  setup: function(game){
    //will put generic setup stuff here so different game modes can use
  },

  explosion: function(game, loc){
		if (game.explosion.countDead() === 0) {
			return;
		}
		general.burst(game, loc.x, loc.y);
		bang = game.explosion.getFirstExists(false);
		//bang.rotation = 180;
		bang.reset(loc.x, loc.y);
		bang.play('boom', 30, 1, true);
	},

  burst: function(game, x, y){
		game.emitter.x = x;
		game.emitter.y = y;
		game.emitter.start(true, 2000, null, 10);
	},

  flash: function (game){
    game.flash.alpha = 1;
    game.add.tween(game.flash)
    .to({ alpha: 0 }, 100, Phaser.Easing.Cubic.In)
    .start();
  },

  shake: function(game){
		game.camera.y = 0;
		game.add.tween(game.camera)
		.to({ y: -10 }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true)
		.start();
		/*
  		//think this is a lighter shake
  		.to({ y: -10 }, 40, Phaser.Easing.Elastic.InOut, false, 0, 5, true)
  		.start();
		*/
	},

  click_exit: function() {
    if(navigator.app){
      navigator.app.exitApp();
    }else if(navigator.device){
      navigator.device.exitApp();
    }
  },

  update_lives: function(game){
    if( game.lives <= 8 ){
      if((+new Date() / 60000) >= (game.timestamp + life_wait) ){
        game.timestamp = game.timestamp + life_wait;
        game.lives = game.lives + 1;
        localStorage.setItem("lives", game.lives );
        general.updateText(game);
      }
    }
  },

  check_store: function(game){
    if(localStorage != undefined){
      //console.log("Local Storage is supported");

      if(localStorage.getItem('lives') === null){
        localStorage.setItem('lives', 9 );
        game.lives = 9;
      }else{
        game.lives = parseInt(localStorage.getItem("lives"));
      }

      if(localStorage.getItem('timestamp') === null){
        localStorage.setItem("timestamp", 0 );
        game.timestamp = 0;
      }else{
        game.timestamp = parseInt(localStorage.getItem('timestamp'));
      }

      if(localStorage.getItem('highscore') === null){
        localStorage.setItem("highscore",  0 );
        game.highscore = 0;
      }else{
        game.highscore = parseInt(localStorage.getItem('highscore'));
      }

      //dont need to call the following every menu load

      if(localStorage.getItem('tutorial') === null){
        localStorage.setItem("tutorial",  1 );
        game.tutorial = 1;
      }else{
        game.tutorial = localStorage.getItem('tutorial');
      }
      game.tutorial = 1; //got tutorial perma active here

      if(localStorage.getItem('vibration') === null){
        localStorage.setItem("vibration",  1 );
        game.vibration = 1;
      }else{
        game.vibration = localStorage.getItem('vibration');
      }

      if(localStorage.getItem('sound_setting') === null){
        localStorage.setItem("sound_setting",  1 );
        game.sound_setting = 1;
      }else{
        game.sound_setting = localStorage.getItem('sound_setting');
      }

      //localStorage.removeItem("Website");
    }else{
      if(game.online){
        //window.analytics.enableUncaughtExceptionReporting(Enable, success, error);
        console.log("No support");
      }
    }
  },

  updateText: function(game){
    var phaserJSON = game.cache.getJSON('language');
    game.text_lives.setText(phaserJSON.lives+' '+game.lives);
  },

  delete_store: function(){
    if(localStorage != undefined){
      localStorage.clear();
    }
  },

  enemy_colour: function(enemy_type){
    if(enemy_type === 0){
      return 0xf24e90;
    }
    if(enemy_type === 1){
      return 0x4ef24e;
    }
  },

  choose: function(game){
    var i = game.rnd.integerInRange(0, 19);
    var enemy_type = game.enemy_array[i];
    return (enemy_type === '' ? 0 : enemy_type );
  },

  missed_shot: function(){
    this.game.misses++;
  },

  display_text: function(text, loc, font_size){
    pos = (!loc.isArray ? (loc === '' ? [game.world.centerX, game.world.centerY]: [game.world.centerX, loc]) : loc);
    size = (font_size ? font_size : 20 );
    text_display = game.add.text(pos[0], pos[1], text, {
      font: 'bold '+size+'pt Arial',
      fill: '#ffffff',
      align: 'center'
    });
    text_display.anchor.setTo(0.5, 0.5);
    return text_display;
  },

  default_button_colours: function(){
    return ['0x3A99D8', '0x58d83a', '0x555555'];
  },

  build_button_visual(colour, y, w, x, h, rounded){
    var button = game.add.graphics(0, 0);
    button.beginFill(colour, 1);
    var width = general.min_50(w);
    var height = general.min_50(h);
    button.drawRoundedRect((x ? x : game.world.centerX )-(width/2), (y ? y : game.world.centerY )-(height/2), width, height, (rounded ? rounded : 8));
    button.endFill();
    return button;
  },

  min_50: function(value){
    var width_or_height = (value ? value : 50);
    width_or_height = (width_or_height > 50 ? width_or_height : 50 );
    return width_or_height;
  },

  check_option: function(text, loc, actions, font_size, colours){

    if(text.isArray || text === ''){
      text = [game.phaserJSON.on, game.phaserJSON.off];
    }

    var size = 0;
    for (var i = 0; i < text.length; i++) {
      var this_width = general.calculate_button_width(text[i]);
      size = ( this_width > size ? this_width : size);
    }

    if(size < 7.5){
      fs = ( font_size ? font_size : 20 );
    }else{
      //get to testing check word length is not an issue
      console.log(size-7.5); // value over 7.5
      fs = 20;
    }

    var status = (actions == 1 ? 0 : 1 );

    colours = ( colours ? colours : general.default_button_colours() );

    var check = general.build_button_visual( colours[status], loc, size*(fs*2.5) );
    check.colours = colours;
    check.loc = loc;
    check.size_width = size*(fs*2.5);

    check.inputEnabled = true;
    check.events.onInputDown.add( general.clickListener, this );

    check.text = general.display_text(text[status], loc, fs);

    return check;
  },

  button: function(text, loc, action, width){
    //loc = {y, w, x, h};
    // colours = {press,hover,alt};
    // actions = {press,alt};

    if(width == null){
      size_width = general.calculate_button_width(text);
    }else{
      size_width = width;
    }

    font_size = 20;

    // draw a rectangle
    colour = (action != '' ? 0 : 2 );

    colours = general.default_button_colours();
    e = general.build_button_visual( colours[colour], loc, size_width*(font_size*2.5) );

    e.colours = general.default_button_colours();
    e.size_width = size_width; //should be all input
    e.loc = loc;

    // input
    e.inputEnabled = true;

    if(action != ''){
      e.a = action;
      e.events.onInputDown.add( general.clickListener, this );
      e.events.onInputUp.add( e.a, this);
    }

    e.text = general.display_text(text, loc, font_size);

    return e;

  },

  clickListener: function (element) {
    //should v be this so i can call it on main.js update
    element.clear();
    element.beginFill(element.colours[1], 1);
    element.drawRoundedRect(game.world.centerX - (element.size_width*50)/2, element.loc - 25, (element.size_width*50), 50, 8);
    element.endFill();

  },

  calculate_button_width: function(text){
    return text.length/2.5;
  },

  text_timeout: function(game){
    game.tick_count++;
    game.tutorial_text.kill();

  },

  o_menu: function(){
    game.state.start('menu');
    //window.analytics.trackEvent('leaderboard', 'leaderboard', 'Hits', 1);
  },

  o_options: function(){
    game.state.start('options');
    //window.analytics.trackEvent('leaderboard', 'leaderboard', 'Hits', 1);
  },

  o_leaderboards: function(){
    game.state.start('boards');
    //window.analytics.trackEvent('leaderboard', 'leaderboard', 'Hits', 1);
  }

};

module.exports = general;
