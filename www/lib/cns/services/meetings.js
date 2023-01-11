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
	        console.log(url);
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

	    function _findRegistered(id, pageIndex, pageSize) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "meetings/findregistered?id=" + id;
	        if ((pageIndex != undefined) && (pageSize != undefined)) {
	            url += "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
	        }
	        else {
	            url += "&pageIndex=0&pageSize=0";
	        }

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

	    function _findRegisteredWithLocation(id, locationId, pageIndex, pageSize) {
	        var d = $q.defer();
	        var url = $rootScope.API_ROOT + "meetings/findregisteredwithlocation?id=" + id + "&locationId=" + locationId;
	        if ((pageIndex != undefined) && (pageSize != undefined)) {
	            url += "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
	        }
	        else {
	            url += "&pageIndex=0&pageSize=0";
	        }
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
	        delete: _delete,
	        uploadImage: _uploadImage,
	        bulkRegistration: _bulkRegistration,
	        findattendees: _findattendees,
	        findRegistered: _findRegistered,
	        findRegisteredWithLocation: _findRegisteredWithLocation
	    }
	}]);