var app = angular.module('main',['ngRoute']);

app.controller('mainController', function(){
	
});

app.config(function($routeProvider) {
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
	});
});
	
app.controller('loginController', ["$http", function($http){
	this.head = "Login";
	this.formData = {};
	this.login = function(){
		console.log(JSON.stringify(this.formData,null,4));
		$http({
			url: '/login',
			method: 'GET',
			params: this.formData
		}).then(function(res){
			//succes then redirect to userDashboard
			console.log(res);
		}, function(res){
			console.log(res);
		});
		this.formData = {};
	};
}]);

app.controller('signupController', ["$http", function($http){
	this.head = "Signup";
	this.formData = {};
	this.signup = function(){
		console.log(JSON.stringify(this.formData,null,4));
		//console.log(this.formData.name);
		$http({
			url: '/signup',
			method: 'POST',
			data: this.formData
		}).then(function(res){
			//succes then redirect to userDashboard
			console.log(res);
		}, function(res){
			console.log(res);
		});
		
	};
}]);

