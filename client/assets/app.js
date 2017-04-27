var app = angular.module('app', ['ngRoute', 'ngCookies', 'luegg.directives']);
app.config(function ($routeProvider) {
	$routeProvider
  .when('/', { templateUrl: 'partials/login.html'})
  .when('/dashboard', {templateUrl:'partials/dashboard.html'})
  .when('/conversations', {templateUrl:'partials/conversations.html'})
  .when('/channels', {templateUrl:'partials/channels.html'})
  .when('/edit', {templateUrl:'partials/edit.html'})
  .otherwise({
    redirectTo: '/'
  });
// Routes to load your new and edit pages with new and edit controllers attached to them!
});
