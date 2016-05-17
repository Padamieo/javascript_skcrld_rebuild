


if (navigator.userAgent.match(/(Mozilla|Chrome)/)) {

  console.log('agent browser: ' + navigator.userAgent);

  set_language = 'fr-FR';

  start_game();

}else{

  //need to add vibration
  document.addEventListener('deviceready', onDeviceReady, false);

}

function onDeviceReady(){

  //as it mobile device
  console.log('agent mobile: ' + navigator.userAgent);

  //working language detection
  navigator.globalization.getPreferredLanguage(
    function (language) {
      console.log('language: ' + language.value);
      set_language = language.value;
    },
    function () {
      console.log('Error getting language');
    }
  );

  start_game();
}

function start_game(){

  var _ = require('lodash'),
    Phaser = require('Phaser'),
    Sat = require('Sat'),
    properties = require('./properties'),
    states = {
      boot: require('./states/boot.js'),
      preloader: require('./states/preloader.js'),
      menu: require('./states/menu.js'),
      main: require('./states/main.js'),
      opti: require('./states/opti.js'),
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
