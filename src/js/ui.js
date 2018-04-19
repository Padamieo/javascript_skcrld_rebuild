var ui = {
  current: 'menu',
  intialized: false,
  lives: 9,
  default: 9
};

ui.init = function () {

  Handlebars = require("handlebars");
  this.templates = require("templates");

  this.loadJSON(function(response) {
    this.language = JSON.parse(response);

    // Snap = require("snap");
    // require("classie");
    //svgLoader = require("svgLoader");
    //loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 100 } );

    this.getLives();
    //TODO: find way to rebuildPage on data change rather than timeout
    //setInterval(function(){ this.reBuildPage(); }.bind(this), 3000);
    this.prepActions();
    this.buildPage();

  }.bind(this));

};

ui.loadJSON = function(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '../languages/'+ui.set_language+'.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
};

ui.getLives = function(){

  let stored_lives = parseInt(localStorage.getItem('lives'));
  if(stored_lives === undefined){
    this.lives = this.default;
    localStorage.setItem('lives', this.default );
    stored_lives = this.lives;
  }
  if(stored_lives < this.default ){
    stored_lives = this.returnLives( stored_lives );
  }
  this.lives = stored_lives;
};

ui.returnLives = function( stored_lives ){
  var stored = localStorage.getItem('timestamp');
  var timestamp = new Date(stored);

  var liveToRegain = (this.default-stored_lives);
  var array = this.generateTimestamps( stored, liveToRegain );

  var timestampNow = new Date();
  for (var i = 0; i < array.length; i++){
    if(array[i] < timestampNow){
      stored_lives = stored_lives + 1;
      localStorage.setItem('lives', stored_lives );
    }else{
      window.console.log(new Date(array[i]));
    }
  }
  return stored_lives;
};

ui.generateTimestamps = function( stored, liveToRegain ){
  var times = [];
  for (var i = 1; i <= liveToRegain; i++){
    var timestamp = new Date( stored );
    var time = timestamp.setMinutes(timestamp.getMinutes() + (i * this.life_wait) );
    times.push(time);
  }
  return times;
};

ui.getLocalStorage = function(attribute, fallback) {
  if(localStorage.getItem(attribute) === null){
    this.setLocalStorage(attribute, fallback);
  }else{
    fallback = parseInt(localStorage.getItem(attribute));
  }
  return fallback;
};

ui.setLocalStorage = function(attribute, value){
  localStorage.setItem(attribute, value );
};

ui.negativePercentage = function(){
  return (this.lives-this.default)/-0.1;
};

ui.reBuildPage = function(){
  this.getLives();
  this.buildPage();
  console.log('rebuildPage'); //NOTE: temporary for testing
};

ui.buildPage = function(){
  var content = this.getPageContent(this.current);
  this.handlebars('menu', content);
};

ui.getPageContent = function( current ){
  var data = {};

  if(current === 'menu'){
    data = {
      title: true,
      heart: true,
      lives: this.lives,
      percentage: ui.negativePercentage(),
      buttons:[{
        title: this.language.start,
        id: 'start',
        class: ( this.lives <= 0 ? 'disabled' : 'test' ),
        disabled: ( this.lives <= 0 ? true : false )
      },{
        title: this.language.options,
        class: 'page',
        data: [{
          name: 'page',
          value: 'options'
        }]
      },{
        title: this.language.leaderboards,
        class: 'disabled',
        disabled: true
      },{
        title: this.language.exit
      }]
    }
  }else if(current === 'options'){
    data = {
      buttons:[{
        title: this.language.back,
        class: 'page',
        data: [{
          name: 'page',
          value: 'menu'
        }]
      }],
      options: ui.getOptions()
    }
  }

  return data;
};

ui.getOptions = function( ){
  var options = [{
    label: this.language.sound,
    state: this.getLocalStorage('sound', 1),
    id: 'sound'
  },{
    label: this.language.vibration,
    state: this.getLocalStorage('vibration', 1),
    id: 'vibration'
  },{
    label: this.language.tutorial,
    state: this.getLocalStorage('tutorial', 1),
    id: 'tutorial'
  }];
  return options;
};

ui.prepActions = function(){
  var ref = this;
  document.getElementById("menu").addEventListener("click", function(e){
    var button = ui.findclass( e.path );
    if(button){
      if(button.classList.contains("page")){
        var page = button.getAttribute('data-page');
        if(page){
          ref.changePage( page );
        }
      }
      if(button.id === 'start'){
        ref.startGame();
      }
    }
    var setting = ui.findclass( e.path, 'setting' );
    if(setting){
      if(setting.classList.contains("setting")){
        var which = setting.getAttribute('for');
        var status = (document.getElementById(which).checked ? 0 : 1 );
        this.setLocalStorage(which, status);
      }
    }
    return false;
  }.bind(this));
};

  ui.findclass = function( array, classToFind = 'button' ){
    for (var i = 0; i < array.length; i++){
      if(array[i].id === 'menu'){
        return false;
      }
      if(array[i].classList.contains(classToFind)){
        return array[i];
      }
    }
  },

ui.changePage = function( page ){
  var fallback = ( page ? page : "menu" );
  this.current = fallback;
  //loader.show();
  this.buildPage();
  //setTimeout(function(){ loader.hide(); }, 300);
};

ui.handlebars = function(page, data, template){
  var set_template = (template ? template : 'default' );
  var postTemplate = this.templates['JST']['src/templates/'+set_template+'.hbs'];
  var html = postTemplate(data);
  this.swapContent(page, html);
};

ui.swapContent = function( page, html ){
  document.getElementById(page).innerHTML = '<div class="content">'+html+'</div>';
};

ui.startGame = function(){
  window.console.log('startGame');
  //loader.show();
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  //transition hide menu
  if(this.intialized){
    game.state.start('main');
  }else{
    start_game();
  }

};

ui.endGame = function(){
  this.reBuildPage();
  //loader.show();
  document.getElementById('menu').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  //loader.hide();
};

ui.click_exit = function(){
  if(navigator.app){
    navigator.app.exitApp();
  }else if(navigator.device){
    navigator.device.exitApp();
  }
};

module.exports = ui;
