
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

      if(localStorage.getItem('tutorial') === null){
        localStorage.setItem("tutorial",  1 );
        game.tutorial = 1;
      }else{
        game.tutorial = localStorage.getItem('tutorial');
      }
      game.tutorial = 1;


      //localStorage.removeItem("Website");
    }else{
      //window.analytics.enableUncaughtExceptionReporting(Enable, success, error);
      console.log("No support");
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

  display_text: function(text, v_pos){
    text_display = game.add.text(game.world.centerX, v_pos, text, {
      font: 'bold 20pt Arial',
      fill: '#ffffff',
      align: 'center'
    });
    text_display.anchor.setTo(0.5, 0.5);
    return text_display;
  },

  button: function(text, v_pos, action, enforce_width){

    if(enforce_width == null){
      size = general.calculate_button_width(text);
    }else{
      size = enforce_width;
    }

    // var button2 = game.add.graphics(game.world.centerX, v_pos);
    // button2.beginFill(0xAAAAAA, 1);
    // var w = size*55
    // button2.drawRoundedRect(-w/2, -30, w, 60, 10);
    // button2.anchor.setTo(0.5, 0.5);

    var button = game.add.button(game.world.centerX, v_pos, 'button', action, this, 1, 0, 2);
    button.opacity = 0.5;
    //max size will be 7.5 if it is reduce size of font
    button.scale.x = size;
    button.anchor.setTo(0.5, 0.5);

    var text_button = game.add.text(game.world.centerX, v_pos, text, {
      font: 'bold 20pt Arial',
      fill: '#ffffff',
      align: 'center'
    });
    text_button.anchor.setTo(0.5, 0.5);
    //console.log(button);
  },

  button_new: function(text, v_pos, action, enforce_width){

    if(enforce_width == null){
      size = general.calculate_button_width(text);
    }else{
      size = enforce_width;
    }

    // draw a rectangle
    var e = game.add.graphics(0, 0);
    e.beginFill(0x3A99D8, 1);
    e.set_size = size;
    e.v_pos = v_pos;
    e.drawRoundedRect(game.world.centerX - (e.set_size*50)/2, v_pos - 25, (e.set_size*50), 50, 8);
    e.endFill();
    // input
    e.inputEnabled = true;
    e.a = action;

    e.events.onInputDown.add( general.clickListener, this );
    e.events.onInputUp.add( e.a, this);

    e.text = game.add.text(game.world.centerX, v_pos, text, {
      font: 'bold 20pt Arial',
      fill: '#ffffff',
      align: 'center'
    });
    e.text.anchor.setTo(0.5, 0.5);

    return e;

  },

  clickListener: function (v) {
    //should v be this so i can call it on main.js update
    v.clear();
    v.beginFill(0xFFff80, 1);
    v.drawRoundedRect(game.world.centerX - (v.set_size*50)/2, v.v_pos - 25, (v.set_size*50), 50, 8);
    v.endFill();

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
