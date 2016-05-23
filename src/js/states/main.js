var Rainbow = require('rainbow');
var Cat = require('cat');
var Player = require('player');
var col = require('col');
var Enemy = require('enemy');
var g = require('general');

var main = {};

main.create = function () {

  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  // this.game.physics.arcade.gravity.y = 0;

  // The scrolling background background
  background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
  background.max_speed = 2;
  background.speed = 0;

  g.setup(this.game);

	//bullet pool
	this.game.bulletPool = this.game.add.group();
	this.game.bulletPool.enableBody = true;
	this.game.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
	this.game.bulletPool.createMultiple(10 , 'bullet');
	this.game.bulletPool.setAll('anchor.x', 0.5);
	this.game.bulletPool.setAll('anchor.y', 0.5);
	this.game.bulletPool.setAll('outOfBoundsKill', true);
	this.game.bulletPool.setAll('checkWorldBounds', true);
  for (var i = 0; i < this.game.bulletPool.children.length; ++i) {
    this.game.bulletPool.children[i].events.onOutOfBounds.add( g.missed_shot );
  }

  this.game.kitty = this.add.existing(new Cat(this.game));

  this.add.existing(new Rainbow(this.game));

  this.game.player = this.add.existing(new Player(this.game));

  // this.game.enemies = this.game.add.group();
  this.game.enemies = new Phaser.Group(this.game);


  this.game.max_enemy = 1;
  this.game.speed_ramp = 0.7;
  this.game.tick_count = 0;
  this.game.enemies_passed = 0;
  //this.game.historic_accuracy = 0;
  this.game.amount_heatseekers = 0;

  this.game.tick = this.game.time.create(false);
  this.game.tick.loop(2000, updateTick, this.game, this.game);
  this.game.tick.start();

  text_score = this.game.add.text(this.game.width-(this.game.width/15), this.game.height/15, this.game.score, {
    font: '30px Arial',
    fill: '#ffffff',
    align: 'left'
  });
  text_score.stroke = "#de77ae";
  text_score.strokeThickness = 5;
  text_score.anchor.setTo(0.5, 0.5);

  this.game.enemy_array = new Array(20).fill(0);
  i = game.rnd.integerInRange(0, 19);
  this.game.enemy_array[i] = 1;
  //console.log(this.game.enemy_array);

};

main.update = function(){

  if(this.game.kitty.fall === false){
    if(this.game.player.lazers === true){
      if(background.speed < background.max_speed){
        background.speed += 0.1;
      }
      background.tilePosition.y += background.speed;
    }else{
      if(background.speed > -0.1){
        background.speed -= 0.1;
      }
      background.tilePosition.y += background.speed;
    }
  }else{
    if(background.speed > -0.1){
      background.speed -= 0.1;
    }
    background.tilePosition.y += background.speed;
  }

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
            this.game.score = this.game.score + 1;
            this.game.kills = this.game.kills + 1;
            //console.log(this.game.score);
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

  //once kitty is dead compare this games score with highscore
  if(this.game.kitty.dead === true ){
    if(localStorage !== undefined){
      if(this.game.score > this.game.highscore){
        localStorage.setItem('highscore', this.game.score );
      }
    }
    this.game.state.start('menu');
  }

};

//every x seconds run this, currently causes weird invisible duplications need to resolve
function updateTick(game) {

  game.tick_count++;

  // increase the amount of possible enemies on screen slowly based on kills - this is our natural difficulty increase
  if(game.max_enemy <= 9){
    enemy_add = Phaser.Math.roundTo(game.kills/5);
    if(enemy_add > 0){
      if(game.max_enemy != enemy_add){
        game.max_enemy = enemy_add;
      }
    }
  }
  console.log(game.max_enemy);

  heatseekers = Phaser.Math.roundTo(game.kills/20);
  //console.log(game.amount_heatseekers+"="+heatseekers);
  if(game.amount_heatseekers != heatseekers){
    game.amount_heatseekers = heatseekers;

    v = game.enemy_array.indexOf(0);
    if(v < 0){
      //this means we are out of 1 to add in our array
    }else{
      game.enemy_array[v] = 1;
      //console.log(game.enemy_array);
    }

  }



  //this determines if a player is doing well and increase difficulty
  //console.log(game.speed_ramp+"# "+Phaser.Math.roundTo((game.tick_count+game.enemies_passed)*game.speed_ramp,0)+"+"+game.enemies_passed+" - "+game.score);
  //console.log(game.tick_count);
  if(Phaser.Math.roundTo((game.tick_count+game.enemies_passed)*game.speed_ramp,0) < game.score){
    console.log("high performance player");

    //changes the difficulty of triggering this
    ramp = Phaser.Math.roundTo(game.speed_ramp+0.05,-3);
    game.speed_ramp = (ramp <= 0.95 ? ramp : 0.95 );

    // calculates player accuracy over the game
    total = game.kills+game.misses;
    a = Phaser.Math.roundTo(game.kills/total, -2);
    //console.log(a);

    // if(a > 0.50){
    //
    //   if(game.historic_accuracy === 0){
    //     game.historic_accuracy = a;
    //   }
    //
    //   console.log("accurate player"+game.historic_accuracy);
    //
    //   if(game.historic_accuracy < a){
    //     console.log("getting more accurate");
    //     i = game.rnd.integerInRange(0, 19);
    //     game.enemy_array[i] = 1;
    //     console.log(game.enemy_array);
    //     game.historic_accuracy = a;
    //   }
    //
    // }else{
    //   console.log("might not be good to speed up");
    // }

    //looks at current spawn speed and increses it
    current = game.tick.events[0].delay;
    new_speed = Phaser.Math.roundTo(current*0.95, 0);
    console.log(new_speed);

    game.tick.events[0].delay = (new_speed >= 200 ? new_speed : 200 );

  }

  //spawns an enemy
  if(game.enemies.countLiving() < game.max_enemy){
    var nme = game.enemies.getFirstDead();
    if (nme === null) {
      nme = new Enemy(game);
    }
    nme.revive();
  }

}

module.exports = main;
