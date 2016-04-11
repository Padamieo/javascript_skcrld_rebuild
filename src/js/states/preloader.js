var preloader = {};

preloader.preload = function () {
  this.game.load.image('logo', 'images/phaser.png');
  this.load.spritesheet('rainbow_r', 'images/rainbow_r.png', 200, 500);
  this.load.spritesheet('rainbow', 'images/rainbow.png', 200, 500, 18);
  this.load.spritesheet('rainbow_e', 'images/rainbow_e.png', 200, 500);
  this.game.load.image('cat', 'images/placeholder.png', 20, 40);
};

preloader.create = function () {
  this.game.state.start('main');
};

module.exports = preloader;
