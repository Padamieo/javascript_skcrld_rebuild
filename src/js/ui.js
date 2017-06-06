var ui = {};

ui.create = function () {
  console.log("hello");
  //this.handlebars('menu', {});
};

ui.handlebars = function(page, data, template){
  var set_template = (template ? template : 'templates' );
  var postTemplate = JST['src/templates/'+set_template+'.hbs']; // how do we know which template to use
  var html = postTemplate(data);
  this.swapContent(page, html);
};

ui.swapContent = function(page, html){
  $( "#"+page+" .content").replaceWith( '<div class="content">'+html+'</div>' );
};

module.exports = ui;
