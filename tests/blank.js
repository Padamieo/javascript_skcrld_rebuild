'use strict';

describe('Test', function() {

  it('works', function () {
    //expect(true).toEqual(true);
    // game.state.start('main');
    // expect(game).toBeDefined();

    // var flag = false;
    // window.setTimeout(slowAlert, 2000);
    // // var timer = new Timer(1000);
    // // timer.handler = function () { flag = true };
    // function slowAlert() {
    //   flag = true;
    // }
    //
    // expect(flag).toBe(false);
    //
    // console.log("a"+flag);
    //
    // waitsFor( function() {
    //   if(flag) {
    //     console.log("B"+flag);
    //   }
    //   return flag;
    // }, "timer ran", 750);
    //
    // runs( function() {
    //   expect(flag).toBe(true);
    // });
  });

  // var value;
  //
  // beforeEach(function(done) {
  //   setTimeout(function() {
  //     value = 0;
  //     done();
  //   }, 1);
  // });
  //
  // it("should support async execution of test preparation and expectations", function(done) {
  //   console.log(game.state.current);
  //   //expect(value).toBeGreaterThan(0);
  //
  //   expect(game.state.current).toBe('menu');
  //
  //   done();
  // });

  //var originalTimeout;

  var waitUntilState = function(state, callback) {
    setTimeout(function() {
      console.log("Waiting for state " + state);
      if( game.state.current !== state ) {
        waitUntilState(state, callback);
      } else {
        callback();
      }
    }, 300);
  }

  // beforeEach(function() {
  //   originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  //   jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  // });

  it("When game start it will create a Cat", function(done) {
    waitUntilState('menu', function() {
      console.log("Starting test");
      game.state.start('main');

      waitUntilState('main', function() {
        expect(game.state.current).toBe("main");
        expect(game.kitty).toBeDefined();
        expect(game.rainbow).toBeDefined();
        //expect(game.kitty.key).toBe('cat');
        done();
      });

    });
  });



  // afterEach(function() {
  //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  // });

});
