var rainbow = require('rainbow');
var cat = require('cat');
var player = require('player');
var col = require('col');
var enemy = require('enemy');
var g = require('general');

var main = {}

function store(game){
  if(localStorage != undefined){
    console.log("Local Storage is supported");

    if(localStorage.getItem("lives") === null){
      localStorage.setItem("lives", 9 );
      game.lives = 9;
    }

    //localStorage.removeItem("Website");

  }else{
    console.log("No support");
  }
}

function delete_store(){
  if(localStorage != undefined){
    localStorage.clear();
  }
}

main.create = function () {

  store(this.game);

  g.setup(this.game);

  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  // this.game.physics.arcade.gravity.y = 0;


	//bullet pool could be individual
	this.game.bulletPool = this.game.add.group();
	this.game.bulletPool.enableBody = true;
	this.game.bulletPool.physicsBodyType = Phaser.Physics.ARCADE
	this.game.bulletPool.createMultiple(50 , 'bullet');
	this.game.bulletPool.setAll('anchor.x', 0.5);
	this.game.bulletPool.setAll('anchor.y', 0.5);
	this.game.bulletPool.setAll('outOfBoundsKill', true);
	this.game.bulletPool.setAll('checkWorldBounds', true);



  this.game.kitty = this.add.existing(new cat(this.game));
  // col.calculate_rotated_square(cat);
  // this.char = this.add.group();
  // var kitty = this.char.getFirstDead();
  // if (kitty === null) {
  //   kitty = new cat(this.game);
  // }

  rainbow = this.add.existing(new rainbow(this.game));

  p = this.add.existing(new player(this.game));

  // this.game.enemies = this.game.add.group();
  this.game.enemies = new Phaser.Group(this.game);

  //this.game.enemies.create(200, 240, 'cat');

// tick = game.time.create(false);
// tick.loop(2000, updateTick, this, 'level');
// tick.start();

  this.game.max_enemy = 10;

};

main.update = function (){

  if(this.game.enemies.countLiving() < this.game.max_enemy){
    nme = this.game.enemies.getFirstDead();
    if (nme === null) {
      nme = new enemy(this.game);
    }
    nme.revive();
    nme.x = this.game.rnd.integerInRange(0, this.game.width);
    nme.y = this.game.height;
  }

  //col.isionCheck(cat, one);

  if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){
    // num = this.game.enemies.countLiving();
    // r = this.game.rnd.integerInRange(0, num);
    // e = this.game.enemies.getAt(r);
    // e.kill();
  }

  for (var i = 0, len = this.game.bulletPool.children.length; i < len; i++){
    if(this.game.bulletPool.children[i].alive){
      col.calculate_rotated_square(this.game.bulletPool.children[i]);
    }
  }

  for (var b = 0, ll = this.game.enemies.children.length; b < ll; b++){
    if(this.game.enemies.children[b].alive){
      col.calculate_rotated_square(this.game.enemies.children[b]);
    }
  }

  for (var i = 0, len = this.game.bulletPool.children.length; i < len; i++){
    if(this.game.bulletPool.children[i].alive){
      for (var b = 0, ll = this.game.enemies.children.length; b < ll; b++){
        value = col.isionCheck(this.game.enemies.children[b], this.game.bulletPool.children[i]);
        if(value){
          console.log("hit");
          this.game.enemies.children[b].kill();
          this.game.bulletPool.children[i].kill();
        }
      }
    }
  }



  //need to perform some lives calculations
  if(this.game.kitty.dead === true ){
    this.game.state.start('menu');
  }

};

module.exports = main;
