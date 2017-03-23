var app = angular.module('main',['routerRoutes', 'ngCookies']);

app.controller('mainController', function(){
	
});
	
app.controller('loginController', ["$http", "$cookies", function($http, $cookies){
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
			$cookies.put('token',res.data.data.token);
			console.log($cookies.get('token'));
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
		this.formData = {};
	};
}]);

	
app.controller('logoutController', ["$http", "$cookies", "$scope", function($http, $cookies, $scope){
	this.head = "Logout";
	this.logout = function(){
		this.token = $cookies.get('token');
		$scope.info = "";
		console.log(this.token);
		$http({
			url: '/logout',
			method: 'POST',
			headers: {
				'token': this.token
			}
		}).then(function(res){
			console.log(res);
			$scope.info = res.data.success;
			$cookies.remove('token');
		}, function(res){
			console.log(res);
		});
	};
	this.logout();
}]);