// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  
  grunt.config.set('dom_munger.src', ['.tmp/**/*.html']);
  grunt.config.set('dom_munger.prefix', 'https://127.0.0.1:9000/');
  grunt.config.set('dom_munger.suffix', '');
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {<% if (coffee) { %>
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:test', 'karma']
      },<% } else { %>
      js: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },<% } %><% if (compass) { %>
      compass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },<% } else { %>
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },<% } %>
      gruntfile: {
        files: ['Gruntfile.js']
      },
      html: {
        files: ['<%%= yeoman.app %>/views/{,*/}*.html'],
        tasks: ['ngtemplates:dev']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',<% if (coffee) { %>
          '.tmp/scripts/{,*/}*.js',<% } %>
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        protocol:'https',
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js'<% if (!coffee) { %>,
        '<%%= yeoman.app %>/scripts/{,*/}*.js'<% } %>
      ]<% if (!coffee) { %>,
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }<% } %>
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true, 
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      prod: {
        options: {force:true},
        files: [{
          dot: true, 
          src: [
            '.tmp',
            '<%= staticResourceFullPathProd %>/*',
            '!<%= staticResourceFullPathProd %>/.git*'
          ]
        }]
      },      
      dev: {
        options: {force:true},
        files: [{
          dot: true,
            src: [
              '.tmp',
              '<%%= yeoman.app %>/.tmp',
              '<%= staticResourceFullPathDev %>/*',
              '!<%= staticResourceFullPathDev %>/.git*'
            ]
        }
        ]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        // cwd: '<%%= yeoman.app %>',
        src: ['<%%= yeoman.app %>/component.html', '<%%= yeoman.app %>/page.html'],
        ignorePath: '<%%= yeoman.app %>'
      }
    },

<% if (coffee) { %>
    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },<% } %>

