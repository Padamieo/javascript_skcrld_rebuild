var g = require('general');

var opti = {};

opti.create = function () {

  if(this.game.online){
    window.analytics.trackView('options');
  }

  var eight = (this.game.height/8);

  g.display_text(this.game.phaserJSON.options, eight*1);

  g.button(this.game.phaserJSON.back, eight*7, g.o_menu);

  //sound option
  g.check_option([this.game.phaserJSON.sound_off, this.game.phaserJSON.sound_on], eight*2, 'sound_setting');

  //vibration option
  g.check_option([this.game.phaserJSON.vibration_off, this.game.phaserJSON.vibration_on], eight*3, 'vibration');

  //tutorial option
  g.check_option([this.game.phaserJSON.tutorial_off, this.game.phaserJSON.tutorial_on], eight*4, 'tutorial');

  //fps display option
  //g.check_option(['Tutorial Off', 'Tutorial On'], eight*4, 'tutorial');

};

opti.update = function (){
  //console.log("your on opti");
};

module.exports = opti;
