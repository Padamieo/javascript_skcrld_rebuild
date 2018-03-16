var ui = {
  current: 'menu',
  intialized: false,
  lives: 1
};

ui.init = function () {

  Handlebars = require("handlebars");
  b = require("templates");
  // Snap = require("snap");
  // require("classie");
  //svgLoader = require("svgLoader");
  //loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 100 } );
  this.prepActions();
  this.buildPage();

};

ui.negativePercentage = function(){
  return (this.lives-9)/-0.1;
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
      lives: ui.lives,
      percentage: ui.negativePercentage(),
      buttons:[{
        title: 'Play',
        id: 'start'
      },{
        title: 'Options',
        class: 'page',
        data: [{
          name: 'page',
          value: 'options'
        }]
      }]

    }
  }else if(current === 'options'){
    data = {
      buttons:[{
        title: 'Return',
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
    label: 'Sound',
    id: 'sound'
  },{
    label: 'Vibration',
    id: 'vibration'
  },{
    label: 'Tutorial',
    id: 'tutorial'
  }];
  return options;
};

ui.prepActions = function(){
  var ref = this;
  document.getElementById("menu").addEventListener("click", function(e){
    var button = ui.findclass( e.path );
    if(button.classList.contains("page")){
      var page = button.getAttribute('data-page');
      if(page){
        ref.changePage( page );
      }
    }
    if(button.id === 'start'){
      ref.startGame();
    }
  }.bind(this));
};

  ui.findclass = function( array, classToFind = 'button' ){
    return array.find(function(entry) {
      if( entry.classList.contains(classToFind) ){
        return entry;
      }
    });
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
  var postTemplate = b['JST']['src/templates/'+set_template+'.hbs'];
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
  //loader.show();
  document.getElementById('menu').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  //loader.hide();
};

module.exports = ui;
