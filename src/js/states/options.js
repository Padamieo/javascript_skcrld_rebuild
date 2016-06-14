var g = require('general');

var opti = {};

opti.create = function () {

  var eight = (this.game.height/8);


  g.display_text(this.game.phaserJSON.options, eight*1);

  g.button(this.game.phaserJSON.back, eight*7, g.o_menu);

  //sound on off
  g.button_new('sound', eight*2, '');

  //game.vibration
  console.log(this.game.vibration);
  vib = (this.game.vibration === 1 ? 'Vibration On' : 'Vibration Off' );
  g.button_new(vib, eight*3, this.game.vibration = (this.game.vibration === 0 ? 1 : 0));

};

opti.update = function (){
  //console.log("your on opti");
};

module.exports = opti;
