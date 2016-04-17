
var general = {

  setup: function(game){
    game.explosion = game.add.group();
		game.explosion.createMultiple(100, 'explosion');
		game.explosion.setAll('anchor.x', 0.5);
		game.explosion.setAll('anchor.y', 0.5);
		game.explosion.setAll('killOnComplete',true);
		game.explosion.callAll('animations.add', 'animations', 'boom', [0, 1, 3], 30, false);
    //http://www.html5gamedevs.com/topic/4384-callback-when-animation-complete/

		// Create a white rectangle that we'll use to represent the flash
		game.flash = game.add.graphics(0, 0);
		game.flash.beginFill(0xffffff, 1);
		game.flash.drawRect(0, 0, game.width, game.height);
		game.flash.endFill();
		game.flash.alpha = 0;

    game.world.setBounds(-10, -10, game.width + 20, game.height + 20);
    //this may be the key to sorting screen size with clickable areas

    //setup emitter for burst
    //emitter requires arcade physics to operate
    game.emitter = game.add.emitter(0, 0, 100);
    game.emitter.makeParticles('test');
    game.emitter.gravity = 200;

  },

  explosion: function(game, loc){
    console.log("ex");
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
  }

};

module.exports = general;
