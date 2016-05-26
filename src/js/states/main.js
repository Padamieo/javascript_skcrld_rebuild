var Rainbow = require('rainbow');
var Cat = require('cat');
var Player = require('player');
var c = require('collision');
var Enemy = require('enemy');
var g = require('general');
var indicator = require('indicator');

var main = {};

main.create = function () {

  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  // this.game.physics.arcade.gravity.y = 0;

  // The scrolling background background
  background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
  background.max_speed = 2;
  background.speed = 0;

  //g.setup(this.game);

  // Create a white rectangle that we'll use to represent the flash
  game.flash = game.add.graphics(0, 0);
  game.flash.beginFill(0xffffff, 1);
  game.flash.drawRect(0, 0, game.width, game.height);
  game.flash.endFill();
  game.flash.alpha = 0;

  game.world.setBounds(-10, -10, game.width + 20, game.height + 20);
  //this may be the key to sorting screen size with clickable areas

  //setup emitter for burst
  game.emitter = game.add.emitter(0, 0, 100);
  game.emitter.makeParticles('test');
  game.emitter.gravity = 200;

  if(this.game.tutorial === 1){

    //var phaserJSON = game.cache.getJSON('language');

    this.game.ground = game.add.sprite(this.game.world.centerX, this.game.world.centerY+75, 'ground'); //also need way to calculate his 75
    this.game.ground.anchor.setTo(0.5, 0);
    // this.game.ground.width = this.game.width;
    // this.game.ground.height = 300; //need find way to calcuate this

    var style = { font: 'bold 60pt Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: this.game.width };
    this.game.tutorial_text = this.game.add.text(this.game.world.centerX, this.game.height, 'PRESS OF HOLD', style);
    this.game.tutorial_text.anchor.setTo(0.5, 1);

    this.game.indicator = this.add.existing(new indicator(this.game));

    this.game.background_action = false;

  }else{
    this.game.background_action = true;
    this.game.tick.start();
  }

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

  this.game.rainbow = this.add.existing(new Rainbow(this.game));

  // this.game.enemies = this.game.add.group();
  this.game.enemies = new Phaser.Group(this.game);

  this.game.enemy_array = new Array(20).fill(0);
  i = game.rnd.integerInRange(0, 19);
  this.game.enemy_array[i] = 1;
  //console.log(this.game.enemy_array);

  this.game.player = this.add.existing(new Player(this.game));

  this.game.max_enemy = 1;
  this.game.speed_ramp = 0.7;
  this.game.tick_count = 0;
  this.game.enemies_passed = 0;
  //this.game.historic_accuracy = 0;
  this.game.amount_heatseekers = 0;
  game.score = 0;
  game.kills = 0;
  game.misses = 0;

  this.game.tick = this.game.time.create(false);
  this.game.tick.loop(2000, updateTick, this.game, this.game);

  //create explotion animations as group to be called, need to add scale
  game.explosion = game.add.group();
  game.explosion.createMultiple(100, 'explosion');
  game.explosion.setAll('anchor.x', 0.5);
  game.explosion.setAll('anchor.y', 0.5);
  game.explosion.setAll('killOnComplete',true);
  game.explosion.callAll('animations.add', 'animations', 'boom', [0, 1, 3], 30, false);
  //http://www.html5gamedevs.com/topic/4384-callback-when-animation-complete/

  text_score = this.game.add.text(this.game.width-(this.game.width/15), this.game.height/15, this.game.score, {
    font: '30px Arial',
    fill: '#ffffff',
    align: 'left'
  });
  text_score.stroke = "#de77ae";
  text_score.strokeThickness = 5;
  text_score.anchor.setTo(0.5, 0.5);

};

main.update = function(){
  //console.log(game.tutorial);

  if(game.tutorial === 1){

      if(game.player.lazers === true){
        game.tutorial_text.setText('NOW');
        game.background_action = true;
        game.tick.start();
      }

    if(game.background_action === true){
      if(this.game.kills >= 1){

        this.game.indicator.kill();
        this.game.indicator._text.kill();

        if(localStorage !== undefined){
          localStorage.setItem("tutorial",  0 );
        }
        game.tutorial_text.setText('YAY');
      }

      if(game.ground.y > game.height){
        if(this.game.kills >= 1){
          game.tutorial = 0;
        }
      }else{
        game.ground.y = game.ground.y+background.speed;
      }

    }

  }

  if(game.background_action === true){
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
  }

  //generates co-ordinates of box around each bullet if one exists
  for (var i1 = 0, l1 = this.game.bulletPool.children.length; i1 < l1; i1++){
    if(this.game.bulletPool.children[i1].alive){
      //console.log(i1);
      c.alculate_rotated_square(this.game.bulletPool.children[i1]);

    }
  }

  //generates co-ordinates of box around each enemy while alive/exists
  for (var i2 = 0, l2 = this.game.enemies.children.length; i2 < l2; i2++){
    if(this.game.enemies.children[i2].alive){

      c.alculate_rotated_square(this.game.enemies.children[i2]);

    }
  }

  //performs heavy collision check for bullets and enemies
  for (var i3 = 0, l3 = this.game.bulletPool.children.length; i3 < l3; i3++){
    if(this.game.bulletPool.children[i3].alive){

      for (var i4 = 0, l4 = this.game.enemies.children.length; i4 < l4; i4++){
        if(this.game.enemies.children[i4].alive){

          var c_bullet_enemies = c.ollision_square_square(this.game.enemies.children[i4], this.game.bulletPool.children[i3]);
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

      var c_kitty_enemies = c.ollision_circle_square( this.game.kitty , this.game.enemies.children[i5] );
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
  //console.log(game.max_enemy);

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
    //console.log("high performance player");

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
    //console.log(new_speed);

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
