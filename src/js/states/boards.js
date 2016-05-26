//var g = require('general');

var boards = {};

function go_menu(){
  game.state.start('menu');
  //window.analytics.trackEvent('leaderboard', 'leaderboard', 'Hits', 1);
}

boards.create = function () {

  var phaserJSON = this.game.cache.getJSON('language');

  var eight = (this.game.height/8);

  g.display_text(phaserJSON.leaderboards, eight*1);



  g.button(phaserJSON.back, eight*6, go_menu);

};

boards.update = function (){
  //console.log("your on boards");
};

module.exports = boards;
