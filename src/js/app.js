var _ = require('lodash'),
  Phaser = require('Phaser'),
  properties = require('./properties'),
  states = {
    boot: require('./states/boot.js'),
    preloader: require('./states/preloader.js'),
    game: require('./states/game.js')
  },
  game = new Phaser.Game(
    window.innerWidth*window.devicePixelRatio,
    window.innerHeight*window.devicePixelRatio,
    Phaser.AUTO,
    'game'
  );
// Automatically register each state.
_.each(states, function(state, key) {
  game.state.add(key, state);
});

game.state.start('boot');
