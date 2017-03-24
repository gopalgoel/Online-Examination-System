var app = angular.module('main',['routerRoutes', 'ngCookies']);

app.controller('mainController', function(){
	
});
	
app.factory('auth', ['$http', '$log', '$window', '$cookies', function($http,$log,$window,$cookies){
	var authService = {};
	authService.isAuthencticated = false;

	authService.login = function(formData, cb){
		console.log(JSON.stringify(formData,null,4));
		$http({
			url: '/login',
			method: 'GET',
			params: formData
		}).then(function(res){
			//succes then redirect to userDashboard
			$log.log(res);
			$cookies.put('token',res.data.data.token);
			$log.log($cookies.get('token'));
			authService.isAuthencticated = true;
			authService.token = res.data.data.token;
			$log.log('came back');
			formData = {};
			cb(authService.token);
		}, function(res){
			$log.log(res);
			cb(null);
		});
	};

	authService.logout = function($scope,cb){
		console.log("in logout");
		$scope.info = "";
		authService.token = $cookies.get('token');
		console.log(authService.token);
		$http({
			url: '/logout',
			method: 'POST',
			headers: {
				'token': authService.token
			}
		}).then(function(res){
			console.log(res);
			$scope.info = res.data.success;
			$cookies.remove('token');
			authService.token=null;
			authService.isAuthencticated = false;
			cb();
		}, function(res){
			console.log(res);
			cb();
		});
	};

	authService.signup = function(formData,cb){
		console.log(JSON.stringify(this.formData,null,4));
		$http({
			url: '/signup',
			method: 'POST',
			data: formData
		}).then(function(res){
			//succes then redirect to userDashboard
			console.log(res);
			cb();
		}, function(res){
			console.log(res);
			cb();
		});
	};

	return authService;
}]);

app.controller('loginController', ["$window", "auth",  function($window, auth){
	this.head = "Login";
	this.formData = {};
	this.login = function(){
		auth.login(this.formData, function(token){
			this.formData = {};
			console.log(token);
		});		
	};
}]);

app.controller('logoutController', ["auth", "$scope", function(auth, $scope){
	this.logout = function(){
		auth.logout($scope,function(){
			console.log(auth.token);
			console.log(auth.isAuthencticated);
			console.log("logged out");
		});
	};
	this.logout();
}]);


app.controller('signupController', ["auth", function(auth){
	this.head = "Signup";
	this.formData = {};
	this.signup = function(){
		auth.signup(this.formData, function(){
			this.formData={};
			console.log("User Created so exiting");
		});
	}
}]);

	

