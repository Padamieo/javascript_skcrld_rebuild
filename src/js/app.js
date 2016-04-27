if (navigator.userAgent.match(/(Mozilla|Chrome)/)) {

  console.log('agent browser: ' + navigator.userAgent);

  set_language = 'fr-FR';
  // navigator.globalization.getPreferredLanguage(
  //   function (language) {
  //     console.log('language: ' + language.value);
  //     set_language = language.value;
  //   },
  //   function () {
  //     console.log('Error getting language');
  //   }
  // );

  onDeviceReady();

}else{

  console.log('agent mobile: ' + navigator.userAgent);

  //working language detection
  set_language = 'en-US';
  navigator.globalization.getPreferredLanguage(
    function (language) {
      console.log('language: ' + language.value);
      set_language = language.value;
    },
    function () {
      console.log('Error getting language');
    }
  );

  //  analytics.startTrackerWithId('UA-10168261-8');
  //  console.log("start");
  //  analytics.trackTiming("app", "start", new Date().getTime());

  //need to add vibration

  document.addEventListener('deviceready', onDeviceReady, false);

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
