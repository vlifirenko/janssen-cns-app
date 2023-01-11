cnsApp.factory("registrationService", ["$http", "$rootScope", "$q",
	function ($http, $rootScope, $q) {

	    // get all registrations
	    function _list() {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "registrations";
	        $http.get(url)
				.success(function (data, status, headers, config) {
				    d.resolve(data);
				})
				.error(function (data, status, headers, config) {
				    d.reject(data, status);
				})
	        ;
	        return d.promise;
	    }

	    // get one registration
	    function _get(meeetingId, userId) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "registratons/" + meetingId + "/" + userId;
	        $http.get(url)
				.success(function (data, status, headers, config) {
				    d.resolve(data);
				})
				.error(function (data, status, headers, config) {
				    d.reject(data, status);
				})
	        ;
	        return d.promise;
	    }

	    // update meeting
	    function _set(m) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "registrations/" + m.MeetingID + "/" + m.UserID;
	        var postData = JSON.stringify(m);
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

	    // add registration
	    function _add(r) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "registrations";
	        var postData = JSON.stringify(r);
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

	    // delete registration
	    function _delete(r) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "registrations/" + r.MeetingID + "/" + r.UserID;
	        var postData = JSON.stringify(r);
	        $http.delete(url)
				.success(function (data, status, headers, config) {
				    d.resolve(data);
				})
				.error(function (data, status, headers, config) {
				    d.reject(data, status);
				})
	        ;
	        return d.promise;
	    }


	    return {
	        list: _list,
	        get: _get,
	        set: _set,
	        add: _add,
	        delete: _delete
	    }
	}
]);
