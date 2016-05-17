var g = require('general');

var opti = {};

function go_menu(){
  this.game.state.start('menu');
  //window.analytics.trackEvent('opti', 'opti', 'Hits', 1);
}

opti.create = function () {

  var phaserJSON = this.game.cache.getJSON('language');

  var eight = (this.game.height/8);

  var back = this.game.add.button(this.game.world.centerX, eight*6, 'button', go_menu, this, 1, 0, 2);
  s1 = phaserJSON.back.length/2;
  back.scale.x = s1;
  back.anchor.setTo(0.5, 0.5);

  var text_opt = this.game.add.text(this.game.world.centerX, eight*6, phaserJSON.back, {
    font: '30px Arial',
    fill: '#ffffff',
    align: 'center'
  });
  text_opt.anchor.setTo(0.5, 0.5);

  // var lang = this.game.add.text(this.game.world.centerX, eight*7, set_language, {
  //   font: '15px Arial',
  //   fill: '#ff0044',
  //   align: 'center'
  // });
  // lang.anchor.setTo(0.5, 0.5);

};

opti.update = function (){
  //console.log("your on opti");
};

module.exports = opti;
