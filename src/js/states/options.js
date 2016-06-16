var g = require('general');

var opti = {};

opti.create = function () {

  var eight = (this.game.height/8);


  g.display_text(this.game.phaserJSON.options, eight*1);

  g.button(this.game.phaserJSON.back, eight*7, g.o_menu);

  //sound on off
  //console.log(game.sound_setting);
  aaa = ['soundssoundsosdundasd','Vibration Off'];

  g.check_option('', eight*2, this.game.sound_setting);

  //game.vibration
  console.log(this.game.vibration);
  vib = (this.game.vibration === 1 ? 'Vibration On' : 'Vibration Off' );
  g.button(vib, eight*3, this.game.vibration = (this.game.vibration === 0 ? 1 : 0));

};

opti.update = function (){
  //console.log("your on opti");
};

module.exports = opti;
