var g = require('general');

var opti = {};

opti.create = function () {

  var eight = (this.game.height/8);


  g.display_text(this.game.phaserJSON.options, eight*1);

  g.button(this.game.phaserJSON.back, eight*6, g.o_menu);

  g.button(this.game.phaserJSON.back, eight*2, g.o_menu);


};

opti.update = function (){
  //console.log("your on opti");
};

module.exports = opti;