<% if (compass) { %>
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%%= yeoman.app %>/images',
        javascriptsDir: '<%%= yeoman.app %>/scripts',
        fontsDir: '<%%= yeoman.app %>/styles/fonts',
        importPath: '<%%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },<% } %>

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      dist: ['<%%= yeoman.app %>/page.html', '<%%= yeoman.app %>/component.html'],
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeComments:true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html']
      }
    },
    vulcanize: {
      indexHtml: {
        options: {},
        files: {
          '.tmp/page.html': '.tmp/page.html'
        }
      }
    },
    targethtml: {
      vflocal: {
        files: [
          { '.tmp/page-vf.html': '.tmp/page.html'},
          { '.tmp/component-vf.html': '.tmp/component.html'}
        ]
      },
      vf: {
        files: [
          { '.tmp/page-vf.html': '.tmp/page.html'},
          { '.tmp/component-vf.html': '.tmp/component.html'}
        ]
      },      
      novf: {
        files: [
          { '.tmp/page.html': '.tmp/page.html'},
          { '.tmp/component.html': '.tmp/component.html'}
        ]       
      }
    },
    dom_munger: {
        scripts: {
          options: {
            //You typically would only specify one option per target but they may be combined
            // read: {selector:'link',attribute:'href',writeto:'myCssRefs',isPath:true},
            // remove: '#removeMe',
            // update: {selector:'html',attribute:'appmode', value:'production'},
            prefix: {selector:'script[src!=\'\']',attribute:'src',value:'<%%= dom_munger.prefix %>'},
            suffix: {selector:'script[src!=\'\']',attribute:'src',value:'<%%= dom_munger.suffix %>'},
            xml:true
            // prefix: {selector:'link',attribute:'href',value:'http://127.0.0.1:9000/'},
            // suffix: {selector:'script',attribute:'src',value:'}'},
            // append: {selector:'body',html:'<div id="appended">Im being appended</div>'},
            // prepend: {selector:'body',html:'<span>Im being prepended</span>'},
            // text: {selector:'title',text:'My App'},
            // callback: function($){
            //   $('#sample2').text('Ive been updated via callback');
            // }
          },
          src: '<%%= dom_munger.src %>'
        },
        css: {
          options: {
            prefix: {selector:'link',attribute:'href',value:'<%%= dom_munger.prefix %>'},
            suffix: {selector:'link',attribute:'href',value:'<%%= dom_munger.suffix %>'},
            xml:true
          },
          src: '<%%= dom_munger.src %>'
        },
        img: {
          options: {
            prefix: {selector:'img',attribute:'src',value:'<%%= dom_munger.prefix %>'},
            suffix: {selector:'img',attribute:'src',value:'<%%= dom_munger.suffix %>'},
            xml:true
          },
          src: '<%%= dom_munger.src %>'
        },
        apex: {
          options: {
            prefix: {selector:'apex\\:stylesheet',attribute:'value',value:'<%%= dom_munger.prefix %>'},
            suffix: {selector:'apex\\:stylesheet',attribute:'value',value:'<%%= dom_munger.suffix %>'},
            xml:true
          },
          src: '<%%= dom_munger.src %>'        
        }        
      },   
      html2xml: {
        src: '<%%= dom_munger.src %>' 
      },
    inline_angular_templates: {
        vf: {
            options: {
                base: '<%%= yeoman.app %>', // (Optional) ID of the <script> tag will be relative to this folder. Default is project dir.
                prefix: '/',            // (Optional) Prefix path to the ID. Default is empty string.
                selector: 'body',       // (Optional) CSS selector of the element to use to insert the templates. Default is `body`.
                method: 'prepend'       // (Optional) DOM insert method. Default is `prepend`.
            },
            files: {
                '.tmp/component.html': ['.tmp/views/*.html']
            }
        }
    },     
    ngtemplates:  {
      dev:        {
        cwd: '.tmp',
        src:      'views/*.html',
        dest:     '<%%= yeoman.app %>/.tmp/template.js',
        options:  {
          module: '<%= scriptAppName %>.templates',
          standalone:true
        }
      }
    },       
    // Copies remaining files to places other tasks can use
    copy: {
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.dist %>',
          dest: '<%= staticResourceFullPathDev %>',
          src: [
            '**'
          ]          
        }]
      },
      prod: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.dist %>',
          dest: '<%= staticResourceFullPathProd %>',
          src: [
            '**',
            '!**/bower_components/**'
          ]          
        }]
      },
      scripts: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: ['scripts/**/*']
        }]
      },        
      vfPage: {
        files: [{
          // cwd: '<%%= yeoman.app %>',
          dest: '<%= vfPageFullPath %>',
          src: '.tmp/page-vf.html'
        }]
      },
      indexHtml: {
        files: [{
          // cwd: '<%= yeoman.app %>',
          dest: '<%%= yeoman.app %>/index.html',
          src: '.tmp/page.html'
        }]
      },      

      vfToTemp: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '.tmp',
          src: [
            '*.html',
            'views/{,*/}*.html'
          ]
        }]        
      },
      vfToTempDist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.dist %>',
          dest: '.tmp',
          src: [
            '*.html',
            'views/{,*/}*.html'
          ]
        }]        
      },      
      vfComponent: {
        files: [{
          // cwd: '<%%= yeoman.app %>',
          dest: '<%= vfComponentFullPath %>',
          src: '.tmp/component-vf.html'
        }]
      },      
      partials: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '.tmp',
          src: ['views/{,*/}*.html']
        }]
      },     
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'bower_components/**/*',
            'styles/**/*',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [<% if (coffee) { %>
        'coffee:dist',<% } %><% if (compass) { %>
        'compass:server'<% } else { %>
        'copy:styles'<% } %>
      ],
      test: [<% if (coffee) { %>
        'coffee',<% } %><% if (compass) { %>
        'compass'<% } else { %>
        'copy:styles'<% } %>
      ],
      dist: [<% if (coffee) { %>
        'coffee',<% } %><% if (compass) { %>
        'compass:dist',<% } else { %>
        'copy:styles',<% } %>
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `page.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('editRefs', function(target, what) {
    var tgt;
    if(what == 'partials') {
      switch(target) {
        case 'local': 
          tgt = ''; break;
        case 'dev':
          tgt = 'DEV'; break;
        case 'prod':
          tgt = 'PROD'; break;
      }
      grunt.config.set('dom_munger.suffix', '');
      grunt.config.set('dom_munger.src', '<%%= yeoman.dist %>/views/*.html');
      grunt.config.set('dom_munger.prefix', '/resource/' + (new Date()).getTime() + '/<%= scriptAppName %>' + tgt + '/');
      console.log(grunt.config.get('dom_munger.src'));

    } else {   
      if(target === 'local') {
        tgt = ''
        grunt.config.set('dom_munger.src', '.tmp/**/*.html');
        grunt.config.set('dom_munger.prefix', 'https://127.0.0.1:9000/');
        grunt.config.set('dom_munger.suffix', '');
      } else if(target === 'dev') {
        tgt = 'DEV';
        grunt.config.set('dom_munger.src', '.tmp/*-vf.html');
        grunt.config.set('dom_munger.prefix', '{!URLFOR($Resource.vftestDEV, \'');
        grunt.config.set('dom_munger.suffix', '\')}');
      } else if(target === 'prod') {
        tgt = 'PROD';
        grunt.config.set('dom_munger.src', '.tmp/*-vf.html');
        grunt.config.set('dom_munger.prefix', '{!URLFOR($Resource.vftestPROD, \'');
        grunt.config.set('dom_munger.suffix', '\')}');
      }
    }

    grunt.task.run(['dom_munger:scripts', 'dom_munger:css','dom_munger:img','dom_munger:apex', 'html2xml']);
  });

  grunt.registerTask('vf', function(target) {
    if(target === 'local')
    {
      return grunt.task.run([
        // 'clean:dev',
        'copy:vfToTemp',
        'copy:partials',
        'targethtml:vflocal',
        'targethtml:novf',        
        'editRefs:local',
        // 'inline_angular_templates:vf',
        'ngtemplates:dev',
        'html2xml',
        'copy:vfPage',
        'copy:vfComponent',
        // 'copy:dev',
        'serve'
      ]);
    }
    if(target === 'dev')
    {
      return grunt.task.run([
        'clean:dist',
        'clean:dev',
        'bower-install',
        'concurrent:dist',
        'autoprefixer',
        'copy:dist',
        'copy:scripts',
        'copy:vfToTempDist',
        'targethtml:vf',
        'targethtml:novf',        
        'editRefs:dev',
        'editRefs:dev:partials',
        'copy:vfPage',
        'copy:vfComponent', 
        'copy:dev',       
      ]);
    }  
    if(target === 'prod')
    {
      return grunt.task.run([
        'clean:dist',
        'clean:prod',
        'bower-install',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'usemin',
        'copy:vfToTempDist',
        'targethtml:vf',
        'targethtml:novf',        
        'editRefs:prod',
        'editRefs:prod:partials',
        'html2xml',
        'copy:vfPage',
        'copy:vfComponent', 
        'copy:prod',       
        'htmlmin'
      ]);
    }       
  });

  grunt.registerTask('d', function(target) {
      grunt.task.run([
      'bower-install',  
      'clean:server',
      'copy:vfToTemp',
      'targethtml:novf', 
      'vulcanize:indexHtml',
      'copy:indexHtml',
      
      'concurrent:server',
      'autoprefixer'
      ]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'bower-install',
      'clean:server',
      'copy:vfToTemp',
      'targethtml:novf', 
      'vulcanize:indexHtml',
      'copy:indexHtml',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    // 'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('dev', [
    'clean:dist',
    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'targethtml:vf',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    // 'rev',
    'usemin',

    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
