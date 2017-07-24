var ui = {
  current: 'menu'
};

ui.create = function () {
  Handlebars = require("handlebars");
  b = require("templates");
  $ = require("jquery");
  this.prepActions();
  var content = this.getPageContent(this.current);
  this.handlebars('menu', content);
};

ui.getPageContent = function( current ){
  var data = {};

    if(current == 'menu'){
      data = {
        buttons:[{
          title: 'Play',
          id: 'aId',
          class: 'aClass'
        },{
          title: 'Something',
          id: 'aId',
          class: 'aClass'
        }]

      }
    }

    return data;
};

ui.prepActions = function(){
  $( document ).on( "click", "#aId", function() {
    console.log( $( this ).text() );
  });
};

ui.handlebars = function(page, data, template){
  var set_template = (template ? template : 'default' );
  var postTemplate = b['JST']['src/templates/'+set_template+'.hbs']; // how do we know which template to use
  var html = postTemplate(data);
  this.swapContent(page, html);
};

ui.swapContent = function( page, html ){
  $( "#"+page).html( '<div class="content">'+html+'</div>' );
};

module.exports = ui;
