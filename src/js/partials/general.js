
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
        console.log(game.timestamp);
        game.lives = game.lives + 1;
        localStorage.setItem("lives", game.lives );
        //general.update_lives_text(game);
      }
    }
  },

  //rather than haveing the checkstore for everything have a commmon default
  check_store_individual: function(attribute, fallback) {
    if(localStorage.getItem(attribute) === null){
      localStorage.setItem(attribute, fallback );
      game[attribute] = fallback;
    }else{
      game[attribute] = parseInt(localStorage.getItem(attribute));
    }
  },

  check_store: function(game){
    if(localStorage != undefined){

      general.check_store_individual('lives', 9);
      general.check_store_individual('timestamp', 0);
      general.check_store_individual('highscore', 0);

      //dont need to call the following every menu load

      general.check_store_individual('tutorial', 1);
      general.check_store_individual('vibration', 1);

      if(localStorage.getItem('sound_setting') === null){
        localStorage.setItem("sound_setting",  0 );
        game.sound.mute = 0;
      }else{
        game.sound.mute = parseInt(localStorage.getItem('sound_setting'));
      }

    }else{
      if(game.online){
        window.analytics.trackException('localStorage : is undefined, stored data will not work', false);
      }
    }
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
      return 0x4EF24E;
    }
    if(enemy_type === 2){
      return 0xFEFF0D;
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

  colour_change: function (element, set) {
    element.clear();
    element.beginFill(element.colours[(set ? 1 : set)], 1);
    rounded = element.rounded;
    element.drawRoundedRect(element.loc[2],element.loc[0],element.loc[1],element.loc[3], (rounded ? rounded : 8));
    element.endFill();
    general.sound_vibration('press');
  },

  sound_vibration: function(request, length){
    if(game.sound.mute != 1){
      if(request == 'press'){
        game.sound.play('press');
      }else if(request == 'meow'){
        game.sound.play('meow');
      }else{
        game.sound.play('testSound');
      }
    }
    if(game.vibration != 0){
      v_length = ( length != '' ? length : 50 );
      navigator.vibrate([v_length]);
    }
  },

  text_timeout: function(game){
    game.tick_count++;
    game.tutorial_text.kill();
  }

};

module.exports = general;
