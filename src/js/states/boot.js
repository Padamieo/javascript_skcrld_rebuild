var Stats = require('Stats'),
  properties = require('../properties'),
  boot = {};

boot.create = function () {

  if (properties.showStats) {
    addStats(this.game);
  }

  this.game.sound.mute = properties.mute;

  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  // this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  // this.scale.pageAlignHorizontally = true;
  // this.scale.pageAlignVertically = true;

  this.game.state.start('preloader');
};

function addStats(game) {
  var stats = new Stats();

  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);

  // In order to correctly monitor FPS, we have to make calls to the stats package before and after phaser's update.
  var oldUpdate = game.update;
  game.update = function() {
    stats.begin();
    oldUpdate.apply(game, arguments);
    stats.end();
  };
}

module.exports = boot;
