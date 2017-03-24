angular.module('routerRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/home', {
		templateUrl : 'views/pages/home.html',
		controller : 'mainController',
		controllerAs: 'home'
	})
	// route for the about page
	.when('/login', {
		templateUrl : 'views/pages/login.html',
		controller : 'loginController',
		controllerAs: 'c'
	})

	// route for the contact page
	.when('/signup', {
		templateUrl : 'views/pages/signup.html',
		controller : 'signupController',
		controllerAs: 'c'
	})
	.when('/logout', {
		templateUrl : 'views/pages/logout.html',
		controller : 'logoutController',
		controllerAs: 'c'
	});
	$locationProvider.html5Mode(true);
});
