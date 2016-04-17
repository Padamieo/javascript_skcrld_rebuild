if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
  console.log("mobile");
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  console.log("browser");
  onDeviceReady();
}

function onDeviceReady(){
  
  var _ = require('lodash'),
    Phaser = require('Phaser'),
    Sat = require('Sat'),
    properties = require('./properties'),
    states = {
      boot: require('./states/boot.js'),
      preloader: require('./states/preloader.js'),
      menu: require('./states/menu.js'),
      main: require('./states/main.js')
    },

    // game = new Phaser.Game(
    //   window.innerWidth*window.devicePixelRatio,
    //   window.innerHeight*window.devicePixelRatio,
    //   Phaser.AUTO,
    //   'game'
    // );

    game = new Phaser.Game(
      properties.size.x,
      properties.size.y,
      Phaser.AUTO,
      'game'
    );

  // Automatically register each state.
  _.each(states, function(state, key) {
    game.state.add(key, state);
  });

  game.state.start('boot');
}
