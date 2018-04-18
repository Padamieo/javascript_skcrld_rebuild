
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

  check_store: function(game){
    game.lives = localStorage.getItem('lives');
    game.timestamp = localStorage.getItem('timestamp');
    game.highscore = localStorage.getItem('highscore');

    game.tutorial = localStorage.getItem('tutorial');
    game.vibration = localStorage.getItem('vibration');
    game.soundon = localStorage.getItem('sound');
    //game.sound.mute = (game.soundon ? false : true );
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

  sound_vibration: function(request, length){
    window.console.log(request, game.sound.mute);
    if(game.soundon){
      window.console.log('play');
      if(request == 'meow'){
        game.sound.play('meow');
      }else{
        game.sound.play('testSound');
      }
    }
    if(game.vibration){
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
