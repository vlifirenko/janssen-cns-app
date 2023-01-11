cnsApp.factory("locationService", ["$http", "$rootScope", "$q",
	function ($http, $rootScope, $q) {

		// get all locations
		function _list() {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "locations";
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
			var url = $rootScope.API_ROOT + "locations?pageIndex=" +pageIndex+ "&pageSize=" + pageSize;
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

		// get one location
		function _get(id) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "locations/" + id;
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

		// update location
		function _set(loc) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "locations/" + loc.Id;
			var postData = JSON.stringify(loc);
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

		// add location
		function _add(loc) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "locations";
			var postData = JSON.stringify(loc);
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

		// delete location
		function _delete(id) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "locations/" + id;
			$http.delete(url, {})
				.success(function (data, status, headers, config) {
					d.resolve(data);
				})
				.error(function (data, status, headers, config) {
					if (status == 409) { // conflict
						alert("Cannot delete location: " + data);
					}
					d.reject(data, status);
				})
			;
			return d.promise;
		}

		return {
			list: _list,
			page : _page,
			get: _get,
			set: _set,
			add: _add,
			delete: _delete
		}
	}]);

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
		    var url = $rootScope.API_ROOT + "users?locationId=" + locationId + "&namepart=" + namePart + "&pageIndex="+ pageIndex +"&pageSize=" + pageSize;
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

cnsApp.factory("meetingService", ["$http", "$rootScope", "$q",
	function ($http, $rootScope, $q) {

		function _getUnregisteredUsers(id) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "meetings/" + id + "/unregistered";
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

		function _getUnregisteredUsersPage(id, pageIndex, pageSize) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "meetings/" + id + "/unregistered?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

		function _findUnregisteredUsersWithNamePage(id, namePart, pageIndex, pageSize) {
		    var d = $q.defer();
		    var url = $rootScope.API_ROOT + "meetings/findunregistered?id=" + id + "&namePart=" + namePart + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

		function _findUnregisteredUsersByLocationWithNamePage(id, locationId, namePart, pageIndex, pageSize) {
		    var d = $q.defer();
		    var url = $rootScope.API_ROOT + "meetings/findunregistered?id=" + id + "&locationId=" + locationId + "&namePart=" + namePart + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

		function _findUnregisteredUsersByLocationPage(id, locationId, pageIndex, pageSize) {
		    var d = $q.defer();
		    var url = $rootScope.API_ROOT + "meetings/findunregistered?id=" + id + "&locationId=" + locationId + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

		function _findattendees(id, namepart) {
		    var d = $q.defer();
		    var url = $rootScope.API_ROOT + "meetings/" + id + "/find/" + namepart;
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

		// get all meetings
		function _list() {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "meetings";
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
		    var url = $rootScope.API_ROOT + "meetings?nameMatch=" + namePart;
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

		function _findByNamePaged(namePart, pageIndex, pageSize) {
		  var d = $q.defer();
		  var url = $rootScope.API_ROOT + "meetings?nameMatch=" + namePart + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
		  $http.get(url)
		  .success(function (data, status, headers, config) {
		    d.resolve(data);
		  })
		  .error(function (data, status, headers, config) {
		    d.reject(data, status);
		  });
		  return d.promise;
		}

		function _page(pageIndex, pageSize) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "meetings?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

		// get one meeting
		function _get(id) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "meetings/" + id;
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
			var url = $rootScope.API_ROOT + "meetings/" + m.Id;
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

		// add meeting
		function _add(m) {
			var d = $q.defer();
			var url = $rootScope.API_ROOT + "meetings";
			var postData = JSON.stringify(m);
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
			var url = $rootScope.API_ROOT + "meetings/" + id;
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
		    var url = $rootScope.API_ROOT + "meetings/uploadimage";
		    var fd = new FormData();
		    fd.append("file", imageFile);
		    fd.append("meetingid", id);
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

		function _bulkRegistration(id, excelFile) {
		    var d = $q.defer();
		    var url = $rootScope.API_ROOT + "registration/bulk";
		    var fd = new FormData();
		    fd.append("file", excelFile);
		    fd.append("meetingid", id);
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
            findByNamePaged: _findByNamePaged,
			get: _get,
			set: _set,
			add: _add,
			getUnregisteredUsers: _getUnregisteredUsers,
			getUnregisteredUsersPage: _getUnregisteredUsersPage,
			findUnregisteredUsersWithNamePage: _findUnregisteredUsersWithNamePage,
            findUnregisteredUsersByLocationWithNamePage: _findUnregisteredUsersByLocationWithNamePage,
            findUnregisteredUsersByLocationPage: _findUnregisteredUsersByLocationPage,
			delete: _delete,
			uploadImage: _uploadImage,
			bulkRegistration: _bulkRegistration,
            findattendees: _findattendees
		}
	}]);

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


