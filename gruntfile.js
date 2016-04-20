var properties = require('./src/js/properties.js');

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-cache-bust');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-pngmin');

  var productionBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'build');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    properties: properties,
    project: {
      src: 'src/js',
      js: '<%= project.src %>/{,*/}*.js',
      dest: 'www/js',
      bundle: 'www/js/app.js',
      port: properties.port,
      banner:
        '/*\n' +
        ' * <%= properties.title %>\n' +
        ' * <%= pkg.description %>\n' +
        ' * @author <%= pkg.author %>\n' +
        ' * @version <%= pkg.version %>\n' +
        ' * @copyright <%= pkg.author %>\n' +
        ' */\n'
    },
    connect:{
      dev:{
        options:{
          port: '<%= project.port %>',
          base: './www'
        }
      }
    },
    jshint:{
      files:[ 'gruntfile.js', '<%= project.js %>'],
      options:{
        jshintrc: '.jshintrc'
      }
    },
    watch:{
      options:{
        livereload: productionBuild ? false : properties.liveReloadPort
      },
      js:{
        files: '<%= project.dest %>/**/*.js',
        tasks: ['jade']
        },
        jade:{
          files: 'src/templates/*.jade',
          tasks: ['jade']
        },
        stylus:{
          files: 'src/style/*.styl',
          tasks: ['stylus']
        },
        images:{
          files: 'src/images/**/*',
          tasks: ['copy:images']
        },
        audio:{
          files: 'src/audio/**/*',
          tasks: ['copy:audio']
        }
      },
      browserify:{
        app:{
          src: ['<%= project.src %>/app.js'],
          dest: '<%= project.bundle %>',
          options:{
            transform: ['browserify-shim'],
            watch: true,
            browserifyOptions:{
              debug: !productionBuild
            }
          }
        }
      },
      open:{
        server:{
          path: 'http://localhost:<%= project.port %>'
        }
      },
      cacheBust:{
        options:{
          assets: ['audio/**', 'images/**', 'js/**', 'style/**']
        , baseDir: './www/'
        , deleteOriginals: true
        , length: 5
        }
      , files: {
          src: ['./www/js/app.*', './www/index.html']
        }
      }

    , jade:
      { compile:
        { options:
          { data:
            { properties: properties
            , productionBuild: productionBuild
            }
          }
        , files:
          { 'www/index.html': ['src/templates/index.jade']
          }
        }
      }

    , stylus:
      { compile:
        { files:
          { 'www/style/index.css': ['src/style/index.styl'] }
        , options:
          { sourcemaps: !productionBuild
          }
        }
      }

    , clean: ['./www/']

    , pngmin:
      { options:
        { ext: '.png'
        , force: true
        }
      , compile:
        { files:
            [ { src: 'src/images/*.png'
              , dest: 'src/images/'
              }
            ]
          }
        },
      copy:{
        images:{
          files:[{
            expand: true,
            cwd: 'src/images/',
            src: ['**'],
            dest: 'www/images/'
          }]
        },
        audio:{
          files:[{
            expand: true,
            cwd: 'src/audio/',
            src: ['**'],
            dest: 'www/audio/'
          }]
        },
        languages:{
          files:[{
            expand: true,
            cwd: 'src/languages/',
            src: ['**'],
            dest: 'www/languages/'
          }]
        }
      },
      uglify:{
        options:{
          banner: '<%= project.banner %>'
        },
        dist:{
          files:{
            '<%= project.bundle %>' : '<%= project.bundle %>'
          }
        }
      }
    }
  );

  grunt.registerTask('default', [
    'clean',
    'browserify',
    'jade',
    'stylus',
    'copy:images',
    'copy:audio',
    'copy:languages',
    'connect',
    'open',
    'watch',
  ]);

  grunt.registerTask('build', [
    'clean',
    'browserify',
    'jade',
    'stylus',
    'uglify',
    'copy:images',
    'copy:audio',
    'copy:languages',
    'cacheBust'
  ]);

  grunt.registerTask('test',[
    'jshint'
  ]);

  grunt.registerTask('optimise', ['pngmin', 'copy:images']);
};
