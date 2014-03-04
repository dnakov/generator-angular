# AngularJS generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-angular.png?branch=master)](http://travis-ci.org/yeoman/generator-angular) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> Yeoman generator for Visualforce+AngularJS - lets you quickly set up a project with sensible defaults and best practises.


## Usage

Install `generator-vfangular`:
```
npm install -g git://github.com/dnakov/generator-vfangular.git
```

Create a new MavensMate project, then make a new directory in the root and get in there.
```
mkdir my-new-app && cd $_
```

Run `yo vfangular`, optionally passing an app name:
```
yo vfangular [app-name]
```

## Editing files

Basically edit your angular app as you normally would. The only difference is that instead of dealing with the index.html, you'll be dealing with `app/page.html` and `app/component.html`. All of the angular app stuff should go in `app/component.html`. Of course, utilize `app/views/*.html` and create partials and stuff.

## Builds

NOTE: You will need to get the ngForceController APEX stuff from here https://github.com/noeticpenguin/ngForce/tree/master/Example and deploy to your org for now.

Run `grunt vf:local`:
* Creates your VF page in the MavensMate folder `src/pages/<appname>.page`
* Creates your VF component in the MavensMate folder `src/pages/<appname>.component` (there's a good reason for it)
* Go to MavensMate and just Save the VF component and page. 
* Start editing your angular files in `app/` and then refresh the VF page in Salesforce. You should see your changes.

Run `grunt vf:dev`:
* Creates your VF page in the MavensMate folder `src/pages/<appname>.page`
* Creates your VF component in the MavensMate folder `src/pages/<appname>.component` (there's a good reason for it)
* Copies the dist/ folder in the MavensMate folder `resource-bundles/<appname>DEV.resource/`
* Go to MavensMate and Save the VF component and page. 
* Press Ctrl+Shift+P, type `deploy resource bundle`, select `<appname>DEV.resource`, and hit enter. 

Run `grunt vf:prod`:
* Creates your VF page in the MavensMate folder `src/pages/<appname>.page`
* Creates your VF component in the MavensMate folder `src/pages/<appname>.component` (there's a good reason for it)
* Concatenates, minifies everything and does a bunch of other awesome stuff
* Copies the app/ folder into the dist/ folder then into the MavensMate folder `resource-bundles/<appname>PROD.resource/`
* Go to MavensMate and Save the VF component and page. 
* Press Ctrl+Shift+P, type `deploy resource bundle`, select `<appname>PROD.resource`, and hit enter. 

---------
The rest of the information below is basically just the generator-angular documentation.

## Generators

Available generators:

* [vfangular](#app) (aka [vfangular:app](#app))
* [vfangular:controller](#controller)
* [vfangular:directive](#directive)
* [vfangular:filter](#filter)
* [vfangular:route](#route)
* [vfangular:service](#service)
* [vfangular:provider](#service)
* [vfangular:factory](#service)
* [vfangular:value](#service)
* [vfangular:constant](#service)
* [vfangular:decorator] (#decorator)
* [vfangular:view](#view)

**Note: Generators are to be run from the root directory of your app.**

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Twitter Bootstrap and additional AngularJS modules, such as angular-resource (installed by default).

Example:
```bash
yo vfangular
```

### Route
Generates a controller and view, and configures a route in `app/scripts/app.js` connecting them.

Example:
```bash
yo vfangular:route myroute
```

Produces `app/scripts/controllers/myroute.js`:
```javascript
angular.module('myMod').controller('MyrouteCtrl', function ($scope) {
  // ...
});
```

Produces `app/views/myroute.html`:
```html
<p>This is the myroute view</p>
```

### Controller
Generates a controller in `app/scripts/controllers`.

Example:
```bash
yo vfangular:controller user
```

Produces `app/scripts/controllers/user.js`:
```javascript
angular.module('myMod').controller('UserCtrl', function ($scope) {
  // ...
});
```
### Directive
Generates a directive in `app/scripts/directives`.

Example:
```bash
yo vfangular:directive myDirective
```

Produces `app/scripts/directives/myDirective.js`:
```javascript
angular.module('myMod').directive('myDirective', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.text('this is the myDirective directive');
    }
  };
});
```

### Filter
Generates a filter in `app/scripts/filters`.

Example:
```bash
yo vfangular:filter myFilter
```

Produces `app/scripts/filters/myFilter.js`:
```javascript
angular.module('myMod').filter('myFilter', function () {
  return function (input) {
    return 'myFilter filter:' + input;
  };
});
```

### View
Generates an HTML view file in `app/views`.

Example:
```bash
yo vfangular:view user
```

Produces `app/views/user.html`:
```html
<p>This is the user view</p>
```

### Service
Generates an AngularJS service.

Example:
```bash
yo vfangular:service myService
```

Produces `app/scripts/services/myService.js`:
```javascript
angular.module('myMod').service('myService', function () {
  // ...
});
```

You can also do `yo vfangular:factory`, `yo vfangular:provider`, `yo vfangular:value`, and `yo vfangular:constant` for other types of services.

### Decorator
Generates an AngularJS service decorator.

Example:
```bash
yo vfangular:decorator serviceName
```

Produces `app/scripts/decorators/serviceNameDecorator.js`:
```javascript
angular.module('myMod').config(function ($provide) {
    $provide.decorator('serviceName', function ($delegate) {
      // ...
      return $delegate;
    });
  });
```

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

### CoffeeScript
For generators that output scripts, the `--coffee` option will output CoffeeScript instead of JavaScript.

For example:
```bash
yo vfangular:controller user --coffee
```

Produces `app/scripts/controller/user.coffee`:
```coffeescript
angular.module('myMod')
  .controller 'UserCtrl', ($scope) ->
```

A project can mix CoffeScript and JavaScript files.

To output JavaScript files, even if CoffeeScript files exist (the default is to output CoffeeScript files if the generator finds any in the project), use `--coffee=false`.

### Minification Safe

**Deprecated**

[Related Issue #452](https://github.com/yeoman/generator-angular/issues/452): This option is being removed in future versions of the generator. Initially it was needed as ngMin was not entirely stable. As it has matured, the need to keep separate versions of the script templates has led to extra complexity and maintenance of the generator. By removing these extra burdens, new features and bug fixes should be easier to implement. If you are dependent on this option, please take a look at ngMin and seriously consider implementing it in your own code. It will help reduce the amount of typing you have to do (and look through) as well as make your code cleaner to look at.


By default, generators produce unannotated code. Without annotations, AngularJS's DI system will break when minified. Typically, these annotations that make minification safe are added automatically at build-time, after application files are concatenated, but before they are minified. By providing the `--minsafe` option, the code generated will out-of-the-box be ready for minification. The trade-off is between amount of boilerplate, and build process complexity.

#### Example
```bash
yo angular:controller user --minsafe
```

Produces `app/controller/user.js`:
```javascript
angular.module('myMod').controller('UserCtrl', ['$scope', function ($scope) {
  // ...
}]);
```

#### Background
Unannotated:
```javascript
angular.module('myMod').controller('MyCtrl', function ($scope, $http, myService) {
  // ...
});
```

Annotated:
```javascript
angular.module('myMod').controller('MyCtrl',
  ['$scope', '$http', 'myService', function ($scope, $http, myService) {

    // ...
  }]);
```

The annotations are important because minified code will rename variables, making it impossible for AngularJS to infer module names based solely on function parameters.

The recommended build process uses `ngmin`, a tool that automatically adds these annotations. However, if you'd rather not use `ngmin`, you have to add these annotations manually yourself. **One thing to note is that `ngmin` does not produce minsafe code for things that are not main level elements like controller, services, providers, etc.:
```javascript
resolve: {
  User: function(myService) {
    return MyService();
  }
}
```

will need to be manually done like so:
```javascript
resolve: {
  User: ['myService', function(myService) {
    return MyService();
  }]
}
```


### Add to Index
By default, new scripts are added to the index.html file. However, this may not always be suitable. Some use cases:

* Manually added to the file
* Auto-added by a 3rd party plugin
* Using this generator as a subgenerator

To skip adding them to the index, pass in the skip-add argument:
```bash
yo angular:service serviceName --skip-add
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* angular-mocks
* angular-scenario


The following additional modules are available as components on bower, and installable via `bower install`:

* angular-cookies
* angular-loader
* angular-resource
* angular-sanitize

All of these can be updated with `bower update` as new versions of AngularJS are released.

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

### Output
You can change the `app` directory by adding a `appPath` property to `bower.json`. For instance, if you wanted to easily integrate with Express.js, you could add the following:

```json
{
  "name": "yo-test",
  "version": "0.0.0",
  ...
  "appPath": "public"
}

```
This will cause Yeoman-generated client-side files to be placed in `public`.

## Testing

Running `grunt test` will run the unit tests with karma.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
