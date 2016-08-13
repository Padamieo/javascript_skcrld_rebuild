'use strict';

describe('Test', function() {

  it('general.js', function () {
    expect(true).toEqual(true);
    // expect(game).toBeDefined();
    // expect(flag).toBe(false);
    var g = require('../src/js/partials/general.js');

    expect(g.enemy_colour(0)).toBe(0xf24e90);
    expect(g.enemy_colour(1)).toBe(0x4ef24e);

    expect( g.prependzero(1)).toBe('01');

    var i = [];
    i.length = 10;
    expect(g.calculate_button_width(i)).toBe(4);

    expect(g.min_50(49)).toBe(50);
    expect(g.min_50(51)).toBe(51);

    var Phaser = require('Phaser');

    // game = new Phaser.Game(
    //   100,
    //   100,
    //   Phaser.AUTO,
    //   'game'
    // );
    console.log(Phaser);
    // game.enemy_array = [0,0,0,0];
    //
    // v = g.choose(game);
    //console.log(v);


  });

  // var waitUntilState = function(state, callback) {
  //   setTimeout(function() {
  //     console.log("Waiting for state " + state);
  //     if( game.state.current !== state ) {
  //       waitUntilState(state, callback);
  //     } else {
  //       callback();
  //     }
  //   }, 300);
  // }
  //
  // // beforeEach(function() {
  // //   originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  // //   jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  // // });
  //
  // it("When game start it will create a Cat", function(done) {
  //   waitUntilState('menu', function() {
  //     console.log("Starting test");
  //     game.state.start('main');
  //
  //     waitUntilState('main', function() {
  //       expect(game.state.current).toBe("main");
  //       expect(game.kitty).toBeDefined();
  //       expect(game.rainbow).toBeDefined();
  //       //expect(game.kitty.key).toBe('cat');
  //       done();
  //     });
  //
  //   });
  // });
  //
  //
  // // afterEach(function() {
  // //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  // // });

});
