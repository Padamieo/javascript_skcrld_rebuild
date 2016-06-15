var g = require('general');

var boards = {};

boards.create = function () {

  var phaserJSON = this.game.cache.getJSON('language');

  var eight = (this.game.height/8);

  //this will get all leaderboards
  window.plugins.playGamesServices.showAllLeaderboards();

  g.display_text(phaserJSON.leaderboards, eight*1);

  g.button_new(phaserJSON.back, eight*6, g.o_menu);

};

boards.update = function (){
  //console.log("your on boards");
};

module.exports = boards;
