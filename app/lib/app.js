var gitIssues = angular.module('gitIssues', [
  'ngRoute',
  'controllers',
  'services',
  'ngSanitize',
  'angularUtils.directives.dirPagination',
  ]);
gitIssues.config(['$routeProvider',
	function($routeProvider) {
	  $routeProvider.
		when('/', { // /drivers   drivers.html
       		templateUrl: 'partials/default.html',
       		controller: 'defaultController'
      }).
      	when('/issues/:number', { // /drivers/:id  driver.html
        	templateUrl: 'partials/issueDetails.html',
        	controller: 'viewController'
      }).
      	otherwise({
        	redirectTo: '/'
      });
  }]);
