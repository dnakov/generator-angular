'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var wiredep = require('wiredep');


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'false'
  });
  this.scriptAppName = this.appname; //+ angularUtils.appName(this);

  args = ['main'];

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.appPath = this.env.options.appPath;

  if (typeof this.env.options.coffee === 'undefined') {
    this.option('coffee', {
      desc: 'Generate CoffeeScript instead of JavaScript'
    });

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    if (!this.options.coffee &&
      this.expandFiles(path.join(this.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
      this.options.coffee = true;
    }

    this.env.options.coffee = this.options.coffee;
  }

  if (typeof this.env.options.minsafe === 'undefined') {
    this.option('minsafe', {
      desc: 'Generate AngularJS minification safe code'
    });
    this.env.options.minsafe = this.options.minsafe;
    args.push('--minsafe');
  }

  this.hookFor('vfangular:common', {
    args: args
  });

  this.hookFor('vfangular:main', {
    args: args
  });

  this.hookFor('vfangular:controller', {
    args: args
  });

  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: this._injectDependencies.bind(this)
    });

    var enabledComponents = [];

    if (this.resourceModule) {
      enabledComponents.push('angular-resource/angular-resource.js');
    }

    if (this.cookiesModule) {
      enabledComponents.push('angular-cookies/angular-cookies.js');
    }

    if (this.sanitizeModule) {
      enabledComponents.push('angular-sanitize/angular-sanitize.js');
    }

    if (this.routeModule) {
      enabledComponents.push('angular-route/angular-route.js');
    }

    this.invoke('karma:app', {
      options: {
        coffee: this.options.coffee,
        travis: true,
        'skip-install': this.options['skip-install'],
        components: [
          'angular/angular.js',
          'angular-mocks/angular-mocks.js'
        ].concat(enabledComponents)
      }
    });

  });

  this.pkg = require('../package.json');
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  // welcome message
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    console.log(
      'Out of the box I include Bootstrap and some AngularJS recommended modules.\n'
    );

    // Deprecation notice for minsafe
    if (this.options.minsafe) {
      console.warn(
        '\n** The --minsafe flag is being deprecated in 0.7.0 and removed in ' +
        '0.8.0. For more information, see ' +
        'https://github.com/yeoman/generator-angular#minification-safe. **\n'
      );
    }
  }
};
Generator.prototype.askForStaticResource = function askForStaticResource() {
  var cb = this.async();

  this.prompt([{
    type: 'input',
    name: 'staticResource',
    message: 'Enter a name for your app',
    default: this.scriptAppName
  }], function (props) {
    this.staticResource = props.staticResource;
    this.staticResourceNameProd = this.staticResource + 'PROD';
    this.staticResourceNameDev = this.staticResource + 'DEV';
    this.staticResourceFullPathDev =  path.join(this.appPath, '../../resource-bundles/' + this.staticResource + 'DEV.resource/');
    this.staticResourceFullPathProd =  path.join(this.appPath, '../../resource-bundles/' + this.staticResource + 'PROD.resource/');
    this.vfPageFullPath =  path.join(this.appPath, '../../src/pages/' + this.staticResource + '.page');
    this.vfComponentFullPath = path.join(this.appPath, '../../src/components/' + this.staticResource + '.component');
    this.staticResourceZipPathDev = path.join(this.appPath, '../../src/staticresources/' + this.staticResource + 'DEV.resource');
    this.staticResourceZipPathProd = path.join(this.appPath, '../../src/staticresources/' + this.staticResource + 'PROD.resource');
    // console.log(this.staticResourceFullPathDev);

    // this.env.options.staticResourceFullPathDev = this.staticResourceFullPathDev;
    cb();
  }.bind(this));
};

Generator.prototype.askForStandardController = function askForStandardController() {
  var cb = this.async();

  this.prompt([{
    type: 'input',
    name: 'standardController',
    message: 'Enter the apex:page standard controller (leave blank if you don\'t need one):',
    default: ''
  }], function (props) {
    this.standardController = props.standardController == '' ? undefined : props.standardController;
    cb();
  }.bind(this));
};
Generator.prototype.askForCustomController = function askForCustomController() {
  var cb = this.async();

  this.prompt([{
    type: 'input',
    name: 'customController',
    message: 'Enter the component custom apex controller or use the default',
    default: 'ngForceController'
  }], function (props) {
    this.customController = props.customController;
    cb();
  }.bind(this));
};
Generator.prototype.askForApiVersion = function askForApiVersion() {
  var cb = this.async();

  this.prompt([{
    type: 'input',
    name: 'apiVersion',
    message: 'Enter SF API Version',
    default: '29.0'
  }], function (props) {
    this.apiVersion = props.apiVersion;
    cb();
  }.bind(this));
};

Generator.prototype.askForPageLabel = function askForPageLabel() {
  var cb = this.async();

  this.prompt([{
    type: 'input',
    name: 'pageLabel',
    message: 'Enter Page Label',
    default: this.scriptAppName
  }], function (props) {
    this.pageLabel = props.pageLabel;
    this.pageDescription = this.pageLabel;
    cb();
  }.bind(this));
};



Generator.prototype.askForCompass = function askForCompass() {
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'compass',
    message: 'Would you like to use Sass (with Compass)?',
    default: false
  }], function (props) {
    this.compass = props.compass;

    cb();
  }.bind(this));
};

