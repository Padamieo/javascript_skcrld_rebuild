
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

  //language detection
  navigator.globalization.getPreferredLanguage(
    function (language) {
      var str = language.value;
      if(str.substring(0, 2) === 'en'){
        set_language = 'en-US';
      }else{
        set_language = language.value;
      }
    },
    function () {
      //if(game.online){
        //window.analytics.enableUncaughtExceptionReporting(Enable, success, error);
      //}
      set_language = 'en-US';
    }
  );

  if(we_online()){
    //check google auth or pass if localstore //only request this if online
    playgameservices();
    //start tracking within google analytics
    ga_start_tracking();
  }

  document.addEventListener("online", now_online, false);
  document.addEventListener("offline", now_offline, false);

  start_game();
}

function playgameservices(){
  if(localStorage != undefined){
    if(localStorage.getItem('auth') === null){
      window.plugins.playGamesServices.auth(success_auth, fail_auth);
    }else if(localStorage.getItem('auth') === true){
      window.plugins.playGamesServices.auth(success_auth, fail_auth);
    }
  }
}

function ga_start_tracking(){
  window.analytics.startTrackerWithId('UA-10168261-8');
}

function we_online(){
  var networkState = navigator.connection.type;
  if (networkState !== Connection.NONE) {
    return true;
  }else{
    return false;
  }
}

//only called when we go online, no referance to what connection type.
function now_online(){
  if(we_online()){
    playgameservices();
    ga_start_tracking();
    //now allow playsgameservice and analytics calls
    if(game != null){
      console.log("no action issue with game");
      //ga log of this issue case
    }else{
      game.online = true;
    }
  }
}

function now_offline(){
  //now prevent playsgameservice and analytics calls
  if(game != null){
    console.log("no action issue with game");
  }else{
    game.online = false;
  }
}

function gcd (a, b) {
  return (b === 0) ? a : gcd (b, a%b);
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
    };

    var w = window.innerWidth;
    var h = window.innerHeight;
    var r = gcd (w, h);
    var v = (w/r)/(h/r);
    var criteria = (v >= 0.50 && v <= 0.62);
    var width = (criteria ?  window.innerWidth : properties.size.x);
    var height = (criteria ?  window.innerHeight : properties.size.y);

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

  //should only call on mobile
  if(phone){
    if(we_online()){
      now_online();
      game.online = true;
    }
  }else{
    game.online = false;
  }

  game.state.start('boot');
}
