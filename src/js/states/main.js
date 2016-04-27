var Rainbow = require('rainbow');
var Cat = require('cat');
var Player = require('player');
var col = require('col');
var Enemy = require('enemy');
var g = require('general');

var main = {};

main.create = function () {

  g.setup(this.game);

  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  // this.game.physics.arcade.gravity.y = 0;

	//bullet pool could be individual
	this.game.bulletPool = this.game.add.group();
	this.game.bulletPool.enableBody = true;
	this.game.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.game.bulletPool.createMultiple(50 , 'bullet');
	this.game.bulletPool.setAll('anchor.x', 0.5);
	this.game.bulletPool.setAll('anchor.y', 0.5);
	this.game.bulletPool.setAll('outOfBoundsKill', true);
	this.game.bulletPool.setAll('checkWorldBounds', true);


  this.game.kitty = this.add.existing(new Cat(this.game));
  // col.culate_rotated_square(cat);
  // this.char = this.add.group();
  // var kitty = this.char.getFirstDead();
  // if (kitty === null) {
  //   kitty = new cat(this.game);
  // }

  this.add.existing(new Rainbow(this.game));

  p = this.add.existing(new Player(this.game));

  // this.game.enemies = this.game.add.group();
  this.game.enemies = new Phaser.Group(this.game);

  //this currently causes weird invisible duplications
  var tick = this.game.time.create(false);
  tick.loop(2000, updateTick, this.game, this.game);
  tick.start();

  this.game.max_enemy = 5;

  text_score = this.game.add.text(this.game.width/15, this.game.height/15, this.game.score, {
    font: '30px Arial',
    fill: '#ffffff',
    align: 'left'
  });
  text_score.stroke = "#de77ae";
  text_score.strokeThickness = 5;
  text_score.anchor.setTo(0.5, 0.5);

};

main.update = function(){

  if(this.game.input.keyboard.isDown(Phaser.Keyboard.Z)){
    //for testing purposes put code here
    localStorage.setItem('lives', 9 );
    this.game.lives = 9;
  }

  //generates co-ordinates of box around each bullet if one exists
  for (var i1 = 0, l1 = this.game.bulletPool.children.length; i1 < l1; i1++){
    if(this.game.bulletPool.children[i1].alive){
      col.culate_rotated_square(this.game.bulletPool.children[i1]);
    }
  }

  //generates co-ordinates of box around each enemy while alive/exists
  for (var i2 = 0, l2 = this.game.enemies.children.length; i2 < l2; i2++){
    if(this.game.enemies.children[i2].alive){
      col.culate_rotated_square(this.game.enemies.children[i2]);
    }
  }

  //performs heavy collision check for bullets and enemies
  for (var i3 = 0, l3 = this.game.bulletPool.children.length; i3 < l3; i3++){
    if(this.game.bulletPool.children[i3].alive){
      for (var i4 = 0, l4 = this.game.enemies.children.length; i4 < l4; i4++){
        if(this.game.enemies.children[i4].alive){
          var c_bullet_enemies = col.ision_square_square(this.game.enemies.children[i4], this.game.bulletPool.children[i3]);
          if(c_bullet_enemies){
            this.game.enemies.children[i4].kill();
            this.game.bulletPool.children[i3].kill();
            this.game.score = this.game.score  + 1;
            console.log(this.game.score);
            text_score.setText(this.game.score);
          }
        }
      }
    }
  }

  for (var i5  = 0, l5 = this.game.enemies.children.length; i5 < l5; i5++){
    if(this.game.enemies.children[i5].alive){
      var c_kitty_enemies = col.ision_circle_square( this.game.kitty , this.game.enemies.children[i5] );
      if(c_kitty_enemies){
        this.game.enemies.children[i5].kill();
        //this.game.bulletPool.children[i].kill();
        this.game.kitty.fall = true;
        //console.log("hit");
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

  if(game.enemies.countLiving() < game.max_enemy){
    var nme = game.enemies.getFirstDead();
    if (nme === null) {
      nme = new Enemy(game);
    }
    nme.revive();
    nme.x = game.rnd.integerInRange(0, game.width);
    nme.y = game.height;
  }
  // console.log('spawn'+game.enemies.countLiving());
}

module.exports = main;
