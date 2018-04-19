var g = require('general');
var preloader = {};

preloader.preload = function () {

  //images
  this.load.spritesheet('rainbow_r', 'images/rainbow_r.png', 200, 500);
  this.load.spritesheet('rainbow', 'images/rainbow.png', 200, 500, 18);
  this.load.spritesheet('rainbow_e', 'images/rainbow_e.png', 200, 500);

  this.load.spritesheet('cat', 'images/placeholder_kitty.png', 200, 200);
  this.load.spritesheet('explosion', 'images/explosion.png', 256, 256);
  this.load.spritesheet('button', 'images/placeholder_button.png', 50, 50);

  this.load.spritesheet('enemy', 'images/testsmall.png', 25, 47);
  this.game.load.image('trail', 'images/trail.png');

  this.game.load.image('bullet', 'images/b.png', 20, 10);

  this.game.load.image('test', 'images/test.png');

  this.game.load.image('ground', 'images/placeholder.png');

  this.game.load.image('background', 'images/background_wall_temp.png');

  //set as language from setting
  if(localStorage != undefined){
    if(localStorage.getItem('language') != null){
      ui.set_language = localStorage.getItem('language');
    }
  }
  this.game.load.json('language', 'languages/'+ui.set_language+'.json');

  //sounds
  this.game.load.audio('testSound', 'audio/meow.wav');
  this.game.load.audio('meow', 'audio/meow2.wav');
  this.game.load.audio('press', 'audio/Percussive Elements-04.wav');

};

preloader.create = function () {
  this.game.phaserJSON = this.game.cache.getJSON('language');
  this.game.state.start('main');
};

module.exports = preloader;
