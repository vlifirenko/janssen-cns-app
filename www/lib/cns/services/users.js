
cnsApp.factory("userService", ["$http", "$rootScope", "$q", "$base64",
	function ($http, $rootScope, $q, $base64) {

	    // get all users
	    function _list() {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users";
	        //var data = JSON.stringify({ "userid": userid, "password": password });
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

	    function _page(pageIndex, pageSize) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

	    function _findByName(namePart) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users?nameMatch=" + namePart;
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

	    function _pageByName(namePart, pageIndex, pageSize) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users?nameMatch=" + namePart + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

	    function _findByLocation(locationId) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users?locationId=" + locationId;
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

	    function _findByNameAndLocation(namePart, locationId) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users?locationId=" + locationId + "&namepart=" + namePart;
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

	    function _findByNameAndLocationPaged(namePart, locationId, pageIndex, pageSize) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users?locationId=" + locationId + "&namepart=" + namePart + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

	    function _pageByLocation(locationId, pageIndex, pageSize) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users?locationId=" + locationId + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

	    // get one user
	    function _get(id) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users/" + id;
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

	    // update user
	    function _set(u) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users/" + u.Id;
	        var postData = JSON.stringify(u);
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

	    function _login(email, password) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "login";
	        // encode the password here
	        var postData = JSON.stringify({ "email": email, "password": $base64.encode(password) });
	        $http.post(url, postData)
				.success(function (data, status, headers, config) {
				    d.resolve(data)
				})
				.error(function (data, status, headers, config) {
				    d.reject(data, status);
				})
	        ;
	        return d.promise;
	    }

	    // add user
	    function _add(u) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users";
	        var postData = JSON.stringify(u);
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

	    // delete user
	    function _delete(id) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users/" + id;
	        $http.delete(url, {})
				.success(function (data, status, headers, config) {
				    d.resolve(data);
				})
				.error(function (data, status, headers, config) {
				    d.reject(data, status);
				})
	        ;
	        return d.promise;
	    }

	    function _uploadImage(id, imageFile) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "users/uploadimage";
	        var fd = new FormData();
	        fd.append("file", imageFile);
	        fd.append("userid", id);
	        $http.post(url,
                fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })
            .success(function (data) {
                d.resolve(data)
            })
            .error(function (data) {
                d.reject(data);
            });
	        return d.promise;
	    }


	    return {
	        list: _list,
	        page: _page,
	        findByName: _findByName,
	        pageByName: _pageByName,
	        findByLocation: _findByLocation,
	        pageByLocation: _pageByLocation,
	        findByNameAndLocation: _findByNameAndLocation,
	        findByNameAndLocationPaged: _findByNameAndLocationPaged,
	        get: _get,
	        set: _set,
	        add: _add,
	        login: _login,
	        delete: _delete,
	        uploadImage: _uploadImage
	    }
	}]);