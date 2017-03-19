var app = angular.module('main',['ngRoute']);

app.controller('mainController', function(){
	this.a = 5;
});

app.config(function($routeProvider) {
	$routeProvider.when('/home', {
		// template: '<h1>Gopal</h1>'
	templateUrl : 'views/pages/home.html'
		// controller : 'mainController',
		// controllerAs: 'home'
	});
});
// 	// // route for the about page
// 	// .when('/login', {
// 	// templateUrl : 'views/pages/login.html',
// 	// // controller : 'loginController',
// 	// // controllerAs: 'about'
// 	// })

// 	// // route for the contact page
// 	// .when('/signup', {
// 	// templateUrl : 'views/pages/signup.html',
// 	// // controller : 'signupController',
// 	// // controllerAs: 'contact'
// 	// });

// // set our app up to have pretty URLS
// 	// $locationProvider.htmlMode(true);
// });


// app.controller('loginController', function(){
// 	this.head = "Login";
// 	var formData = {};
// 	var signup = function(){
// 		$http({
// 			url: 'http:localhost:3000/signup',
// 			method: 'POST',
// 			body: formData
// 		}).then(function(res){
// 			//succes then redirect to userDashboard
// 		}, function(res){
			
// 		});
// 		formData = {};
// 	};
// });

// app.controller('signupController', ["$http", function(){
// 	this.head = "Signup";
// 	var formData = {};
// 	var signup = function(){
// 		$http({
// 			url: 'http:localhost:3000/signup',
// 			method: 'POST',
// 			body: formData
// 		}).then(function(res){
// 			//succes then redirect to userDashboard
// 		}, function(res){
			
// 		});
// 		formData = {};
// 	};
// }]);

