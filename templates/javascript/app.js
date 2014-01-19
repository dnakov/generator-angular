'use strict';



var sf = sf || {};

sf.scriptSource = (function(scripts) {
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length - 1];

    if (script.getAttribute.length !== undefined) {
        return script.src
    }

    return script.getAttribute('src', -1)
}());

if(sf.scriptSource.indexOf('127.0.0.1') != -1 || sf.scriptSource.indexOf('//localhost') != -1) {
  sf.env = 'local';
  sf.staticResourcePath = '';
} else if(sf.scriptSource.indexOf('DEV/') != -1) {
  sf.staticResourcePath = '/resource/' + (new Date()).getTime() + '/<%= scriptAppName %>DEV/';
} else if(sf.scriptSource.indexOf('PROD/') != -1) {
  sf.staticResourcePath = '/resource/' + (new Date()).getTime() + '/<%= scriptAppName %>PROD/';
}

var ngModules = [<%= angularModules %>];
try { 
  angular.module('<%= scriptAppName %>.templates'); 
  ngModules.push('<%= scriptAppName %>.templates');
} catch(err) {}



angular.module('<%= scriptAppName %>', ngModules)
<% if (ngRoute) { %>
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: sf.staticResourcePath + 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })<% } %>
  .run(function($rootScope) {
  });
