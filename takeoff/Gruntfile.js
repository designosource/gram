module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    target: grunt.option('target') || '../public',


    //JAVASCRIPT TASKS
    uglify: {
      main: {
        files: {
          '<%= target %>/js/main.min.js': 'build/js/main.js'
        }
      },
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      target: ['js/main.js', 'js/components/*.js']
    },

    concat: {
      main: {
          src: [
              'js/libs/*.js',
              'build/js/components/*.js',
              'js/main.js',
              '!js/**/_*.js'  //  Exclude files that start with an underscore
          ],
          dest: 'build/js/main.js'
      },
    },  

    //CSS TASKS
    sass: {
      dist: {
          options: {
            style: 'expanded'
          },
          files: {
            'build/css/main.css': 'sass/main.scss'
          }
      }
    },

    postcss: {
      options: {
          processors: [
            require('autoprefixer')({
              browsers: ['last 3 versions']
            })
            ]
          },
      dist: {
          src: 'build/css/*.css'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= target %>/css/',
        ext: '.min.css'
      }
    },

    //IMAGES TASKS   
    responsive_images: {
      dev: {
        options: {
          sizes: [{
            width: 420,
            name: 'sml'
          }, {
            width: 820,
            name: 'lrg'
          }]
        },
        files: [{
          expand: true,
          cwd: 'img/responsive',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/img/responsive'
        }]
      }
    },

    imagemin: {
        dynamic: {
          options: {
            pngquant: true,
            force: true
          },
          files: [{
            expand: true,
            cwd: 'img/',
            src: ['**/*.{png,jpg,gif,ico}'],
            dest: 'build/img/'
          }]
        }
    },

    //  GENERAL TASKS
    clean: {
      img: {
        src: ['build/img', '<%= target %>/img']
      },
      fonts: {
        src: ['build/fonts', '<%= target %>/fonts']
      },
      options: {
        'force': true
      }
    },

    copy: {
      images: {
        cwd: 'build/img/',
        src: '**/*.*',
        expand: true,
        dest: '<%= target %>/img',
        filter: 'isFile'
      },
      html: {
        cwd: 'html',
        src: '**/*.*',
        expand: true,
        dest: '<%= target %>/static/',
        filter: 'isFile'
      }
    },

    notify: {
      css: {
        options: {
          title: '✓ Task complete!',
          message: 'CSS'
        }
      },
      js: {
        options: {
          title: '✓ Task complete!',
          message: 'Javascript'
        }
      },
      img: {
        options: {
          title: '✓ Task complete!',
          message: 'Images'
        }
      },
    },

    watch: {
      options: {
        livereload: false
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['js', 'notify:js'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['css', 'notify:css'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['img/**/*.{png,jpg,gif,ico,svg}'],
        tasks: ['img', 'notify:img']
      },
      html: {
        files: ['html/**/*.html'],
        tasks: ['copy:html']
      }
    }

  });


    //  PLUGINS
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    //  COMBINED TASKS
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('img', ['clean:img', 'responsive_images', 'imagemin', 'copy:images']);
    grunt.registerTask('css', ['sass', 'postcss', 'cssmin']);
    grunt.registerTask('build', ['css', 'js', 'img']);

  };