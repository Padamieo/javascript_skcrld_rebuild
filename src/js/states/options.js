var g = require('general');

var opti = {};

opti.create = function () {

  var phaserJSON = this.game.cache.getJSON('language');

  var eight = (this.game.height/8);


  g.display_text(phaserJSON.options, eight*1);

  g.button(phaserJSON.back, eight*6, g.o_menu);

  

  window.plugins.playGamesServices.isSignedIn(function (result) {
    //console.log(“Do something with result.isSignedIn”);
    g.display_text(result.isSignedIn, eight*2);
  });

  window.plugins.playGamesServices.showPlayer(function (playerData) {
    //console.log(“Authenticated as ”+playerData['displayName']);
    g.display_text(playerData['displayName'], eight*4);
  });

};

opti.update = function (){
  //console.log("your on opti");
};

module.exports = opti;
