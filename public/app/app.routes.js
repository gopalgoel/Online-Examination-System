angular.module('routerRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		template: '<h1>Gopal</h1>'
	// templateUrl : 'home.html',
	// controller : 'mainController',
	// controllerAs: 'home'
	});

	// // route for the about page
	// .when('/login', {
	// templateUrl : 'views/pages/login.html',
	// // controller : 'loginController',
	// // controllerAs: 'about'
	// })

	// // route for the contact page
	// .when('/signup', {
	// templateUrl : 'views/pages/signup.html',
	// // controller : 'signupController',
	// // controllerAs: 'contact'
	// });

// set our app up to have pretty URLS
	$locationProvider.htmlMode(true);
});
