
// check if we are developing the app
if (navigator.platform.match(/(Win)/)) {
  set_language = 'en-US'; //default should be fr-FR
  life_wait = 0.5;
  phone = false;
  start_game();
}else{
  phone = true;
  life_wait = 60;
  document.addEventListener('deviceready', onDeviceReady, false);
}

function success_auth(test){
  console.log(test);
  if(localStorage != undefined){
    if(localStorage.getItem('auth') === null){
      localStorage.setItem('auth', true );
    }
  }
}

function fail_auth(){
  if(localStorage != undefined){
    if(localStorage.getItem('auth') === null){
      localStorage.setItem('auth', false );
    }
  }
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

  //check google auth or pass if localstore //only request this if online
  if(localStorage != undefined){
    if(localStorage.getItem('auth') === null){
      window.plugins.playGamesServices.auth(success_auth, fail_auth);
    }else if(localStorage.getItem('auth') === true){
      window.plugins.playGamesServices.auth(success_auth, fail_auth);
    }
  }

  document.addEventListener("online", yourCallbackFunction, false);
  //document.addEventListener("offline", onOffline, false);

  // window.analytics.startTrackerWithId('UA-10168261-8');

  start_game();
}

//this does not get called on startup?
function yourCallbackFunction(){
  console.log("online callback function");
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
      options: require('./states/options.js'),
      boards: require('./states/boards.js'),
    },

    w = window.innerWidth;
    h = window.innerHeight;
    r = gcd (w, h);
    v = (w/r)/(h/r);

    if(v >= 0.50 && v <= 0.62){
      console.log("size close engouth");
      width = window.innerWidth;
      height = window.innerHeight;
    }else{
      width = properties.size.x;
      height = properties.size.y;
    }

    game = new Phaser.Game(
      width,
      height,
      Phaser.AUTO,
      'game'
    );

  // Automatically register each state.
  _.each(states, function(state, key) {
    game.state.add(key, state);
  });

  game.state.start('boot');
}
