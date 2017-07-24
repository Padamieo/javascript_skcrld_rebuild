var ui = {
  current: 'menu'
};

ui.init = function () {
  Handlebars = require("handlebars");
  b = require("templates");
  $ = require("jquery");
  this.prepActions();
  this.buildPage();
};

ui.buildPage = function(){
  var content = this.getPageContent(this.current);
  this.handlebars('menu', content);
};

ui.getPageContent = function( current ){
  var data = {};

  if(current === 'menu'){
    data = {
      buttons:[{
        title: 'Play',
        id: 'start'
      },{
        title: 'Something',
        class: 'page',
        data: [{
          name: 'page',
          value: 'main'
        }]
      }]

    }
  }else if(current === 'main'){
    data = {
      buttons:[{
        title: 'Return',
        class: 'page',
        data: [{
          name: 'page',
          value: 'menu'
        }]
      }]

    }
  }

  return data;
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
  this.buildPage();
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
  //transition hide menu
  game.state.start('main');
};

module.exports = ui;
