cnsApp.factory('authInterceptorService', ['$q', '$location', "$rootScope", "$base64",
    function ($q, $location, $rootScope, $base64) {
        var authInterceptorServiceFactory = {};

        var _request = function (config) {
            config.headers = config.headers || {};

			var user;
			try {
				user = JSON.parse(localStorage.getItem('user'));
			} catch(e) {
				user = $rootScope.user;
			}
			
			if (user && user.ApiKey != '') {
				config.headers.Authorization = "Token " + user.ApiKey;
			}
			
			return config;
        }

        var _responseError = function (rejection) {
            //console.log(rejection);
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
}]);