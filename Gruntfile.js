module.exports = grunt => {
  grunt.initConfig({
    // pug task
    pug: {
      compile: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: [{
          src: '*.pug',
          cwd: 'src/pug/',
          dest: 'dist',
          expand: true,
          ext: '.html'
        }]
      }
    },

    // sass task
    sass: {
      dist: {
        options: {
          style: 'inline'
        },
        files: [{
          src: 'style.sass',
          cwd: 'src/sass/',
          dest: 'dist/css',
          expand: true,
          ext: '.css'
        }]
      }
    },

    // js babel transpiler
    babel: {
      dist: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },

    // copy task (copy src/libraries to dist/libraries)
    copy: {
      main: {
        expand: true,
        cwd: 'src',
        src: ['libraries/**'],
        dest: 'dist/'
      },
      fonts: {
        expand: true,
        cwd: 'src',
        src: ['fonts/**'],
        dest: 'dist/'
      },
      public: {
        expand: true,
        cwd: 'src',
        src: ['*.*'],
        dest: 'dist/'
      }
    },

    // image compress task (compress all image src/images to dist/images)
    imagemin : {
      dynamic: {
          files: [{
              expand: true,
              cwd: 'src/',
              src: ['images/**/*.{png,jpg,gif}'],
              dest: 'dist'
          }]
      }
    },

    // minify css
    cssmin: {
      target: {
        files: [{
          expand: true, 
          cwd: 'dist/css',
          src: ['*.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    // auto refresh view on change in dist directory
    browserSync: {
      dev: {
        bsFiles: {
            src : [
                'dist/**.*'
            ]
        },
        options: {
            watchTask: true,
            server: './dist'
        }
      }
    },

    // watch change inside directory to run task
    watch: {
      pug: {
        files: ['src/pug/**'],
        tasks: ['pug']
      },
      sass: {
        files: ['src/sass/**', 'src/css/**'],
        tasks: ['sass']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['babel']
      },
      copy: {
        files: ['src/libraries/**', 'fonts/*.*', '*.*'],
        tasks: ['copy']
      },
      imagemin: {
        files: ['src/images/**'],
        tasks: ['imagemin']
      }
    }
  });

  // initial
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-cssmin')

  //register default task
  if(process.env.NODE_ENV == 'production')
    grunt.registerTask('default', ['pug', 'sass', 'babel', 'copy', 'imagemin', 'cssmin'])
  else
    grunt.registerTask('default', ['pug', 'sass', 'babel', 'copy', 'imagemin', 'browserSync', 'watch'])
};

