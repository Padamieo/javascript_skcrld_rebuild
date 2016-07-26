module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: 'www',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../tests/**.*js',
            {pattern: '**/*.js'},
            {pattern: '**/*.wav', included: false, served: true},
            {pattern: '**/*.png', included: false, served: true},
            {pattern: '**/*.json', included: false, served: true}
        ],

        // list of files to exclude
        exclude: [
            //'config.js'
        ],

        proxies: {
          '/images/': '/base/images/',
          '/audio/': '/base/audio/',
          '/languages/': '/base/languages/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        //port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome']
        //browsers: ['ChromeCanary']


        // If browser does not capture in given timeout [ms], kill it
        //captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        //singleRun: false
    });
};
