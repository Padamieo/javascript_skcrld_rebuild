
// check if we are developing the app
if (navigator.platform.match(/(Win)/)) {
  set_language = 'en-US'; //default should be fr-FR
  life_wait = 0.5;
  start_game();
}else{
  document.addEventListener('deviceready', onDeviceReady, false);
  life_wait = 60;
}

function onDeviceReady(){

  //working language detection
  navigator.globalization.getPreferredLanguage(
    function (language) {
      console.log('language: ' + language.value);
      str = language.value;
      if(str.substring(0, 2) === 'en'){
        set_language = 'en-US';
      }else{
        set_language = language.value;
      }
      lang = language.value;
    },
    function () {
      console.log('Error getting language');
      set_language = 'en-US';
    }
  );

  //add vibration here



  start_game();
}

function gcd (a, b) {
  return (b == 0) ? a : gcd (b, a%b);
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

    w = properties.size.x;
    h = properties.size.y;
    console.log(w+" "+h);
    r = gcd (w, h);
    console.log(r);
    console.log("Aspect=", w/r, ":", h/r);
    v = (w/r)/(h/r);
    console.log("v"+v);

    dw = window.innerWidth;
    dh = window.innerHeight;
    console.log(dw+" "+dh);
    dr = gcd (dw, dh);
    console.log(dr);
    console.log("Aspect=", dw/dr, ":", dh/dr);
    dv = (dw/dr)/(dh/dr);
    console.log("v"+dv);

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
