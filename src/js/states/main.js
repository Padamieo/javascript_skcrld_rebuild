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
    }else{
      game.lives = localStorage.getItem("lives");
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

  // this currently causes weird invisible duplications
  // tick = this.game.time.create(false);
  // tick.loop(2000, updateTick, this.game, this.game);
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

  if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){
    //for testing purposes put code here
  }

  //generates co-ordinates of box around each bullet if one exists
  for (var i = 0, len = this.game.bulletPool.children.length; i < len; i++){
    if(this.game.bulletPool.children[i].alive){
      col.calculate_rotated_square(this.game.bulletPool.children[i]);
    }
  }

  //generates co-ordinates of box around each enemy while alive/exists
  for (var b = 0, ll = this.game.enemies.children.length; b < ll; b++){
    if(this.game.enemies.children[b].alive){
      col.calculate_rotated_square(this.game.enemies.children[b]);
    }
  }

  //performs heavy collision check for bullets and enemies
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

//every x seconds run this, currently causes weird invisible duplications need to resolve
function updateTick(game) {
  console.log('tick');
  if(game.enemies.countLiving() < game.max_enemy){
    nme = game.enemies.getFirstDead();
    if (nme === null) {
      nme = new enemy(game);
    }
    nme.revive();
    nme.x = game.rnd.integerInRange(0, game.width);
    nme.y = game.height;
  }
}

module.exports = main;
