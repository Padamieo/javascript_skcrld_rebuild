var properties = require('./src/js/properties.js');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

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

      // jade:{
      //   files: 'src/templates/*.jade',
      //   tasks: ['jade']
      // },

      // stylus:{
      //   files: 'src/style/*.styl',
      //   tasks: ['stylus']
      // },

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
        assets: ['audio/**', 'images/**', 'js/**', 'style/**'],
        baseDir: './www/',
        deleteOriginals: true,
        length: 5
      },
      files: {
        src: ['./www/js/app.*', './www/index.html']
      }
    },

    // jade: {
    //   compile: {
    //     options: {
    //       data: {
    //         properties: properties,
    //         productionBuild: productionBuild
    //         }
    //     },
    //     files: {
    //       'www/index.html': ['src/templates/index.jade']
    //     }
    //   }
    // },

    // stylus: {
    //   compile:{
    //     files:{
    //       'www/style/index.css': ['src/style/index.styl']
    //     },
    //     options:{
    //       sourcemaps: !productionBuild
    //     }
    //   }
    // },

    clean: ['./www/'],
    pngmin: {
      options: {
        ext: '.png',
        force: true
      },
      compile: {
        files:[ {
          src: 'www/images/*.png',
          dest: 'www/images/'
        }]
      }
    },
    copy:{

      html:{
        files:[{
          cwd: 'src/',
          src: ['**', '!**/js/*.js', '!**/*.{jpg,png,hbs,less,json,wav,js}'],
          dest: 'www/',
          nonull: false,
          expand: true,
          flatten: false,
          filter: 'isFile'
        },]
      },

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
    },

    less: {
			live: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: 'style.css.map',
					sourceMapFilename: 'www/css/style.css.map'
				},
				src: 'src/less/style.less',
				dest: 'www/css/style.css'
			}
		},

    run: {
      options: {
        wait: true,
        cwd: 'bower_components/phaser-official',
      },
      setup: {
        exec: "npm install"
      },
      build_custom_phaser: {
        exec: "grunt custom --exclude \"gamepad,p2,creature,rope,video,ninja,retrofont,net\""
      },
      build_arcade_phaser: {
        exec: "grunt custom --exclude \"p2,ninja\""
      }
    }
  });

  grunt.registerTask('custom_phaser', function(n){
    if(n == null){
      if (!grunt.file.exists('bower_components/phaser-official/dist/phaser.js')) {
        grunt.task.run(['phaser']);
      }
    }else{
      grunt.task.run(['phaser']);
    }
  });

  grunt.registerTask('phaser', function(n){
    buildtype = (n == null ? 'build_custom_phaser' : 'build_arcade_phaser' );
    grunt.task.run([ 'run:setup', 'run:'+buildtype ]);
  });

  grunt.registerTask('default', [
    'custom_phaser',
    'clean',
    'browserify',
    'copy:html',
    'less',
    // 'jade',
    // 'stylus',
    'copy:images',
    'copy:audio',
    'copy:languages',
    'serve'
  ]);

  grunt.registerTask('build', [
    'custom_phaser',
    'clean',
    'browserify',
    'copy:html',
    'less',
    // 'jade',
    // 'stylus',
    'uglify',
    'copy:images',
    'copy:audio',
    'copy:languages',
    'cacheBust'
  ]);

  grunt.registerTask('test',[
    'jshint'
  ]);

  grunt.registerTask('serve',[
    'connect',
    'open',
    'watch'
  ]);

  grunt.registerTask('optimise', [
    'pngmin'
  ]);

};
