var g = require('general');

var opti = {};

function go_menu(){
  game.state.start('menu');
  //window.analytics.trackEvent('opti', 'opti', 'Hits', 1);
}

opti.create = function () {

  var phaserJSON = this.game.cache.getJSON('language');

  var eight = (this.game.height/8);


  g.display_text(phaserJSON.options, eight*1);

  g.button(phaserJSON.back, eight*6, go_menu);

};

opti.update = function (){
  //console.log("your on opti");
};

module.exports = opti;