Generator.prototype.askForBootstrap = function askForBootstrap() {
  var compass = this.compass;
  var cb = this.async();

  this.prompt([{
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to include Twitter Bootstrap?',
    default: false
  }, {
    type: 'confirm',
    name: 'compassBootstrap',
    message: 'Would you like to use the Sass version of Twitter Bootstrap?',
    default: true,
    when: function (props) {
      return props.bootstrap && compass;
    }
  }], function (props) {
    this.bootstrap = props.bootstrap;
    this.compassBootstrap = props.compassBootstrap;

    cb();
  }.bind(this));
};

Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules would you like to include?',
    choices: [{
      value: 'resourceModule',
      name: 'angular-resource.js',
      checked: false
    }, {
      value: 'cookiesModule',
      name: 'angular-cookies.js',
      checked: false
    }, {
      value: 'sanitizeModule',
      name: 'angular-sanitize.js',
      checked: false
    }, {
      value: 'routeModule',
      name: 'angular-route.js',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.resourceModule = hasMod('resourceModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.sanitizeModule = hasMod('sanitizeModule');
    this.routeModule = hasMod('routeModule');

    var angMods = [];

    if (this.cookiesModule) {
      angMods.push("'ngCookies'");
    }

    if (this.resourceModule) {
      angMods.push("'ngResource'");
    }
    if (this.sanitizeModule) {
      angMods.push("'ngSanitize'");
    }
    if (this.routeModule) {
      angMods.push("'ngRoute'");
      this.env.options.ngRoute = true;
    }

    if (angMods.length) {
      this.env.options.angularDeps = "\n  " + angMods.join(",\n  ") +"\n";
    }

    cb();
  }.bind(this));
};


Generator.prototype.bootstrapFiles = function bootstrapFiles() {
  var sass = this.compass;
  var mainFile = 'main.' + (sass ? 's' : '') + 'css';

  if (this.bootstrap && !sass) {
    this.copy('fonts/glyphicons-halflings-regular.eot', 'app/fonts/glyphicons-halflings-regular.eot');
    this.copy('fonts/glyphicons-halflings-regular.ttf', 'app/fonts/glyphicons-halflings-regular.ttf');
    this.copy('fonts/glyphicons-halflings-regular.svg', 'app/fonts/glyphicons-halflings-regular.svg');
    this.copy('fonts/glyphicons-halflings-regular.woff', 'app/fonts/glyphicons-halflings-regular.woff');
  }

  this.copy('styles/' + mainFile, 'app/styles/' + mainFile);
};

// Generator.prototype.appJs = function appJs() {
//   this.indexFile = this.appendFiles({
//     html: this.indexFile,
//     fileType: 'js',
//     optimizedPath: 'scripts/scripts.js',
//     sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
//     searchPath: ['.tmp', 'app']
//   });
//   console.log(this.indexFile);
// };

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.ngRoute = this.env.options.ngRoute;

  console.log(this);
  this.write(path.join(this.appPath, 'component.html'), this.engine(this.read('../../templates/common/component.html'), this).replace(/&apos;/g, "'"));
  this.write(path.join(this.appPath, 'page.html'), this.engine(this.read('../../templates/common/page.html'), this).replace(/&apos;/g, "'"));
};

Generator.prototype.createMetaFiles = function createMetaFiles() {

  this.write(this.vfPageFullPath + '-meta.xml', this.engine(this.read('../../templates/common/page-meta.xml'), this).replace(/&apos;/g, "'"));
  this.write(this.vfComponentFullPath + '-meta.xml', this.engine(this.read('../../templates/common/component-meta.xml'), this).replace(/&apos;/g, "'"));
  this.write(this.staticResourceZipPathDev + '-meta.xml', this.engine(this.read('../../templates/common/staticresource-meta.xml'), this).replace(/&apos;/g, "'"));
  this.write(this.staticResourceZipPathProd + '-meta.xml', this.engine(this.read('../../templates/common/staticresource-meta.xml'), this).replace(/&apos;/g, "'"));
}

Generator.prototype.packageFiles = function () {
  this.coffee = this.env.options.coffee;
  this.template('../../templates/common/_bower.json', 'bower.json');
  this.template('../../templates/common/_package.json', 'package.json');
  this.template('../../templates/common/Gruntfile.js', 'Gruntfile.js');
};

Generator.prototype.imageFiles = function () {
  this.sourceRoot(path.join(__dirname, 'templates'));
  this.directory('images', 'app/images', true);
};

Generator.prototype._injectDependencies = function _injectDependencies() {
  var howToInstall =
    '\nAfter running `npm install & bower install`, inject your front end dependencies into' +
    '\nyour HTML by running:' +
    '\n' +
    chalk.yellow.bold('\n  grunt bower-install');

  if (this.options['skip-install']) {
    console.log(howToInstall);
  } else {
    wiredep({
      directory: 'app/bower_components',
      bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
      ignorePath: 'app/',
      htmlFile: 'app/component.html',
      cssPattern: '<link rel="stylesheet" href="{{filePath}}"/>'
    });
    wiredep({
      directory: 'app/bower_components',
      bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
      ignorePath: 'app/',
      htmlFile: 'app/page.html',
      cssPattern: '<link rel="stylesheet" href="{{filePath}}"/>'
    });    
  }
};
