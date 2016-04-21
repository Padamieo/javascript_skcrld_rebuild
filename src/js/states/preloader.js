var preloader = {};

preloader.preload = function () {

  this.load.spritesheet('rainbow_r', 'images/rainbow_r.png', 200, 500);
  this.load.spritesheet('rainbow', 'images/rainbow.png', 200, 500, 18);
  this.load.spritesheet('rainbow_e', 'images/rainbow_e.png', 200, 500);
  this.load.spritesheet('cat', 'images/placeholder_kitty.png', 200, 200);
  this.load.spritesheet('explosion', 'images/explosion.png', 256, 256);
  this.load.spritesheet('button', 'images/placeholder_button.png', 50, 50);

  this.game.load.image('enemy', 'images/placeholder.png', 20, 40);
  this.game.load.image('bullet', 'images/b.png', 20, 10);

  this.game.load.image('test', 'images/test.png');

  // need to select language pack
  this.game.load.json('language', 'languages/'+set_language+'.json');

};

preloader.create = function () {
  this.game.state.start('menu');
};

module.exports = preloader;
