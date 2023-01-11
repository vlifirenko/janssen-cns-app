cnsApp.factory("baseService", ["$http", "$rootScope", "$q",
	function ($http, $rootScope, $q) {

	    function _get(url){
	        var d = $q.defer();
	        $http.get(url)
                .success(function(data){
                    d.resolve(data);
                })
                .error(function(data, status){
                    d.reject(data, status);
                });
	        return d.promise;
	    }

	    function _put(url, postData) {
	        var d = $q.defer();
	        $http.put(url, postData)
				.success(function (data, status, headers, config) {
				    d.resolve(data);
				})
				.error(function (data, status, headers, config) {
				    d.reject(data, status);
				})
	        ;
	        return d.promise;
	    }

	    function _post(url, postData) {
	        var d = $q.defer();
	        $http.post(url, postData)
				.success(function (data, status, headers, config) {
				    d.resolve(data);
				})
				.error(function (data, status, headers, config) {
				    d.reject(data, status);
				})
	        ;
	        return d.promise;
	    }

	    function _delete(url) {
	        var d = $q.defer();
	        $http.delete(url, {})
                .success(function (data, status, headers, config) {
                    d.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    if (status == 409) { // conflict
                        alert("Cannot delete: " + data);
                    }
                    d.reject(data, status);
                })
	        ;
	        return d.promise;
	    }

	    return {
	        get: _get,
	        put: _put,
	        post: _post,
            delete: _delete
	    }
}]);