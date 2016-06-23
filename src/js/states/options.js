var g = require('general');

var opti = {};

opti.create = function () {

  var eight = (this.game.height/8);


  g.display_text(this.game.phaserJSON.options, eight*1);

  g.button(this.game.phaserJSON.back, eight*7, g.o_menu);

  //sound option
  g.check_option(['Sound Off', 'Sound On'], eight*2, 'sound_setting');

  //vibration option
  g.check_option(['Vibration Off', 'Vibration On'], eight*3, 'vibration');

  //tutorial option
  g.check_option(['Tutorial Off', 'Tutorial On'], eight*4, 'tutorial');

  //fps display option
  //g.check_option(['Tutorial Off', 'Tutorial On'], eight*4, 'tutorial');

  // var myBitmap = game.add.bitmapData(100, 100);
  // var grd = myBitmap.context.createLinearGradient(0,0,0,600);
  // grd.addColorStop(0,"white");
  // grd.addColorStop(500/600,"#0a68b0");
  // grd.addColorStop(580/600,"#0a68b0");
  // grd.addColorStop(1,"black");
  // myBitmap.context.fillStyle = grd;
  // myBitmap.context.fillRect(0,0,800,600);
  // game.add.sprite(0, 0, myBitmap);

};

opti.update = function (){
  //console.log("your on opti");
};

module.exports = opti;
