var ui = {
  current: 'menu',
  intialized: false,
  lives: 1
};

ui.init = function () {

  Handlebars = require("handlebars");
  b = require("templates");
  //$ = require("jquery");
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
  $( document ).on( "click", ".button", function() {
    if($(this).hasClass("page")){
      var page = $(this).data("page");
      if(page){
        ref.changePage( page );
      }
    }
    if(this.id === 'start'){
      ref.startGame();
    }
  });
};

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
  $( "#"+page).html( '<div class="content">'+html+'</div>' );
};

ui.startGame = function(){
  //loader.show();
  $("#game").show();
  //transition hide menu
  if(this.intialized){
    game.state.start('main');
  }else{
    start_game();
  }

};

ui.endGame = function(){

  //loader.show();
  $("#menu").show();
  $("#game").hide();
  //loader.hide();

};

module.exports = ui;
