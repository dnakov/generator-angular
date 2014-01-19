'use strict';

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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })<% } %>
  .run(function($rootScope) {
  });
