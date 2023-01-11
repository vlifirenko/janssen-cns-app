var cnsApp = angular.module("services", ["base64"])
	.run(function ($rootScope) {
		$rootScope.API_ROOT = "https://cnsdirectory.optimalstrategix.com/api/";
		
		$rootScope.user = { ApiKey: '' };
	})
	.config(function($httpProvider) {
		$httpProvider.interceptors.push("authInterceptorService");
		$httpProvider.interceptors.push(function($q) {
			return {
				'responseError' : function(response) {
					if (response.status == 401) {
						window.location = "/#/login";
						return;
					}
					return $q.reject(response);
				}
			};
		});
	})
    .factory('authInterceptorService', ['$q', '$location', "$rootScope", "$base64",
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
    }])
	.factory("roleService", ["$rootScope", function ($rootScope) {
		return {
			getUser: function() {
				var user = $rootScope.user;
				try {
					user = JSON.parse(localStorage.getItem('user'));
				} catch(e) {}
				return user;
			}
			, get: function() {
				return {
					1: 'User',
					2: 'MeetingAdmin',
					3: 'Admin'
				};
			}
			, getWithIds: function() {
				return [
					{ Id:1, Name:'User' },
					{ Id:2, Name:'MeetingAdmin' },
					{ Id:3, Name:'Admin' }
				];
			}
			, ifMeetingAdmin: function() {
				return this.getUser().Role > 1;
			}
			, ifAdmin: function() {
				return this.getUser().Role == 3;
			}
		}
	}])
;


angular.module('ionicApp', [ 'ionic', 'ngResource', 'services', 'base64'])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('cns', {
                abstract: true,
                templateUrl: "cns.html"
            })
            .state('cns.directory', {
                url: "/directory/:tab",
                views: {
                    'menuContent': {
                        templateUrl: "directory.html",
                        controller: "DirectoryCtrl"
                    }
                }
            })
            .state('cns.meeting', {
                url: "/meeting/:id",
                views: {
                    'menuContent': {
                        templateUrl: "meeting.html",
                        controller: "MeetingCtrl"
                    }
                }
            })
            .state('cns.meeting-edit', {
                url: "/meeting/:id/edit",
                views: {
                    'menuContent': {
                        templateUrl: "meeting-edit.html",
                        controller: "MeetingEditCtrl"
                    }
                }
            })
            .state('cns.meeting-add', {
                url: "/meeting-add",
                views: {
                    'menuContent': {
                        templateUrl: "meeting-edit.html",
                        controller: "MeetingAddCtrl"
                    }
                }
            })
            .state('cns.select-attendees', {
                url: "/select-attendees/:id",
                views: {
                    'menuContent': {
                        templateUrl: "select-attendees.html",
                        controller: "SelectAttendiesCtrl"
                    }
                }
            })
            .state('cns.team-member', {
                url: "/team-member/:id",
                views: {
                    'menuContent': {
                        templateUrl: "team-member.html",
                        controller: "TeamMemberCtrl"
                    }
                }
            })
            .state('cns.team-member-edit', {
                url: "/team-member/:id/edit",
                views: {
                    'menuContent': {
                        templateUrl: "team-member-edit.html",
                        controller: "TeamMemberEditCtrl"
                    }
                }
            })
            .state('cns.teammember-add', {
                url: "/teammember-add",
                views: {
                    'menuContent': {
                        templateUrl: "team-member-edit.html",
                        controller: "TeamMemberAddCtrl"
                    }
                }
            })
            .state('cns.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "login.html",
                        controller: "LoginCtrl"
                    }
                }
            })
            .state('cns.meeting-search', {
                url: "/meeting-search",
                views: {
                    'menuContent': {
                        templateUrl: "meeting-search.html",
                        controller: "MeetingSearchCtrl"
                    }
                }
            })
            .state('cns.teammember-search', {
                url: "/teammember-search",
                views: {
                    'menuContent': {
                        templateUrl: "teammember-search.html",
                        controller: "TeamMemberSearchCtrl"
                    }
                }
            })
            .state('cns.locations', {
                url: "/locations/:type/:id",
                views: {
                    'menuContent': {
                        templateUrl: "locations.html",
                        controller: "LocationsCtrl"
                    }
                }
            })
            .state('cns.locations-add', {
                url: "/locations-add/:type/:id",
                views: {
                    'menuContent': {
                        templateUrl: "locations-add.html",
                        controller: "LocationsAddCtrl"
                    }
                }
            })
            .state('cns.locations-edit', {
                url: "/locations-edit/:id",
                views: {
                    'menuContent': {
                        templateUrl: "locations-add.html",
                        controller: "LocationsEditCtrl"
                    }
                }
            })
            .state('cns.my-profile', {
                url: "/my-profile",
                views: {
                    'menuContent': {
                        templateUrl: "my-profile.html",
                        controller: "MyProfileCtrl"
                    }
                }
            })
            .state('cns.add-comments', {
                url: "/add-comments/:id",
                views: {
                    'menuContent': {
                        templateUrl: "add-comments.html",
                        controller: "AddCommentsCtrl"
                    }
                }
            })

        ;

        $urlRouterProvider.otherwise("/login");
    })

    .filter('fullNameFilter', function(){
      return function(dataArray, searchTerm){
          if(!dataArray ) return;
          if( !searchTerm){
              return dataArray
           }else{
               var term=searchTerm.toLowerCase();
               return dataArray.filter(function( item){
                  return item.User.FirstName.toLowerCase().indexOf(term) > -1 || item.User.LastName.toLowerCase().indexOf(term) > -1;    
               });
           } 
      }
    })
	
    .controller('MainCtrl', function ($scope, $location, roleService, $ionicSideMenuDelegate, $rootScope) {
        $scope.roleService = roleService;

        $scope.profile = function() {
            $ionicSideMenuDelegate.toggleLeft()
            $location.url("/my-profile");
        }
        $scope.locations = function() {
            $ionicSideMenuDelegate.toggleLeft()
            $location.url("/locations/region/0");
        }
        $scope.logout = function() {
            $ionicSideMenuDelegate.toggleLeft()
            $rootScope.user = { ApiKey: '' };
            try {
                localStorage.setItem('user', JSON.stringify($rootScope.user));
            } catch(e) {}
            $location.url("/login");
        }
    })
	
    .controller('LoginCtrl', function ($rootScope, $scope, $location, userService, $http, $base64) {
		
		$scope.auth = {};

        $scope.login = function() {
			userService.login($scope.auth.Email, $scope.auth.Password).then(function (d) {
				if (d.status == "OK") {
					$rootScope.user = {
						"Email":  $scope.auth.Email,
						"ApiKey": d.ApiKey,
						"Role" :  d.Role,
                        "UserId" : d.UserId
					};
					try {
						localStorage.setItem('user', JSON.stringify($rootScope.user));
					} catch(e) {}
					$location.url("/directory/meetings");
					return;
				}
				
				$scope.error = "Please check email and password";
            }, function(data, status){
				$scope.error = 'Email or password incorrect';
			});
        };
		
		$scope.init = function() {
			var user;
			try {
				user = JSON.parse(localStorage.getItem('user'));
			} catch(e) {
				user = $rootScope.user;
			}
			
			if (user && user.ApiKey != '') {
				$location.url("/directory/meetings");
			}
		};
		$scope.init();
		
    })

    .controller('DirectoryCtrl', function ($scope, meetingService, userService, $location, roleService, $stateParams, $ionicTabsDelegate, $timeout, $ionicSideMenuDelegate, $ionicLoading) {

        if ($stateParams.tab == "meetings") {
            $timeout(function(){
                $ionicTabsDelegate.select(0);
            },0);
        } else if ($stateParams.tab == "members") {
            $timeout(function(){
                $ionicTabsDelegate.select(1);
            },0);
        }
	
		$scope.roleService = roleService;
        
		$scope.users = [];
		$scope.meetings = [];
		
		$scope.membersPage = 0;
		$scope.meetingsPage = 0;
		
		$scope.pageSize = 20;

        $ionicLoading.show({
          template: 'Loading...'
        });

        var loadComplete = false;
		
		$scope.loadMoreMembers = function() {
            $ionicLoading.show({
              template: 'Loading...'
            });
			userService.page($scope.membersPage, $scope.pageSize).then(function(data) {
                if (loadComplete)
                    $ionicLoading.hide();
                else
                    loadComplete = true;
				$scope.membersLoaded = data.length < $scope.pageSize;
				$scope.users = $scope.users.concat(data);
				$scope.membersPage++;
			});
		};
		
		$scope.loadMoreMeetings = function() {
            $ionicLoading.show({
              template: 'Loading...'
            });
			meetingService.page($scope.meetingsPage, $scope.pageSize).then(function(data) {
                if (loadComplete)
                    $ionicLoading.hide();
                else
                    loadComplete = true;
				$scope.meetingsLoaded = data.length < $scope.pageSize;
				$scope.meetings = $scope.meetings.concat(data);
				$scope.meetingsPage++;
			});
		};
		
		$scope.init = function(){
			
			$scope.loadMoreMeetings();
			$scope.loadMoreMembers();
		};
		$scope.init();

		// Nav
        $scope.addMeeting       = function() { $location.url("/meeting-add"); };
        $scope.addMember        = function() { $location.url("/teammember-add"); };
        $scope.settings         = function() { $ionicSideMenuDelegate.toggleLeft() };
        $scope.meetingSearch    = function() { $location.url("/meeting-search"); };
        $scope.teamMemberSearch = function() { $location.url("/teammember-search"); };
    })

    .controller('MeetingCtrl', function ($scope, $stateParams, $location, $ionicPopup, meetingService, userService, registrationService, roleService, $ionicLoading, locationService) {
	
		$scope.roleService = roleService;

        $ionicLoading.show({
          template: 'Loading...'
        });
        
        $scope.pageSize = 20;
		
        meetingService.get($stateParams.id).then(function(data) {
            $scope.quantity = $scope.pageSize;
            $scope.meeting = data;
            $ionicLoading.hide();
            console.log($scope.meeting.Registrations);
        });

        // RDT
        $scope.search = {};
        $scope.selectedRegion = {};
        $scope.selectedDistrict = {};
        $scope.selectedTerritory = {};

        $scope.listLocations = function () {
            locationService.list()
                .then(function (d) {
                    $scope.locations = d;
                    $scope.gridOptions.data = d;
                });
        }
        $scope.loadRegions = function () {
            locationService.regions(0, 100)
                .then(function (d) {
                    $scope.regions = d;
                });
        }
        $scope.loadDistricts = function () {
            $scope.districts = [];
            $scope.selectedDistrict = {};
            console.log($scope.search);

            locationService.districts($scope.search.regions, 0, 100)
                .then(function (d) {
                    $scope.districts = d;
                    $scope.loadTerritories();
                });
        }
        $scope.loadTerritories = function () {
            $scope.territories = [];
            $scope.selectedTerritory = {};

            locationService.territories($scope.search.regions, $scope.search.districts, 0, 100)
                .then(function (d) {
                    $scope.territories = d;
            });
        }

        $scope.regionChange = function() {
            $scope.loadDistricts();
            //$scope.onChange();
        };
        $scope.districtChange = function() {
            $scope.loadTerritories();
            //$scope.onChange();
        };
        $scope.territoryChange = function() {
            //$scope.onChange();  
        }
        $scope.loadRegions();

        $scope.loadMoreMembers = function() {
            $scope.quantity += $scope.pageSize;
        };

        $scope.locationFilter = function(registration) {
            if ($scope.search.territories != undefined && $scope.search.territories != null ) {
                $scope.search.location = $scope.search.territories;
            } else if ($scope.search.districts != undefined && $scope.search.districts != null) {
                for (var i = 0; i < $scope.districts.length; i++) {
                    if ($scope.districts[i].District == $scope.search.districts) {
                        $scope.search.location = $scope.districts[i].Id;
                        break
                    }
                };
            } else if ($scope.search.regions != undefined && $scope.search.regions != null) {
                for (var i = 0; i < $scope.regions.length; i++) {
                    if ($scope.regions[i].Region == $scope.search.regions) {
                        $scope.search.location = $scope.regions[i].Id;
                        break
                    }
                };
            } else 
                return true;

            if (registration.User.LocationId == $scope.search.location)
                return true;
            else
                return false;
        }

        $scope.delete = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Meeting delete',
				template: 'Are you sure you want to delete "' + $scope.meeting.Name + '"?'
			}).then(function(res) {
				if (res) {
					if ($scope.meeting.Registrations.length == 0) {
						$scope.deleteMeeting();
						return;
					}
						
					for (var i = 0; i < $scope.meeting.Registrations.length; i++) {
						var reg = $scope.meeting.Registrations[i];
						registrationService.delete({ MeetingID: reg.MeetingID, UserID: reg.UserID }).then(function(data){
							$scope.deleteMeeting();
						}, function(data, status){
                            $ionicPopup.alert({
                                title: 'Error',
                                template: data.Message
                           });
                        });
					}
				}
			});
        };
		
		$scope.deletedRegsCounter = 0;
		$scope.deleteMeeting = function() {
			if (++$scope.deletedRegsCounter < $scope.meeting.Registrations.length)
				return;
				
			meetingService.delete($scope.meeting.Id).then(function(data) {
				$location.url("/directory/meetings");     
			}, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
		};

		// Nav
        $scope.menu = function() { $location.url("/directory/meetings"); };
        $scope.edit = function() { $location.url("/meeting/" + $scope.meeting.Id + "/edit"); };
    })

    .controller('MeetingEditCtrl', function ($ionicPopup, $scope, $filter, meetingService, $stateParams, userService, $location, locationService, registrationService, $ionicLoading) {
	
		$scope.meeting = {};
	
		$scope.getMeeting = function() {
            $ionicLoading.show({
              template: 'Loading...'
            });
			meetingService.get($stateParams.id).then(function(data) {
                $ionicLoading.hide();
				$scope.meeting = data;
				
				$scope.meeting.Time = $filter('date')($scope.meeting.Date, 'HH:mm:ss',   'UTC');
				$scope.meeting.Date = $filter('date')($scope.meeting.Date, 'yyyy-MM-dd', 'UTC');
			});
		};
		$scope.getMeeting();

        locationService.list().then(function(data) {
            $scope.locations = data;
        });

        $scope.uploadListAttendees = function() {
			$scope.prepareMeetingDate();
		
			meetingService.set($scope.meeting).then(function() {
				var file = angular.element(document.querySelector('#xls'))[0].files[0];
				meetingService.bulkRegistration($scope.meeting.Id, file).then(function() {
					$scope.getMeeting();
				});
            }, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
		};
		
        $scope.deleteAttendee = function(id) {
            confirmPopup = $ionicPopup.confirm({
                title: 'Attendee delete',
                template: 'Are you sure you want to delete attendee?'
            }).then(function(res) {
                if (res) {
                    registrationService.delete({
                          MeetingID: $stateParams.id
                        , UserID: id
                    }, function(data, status){
                        $ionicPopup.alert({
                            title: 'Error',
                            template: data.Message
                       });
                    }).then(function(data){
                        $scope.getMeeting();
                    });
                }
            });
		};
		

		$scope.prepareMeetingDate = function() {
            $scope.meeting.Date = $scope.meeting.Date + "T" + $scope.meeting.Time;
            delete $scope.meeting.Time;
		};

        $scope.save = function() {
			$scope.prepareMeetingDate();
			
			meetingService.set($scope.meeting).then(function() {
				var file = angular.element(document.querySelector('#image'))[0].files[0];
				meetingService.uploadImage($scope.meeting.Id, file).then(function () {
					$location.url("/directory/meetings");
				});
            }, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
        };
		
        $scope.addAttendees = function() {
			$scope.prepareMeetingDate();
			
			meetingService.set($scope.meeting).then(function() {
				$location.url("/select-attendees/" + $scope.meeting.Id);
            }, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
		};
		
        $scope.cancel = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Discard changes',
				template: 'Are you sure you want to discard changes?'
			}).then(function(res) {
				if (res) {
					$location.url("/directory/meetings");
				}
			});
		};
    })

    .controller('MeetingAddCtrl', function ($ionicPopup, $scope, $filter, meetingService, $stateParams, $location, locationService) {
		$scope.meeting = {
			  Name: 'New Meeting'
			, Time: $filter('date')(new Date(), 'HH:mm:ss',   'UTC')
			, Date: $filter('date')(new Date(), 'yyyy-MM-dd', 'UTC')
		};
		$scope.locations = [];

        locationService.list().then(function(data) {
            $scope.locations = data;
        });

		
		$scope.addAttendees = function() {
			$scope.prepareMeetingDate();
            meetingService.add($scope.meeting).then(function(data) {
				var file = angular.element(document.querySelector('#image'))[0].files[0];
				meetingService.uploadImage(data.Id, file).then(function () {
					$location.url("/select-attendees/" + data.Id);
				});
            }, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
		};
		
		$scope.uploadListAttendees = function() {
			meetingService.add($scope.meeting).then(function(data) {
				var file = angular.element(document.querySelector('#xls'))[0].files[0];
				meetingService.bulkRegistration(data.Id, file).then(function() {
					$location.url("/meeting/" + data.Id + "/edit");
				});
            }, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
		};

		$scope.prepareMeetingDate = function() {
            $scope.meeting.Date = $scope.meeting.Date + "T" + $scope.meeting.Time;
            delete $scope.meeting.Time;
		};
		
        $scope.save = function() {
			$scope.prepareMeetingDate();
            meetingService.add($scope.meeting).then(function(data) {
				var file = angular.element(document.querySelector('#image'))[0].files[0];
                meetingService.uploadImage(data.Id, file).then(function () {
					$location.url("/directory/meetings");
				});
            }, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
        };

		// Nav
        $scope.cancel = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Discard changes',
				template: 'Are you sure you want to discard changes?'
			}).then(function(res) {
				if (res) {
					$location.url("/directory/meetings");
				}
			});
		};
    })

    .controller('SelectAttendiesCtrl', function ($ionicPopup, $scope, $rootScope, $stateParams, $location, meetingService, registrationService, locationService, $ionicLoading) {
        
        $scope.search = {text: '', location:0};

        $ionicLoading.show({
          template: 'Loading...'
        });
        
        $scope.loadMoreMembers = function() {
            if ($scope.search.location == 0) {
                if ($scope.search.text.length > 2) {
                    meetingService.findUnregisteredUsersWithNamePage($stateParams.id, $scope.search.text, $scope.page, $scope.pageSize).then($scope.initUserList);
                } else {
                    $ionicLoading.hide();
                    meetingService.getUnregisteredUsersPage($stateParams.id, $scope.page, $scope.pageSize).then($scope.initUserList);
                }
            } else {
                meetingService.findUnregisteredUsersByLocationWithNamePage($stateParams.id, $scope.search.text, $scope.search.location, $scope.page, $scope.pageSize).then($scope.initUserList);
            }
        };

        $scope.initUserList = function(data) {
            $scope.membersLoaded = data.length < $scope.pageSize;
            $scope.members = $scope.members.concat(data);
            $scope.page++;
        }
        
        $scope.init = function() {
            $scope.page = 0;
            $scope.membersLoaded = true;
            $scope.members = [];
            $scope.notes = 'Please enter at least three characters';
        };

         $scope.selectedRegion = {};
        $scope.selectedDistrict = {};
        $scope.selectedTerritory = {};

        $scope.listLocations = function () {
            locationService.list()
                .then(function (d) {
                    $scope.locations = d;
                    $scope.gridOptions.data = d;
                });
        }
        $scope.loadRegions = function () {
            locationService.regions(0, 100)
                .then(function (d) {
                    $scope.regions = d;
                });
        }
        $scope.loadDistricts = function () {
            $scope.districts = [];
            $scope.selectedDistrict = {};

            locationService.districts($scope.search.regions, 0, 100)
                .then(function (d) {
                    $scope.districts = d;
                    $scope.loadTerritories();
                });
        }
        $scope.loadTerritories = function () {
            $scope.territories = [];
            $scope.selectedTerritory = {};

            locationService.territories($scope.search.regions, $scope.search.districts, 0, 100)
                .then(function (d) {
                    $scope.territories = d;
            });
        }

        $scope.regionChange = function() {
            $scope.loadDistricts();
            $scope.onChange();
        };
        $scope.districtChange = function() {
            $scope.loadTerritories();
            $scope.onChange();
        };
        $scope.territoryChange = function() {
            $scope.onChange();  
        }
        $scope.loadRegions();
        
        $scope.handleFirstResults  = function(data) {           
            if (data.length == 0) {
                $scope.notes = 'No users found';
                $scope.users = [];
                return;
            }
        
            $scope.usersLoaded = data.length < $scope.pageSize;
            if ($scope.search.text.length == 0 && $scope.search.location == 0) {
                $scope.notes = 'Please enter at least three characters';
            } else {
                $scope.notes = '';
            }
            $scope.users = data;
            $scope.usersPage++;
        };

        $scope.onChange = function() {
            if ($scope.search.territories != undefined && $scope.search.territories != null ) {
                $scope.search.location = $scope.search.territories;
            } else if ($scope.search.districts != undefined && $scope.search.districts != null) {
                for (var i = 0; i < $scope.districts.length; i++) {
                    if ($scope.districts[i].District == $scope.search.districts) {
                        $scope.search.location = $scope.districts[i].Id;
                        break
                    }
                };
            } else if ($scope.search.regions != undefined && $scope.search.regions != null) {
                for (var i = 0; i < $scope.regions.length; i++) {
                    if ($scope.regions[i].Region == $scope.search.regions) {
                        $scope.search.location = $scope.regions[i].Id;
                        break
                    }
                };
            } else 
                $scope.search.location = 0;
            if ($scope.search.location != 0 && $scope.search.text == "") {
                meetingService.findUnregisteredUsersByLocationPage($stateParams.id, $scope.search.location, 0, $scope.pageSize).then($scope.handleFirstResults);
            } else if ($scope.search.text.length > 2 && $scope.search.location != 0 && $scope.search.text != "") {
                meetingService.findUnregisteredUsersByLocationWithNamePage($stateParams.id, $scope.search.location, $scope.search.text, 0, $scope.pageSize).then($scope.handleFirstResults);
            } else if ($scope.search.text.length > 2 && $scope.search.location == 0) {
                meetingService.findUnregisteredUsersWithNamePage($stateParams.id, $scope.search.text, 0, $scope.pageSize).then($scope.handleFirstResults);
            } else if ($scope.search.text.length == 0 && $scope.search.location == 0) {
                meetingService.getUnregisteredUsersPage($stateParams.id, 0, $scope.pageSize).then($scope.handleFirstResults);
            } else {
                $scope.init();    
            }
        };

        $scope.handleFirstResults  = function(data) {           
            if (data.length == 0) {
                $scope.notes = 'No users found';
                $scope.members = [];
                return;
            }
        
            $scope.membersLoaded = data.length < $scope.pageSize;
            $scope.notes = '';
            $scope.members = data;
            $scope.page++;
        };

        $scope.blur = function() {
            document.getElementById('memberSearchText').blur();
        };

		
		$scope.members = [];
		$scope.page = 0;
		$scope.pageSize = 20;
        $scope.membersLoaded = true;
		
        meetingService.getUnregisteredUsersPage($stateParams.id, $scope.page, $scope.pageSize).then($scope.initUserList);
	
        $scope.select = function() {
			$rootScope.recentAttendees = [];
			for (var i = 0; i < $scope.members.length; i++) {
				var member = $scope.members[i];
				if (member.selected == true) {
					var r = {
						  UserID:    member.Id
						, MeetingID: $stateParams.id
						, Notes:     ''
						, Notes2:     ''
						, Notes3:     ''
						, FirstName: member.FirstName
						, LastName:  member.LastName
					};
					$rootScope.recentAttendees.push(r);
					registrationService.add(r);
				}
			}
			$location.url("/add-comments/" + $stateParams.id);
		};

		// Nav
        $scope.cancel = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Discard changes',
				template: 'Are you sure you want to discard changes?'
			}).then(function(res) {
				if (res) {
					$location.url("/meeting/" + $stateParams.id + "/edit");
				}
			});
		};
    })

	.controller('AddCommentsCtrl', function ($scope, $location, $stateParams, $rootScope, userService, registrationService) {
	
		$scope.attendees = $rootScope.recentAttendees;
		
		$scope.save = function() {
			for (var i = 0; i < $scope.attendees.length; i++) {
				registrationService.set($scope.attendees[i]);
			}
			$rootScope.recentAttendees = [];
			$location.url("/meeting/" + $stateParams.id + "/edit");
		};
		
	})

    .controller('TeamMemberCtrl', function ($scope, $stateParams, $ionicPopup, userService, $location, roleService) {
		
		$scope.roleService = roleService;
	
		$scope.roles = roleService.get();
	
        userService.get($stateParams.id).then(function(data) {
            $scope.user = data;
        });

        $scope.delete = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Member delete',
				template: 'Are you sure you want to delete ' + $scope.user.FirstName + ' ' + $scope.user.LastName + '?'
			}).then(function(res) {
				if (res) {
					userService.delete($scope.user.Id).then(function(data) {
						$location.url("/directory/members");   
					}, function(data, status){
                        $ionicPopup.alert({
                            title: 'Error',
                            template: data.Message
                       });
                    });
				}
			});
        };

		// Nav
        $scope.edit = function() { $location.url("/team-member/" + $scope.user.Id + "/edit"); };
        $scope.menu = function() { $location.url("/directory/members"); };
    })

    .controller('TeamMemberEditCtrl', function ($ionicPopup, $scope, userService, $stateParams, $location, locationService, roleService) {
		$scope.roles = roleService.getWithIds();
		$scope.user = {};
	
        userService.get($stateParams.id).then(function(data) {
			$scope.user = data;
            locationService.regions(0, 100)
                .then(function (d) {
                    $scope.regions = d;
                    for (var i = 0; i < $scope.regions.length; i++) {
                        if ($scope.user.Location.Region == $scope.regions[i].Region) {
                            $scope.user.Location.Region = $scope.regions[i];
                            break;
                        }
                    };
                });
            locationService.districts($scope.user.Location.Region, 0, 100)
                .then(function (d) {
                    $scope.districts = d;
                    for (var i = 0; i < $scope.districts.length; i++) {
                        if ($scope.user.Location.District == $scope.districts[i].District) {
                            $scope.user.Location.District = $scope.districts[i];
                            break;
                        }
                    };
                });
            locationService.territories($scope.user.Location.Region, $scope.user.Location.District, 0, 100)
                .then(function (d) {
                    $scope.territories = d;
                    for (var i = 0; i < $scope.territories.length; i++) {
                        if ($scope.user.Location.Territory == $scope.territories[i].Territory) {
                            $scope.user.Location.Territory = $scope.territories[i];
                            break;
                        }
                    };
            });
        });

        $scope.regionChange = function() {
            $scope.territories = false;
            locationService.districts($scope.user.Location.Region.Region, 0, 100)
                .then(function (d) {
                    $scope.districts = d;
                });
        }

        $scope.districtChange = function() {
            locationService.territories($scope.user.Location.Region.Region, $scope.user.Location.District.District, 0, 100)
                .then(function (d) {
                    $scope.territories = d;
                });
        }

        $scope.save = function() {
			
			if ($scope.user.Location.Territory.Id || $scope.user.Location.District.Id || $scope.user.Location.Region.Id) {
				if ($scope.user.Location.Territory.Id) {
					$scope.user.Location.LocationType = 'Territory';
				} else if ($scope.user.Location.District.Id) {
					$scope.user.Location.LocationType = 'District';
				} else if ($scope.user.Location.Region.Id) {
					$scope.user.Location.LocationType = 'Region';
				}
			
				$scope.user.Location.Id        = $scope.user.Location[$scope.user.Location.LocationType].Id;
				$scope.user.Location.Name      = $scope.user.Location[$scope.user.Location.LocationType].Name;
				$scope.user.Location.RDT       = $scope.user.Location[$scope.user.Location.LocationType].RDT;
				$scope.user.Location.Region    = $scope.user.Location.Region.Id    ? $scope.user.Location.Region.Region       : '00';
				$scope.user.Location.District  = $scope.user.Location.District.Id  ? $scope.user.Location.District.District   : '00';
				$scope.user.Location.Territory = $scope.user.Location.Territory.Id ? $scope.user.Location.Territory.Territory : '00';
			}
			
            userService.set($scope.user).then(function(data) {
				var file = angular.element(document.querySelector('#image'))[0].files[0];
				userService.uploadImage($scope.user.Id, file).then(function () {
					$location.url("/team-member/" + $scope.user.Id);
				});
            }, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
        };

		// Nav
        $scope.cancel = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Discard changes',
				template: 'Are you sure you want to discard changes?'
			}).then(function(res) {
				if (res) {
					$location.url("/team-member/" + $scope.user.Id);
				}
			});
		};
    })

    .controller('TeamMemberAddCtrl', function ($ionicPopup, $scope, $location, locationService, userService, roleService) {
		$scope.roles = roleService.getWithIds();
		$scope.user = {};
		$scope.regions = [];
		
		locationService.regions(0, 100)
			.then(function (d) {
				$scope.regions = d;
				for (var i = 0; i < $scope.regions.length; i++) {
					if ($scope.user.Location.Region == $scope.regions[i].Region) {
						$scope.user.Location.Region = $scope.regions[i];
						break;
					}
				};
			});
		
		
		$scope.regionChange = function() {
            $scope.territories = false;
            locationService.districts($scope.user.Location.Region.Region, 0, 100)
                .then(function (d) {
                    $scope.districts = d;
                });
        };

        $scope.districtChange = function() {
            locationService.territories($scope.user.Location.Region.Region, $scope.user.Location.District.District, 0, 100)
                .then(function (d) {
                    $scope.territories = d;
                });
        };

        $scope.save = function() {
		
            if ($scope.user.Location.Territory || $scope.user.Location.District || $scope.user.Location.Region) {
				if ($scope.user.Location.Territory) {
					$scope.user.Location.LocationType = 'Territory';
				} else if ($scope.user.Location.District) {
					$scope.user.Location.LocationType = 'District';
				} else if ($scope.user.Location.Region) {
					$scope.user.Location.LocationType = 'Region';
				}
			
				$scope.user.Location.Id        = $scope.user.Location[$scope.user.Location.LocationType].Id;
				$scope.user.Location.Name      = $scope.user.Location[$scope.user.Location.LocationType].Name;
				$scope.user.Location.RDT       = $scope.user.Location[$scope.user.Location.LocationType].RDT;
				$scope.user.Location.Region    = $scope.user.Location.Region    ? $scope.user.Location.Region.Region       : '00';
				$scope.user.Location.District  = $scope.user.Location.District  ? $scope.user.Location.District.District   : '00';
				$scope.user.Location.Territory = $scope.user.Location.Territory ? $scope.user.Location.Territory.Territory : '00';
			}
			
			userService.add($scope.user).then(function(data) {
				var file = angular.element(document.querySelector('#image'))[0].files[0];
				userService.uploadImage(data.Id, file).then(function () {
					$location.url("/team-member/" + data.Id);
				});
            }, function(data, status){
                $ionicPopup.alert({
                    title: 'Error',
                    template: data.Message
               });
            });
        };

		// Nav
        $scope.cancel = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Discard changes',
				template: 'Are you sure you want to discard changes?'
			}).then(function(res) {
				if (res) {
					$location.url("/directory/members"); 
				}
			});
		};
    })

    .controller('MeetingSearchCtrl', function ($scope, meetingService, $location) {
		$scope.search = {text: ''};

        $scope.pageSize = 20;
        
        $scope.loadMoreMeetings = function() {
            meetingService.findByNamePaged($scope.search.text, $scope.meetingsPage, $scope.pageSize).then(function(data) {
                $scope.meetingsLoaded = data.length < $scope.pageSize;
                $scope.meetings = $scope.meetings.concat(data);
                $scope.meetingsPage++;
            });
        };
		
		$scope.init = function() {
            $scope.meetingsPage = 0;
            $scope.meetingsLoaded = true;
			$scope.meetings = [];
			$scope.notes = 'Please enter at least three characters';
		};
	
        $scope.onChange = function() {
            if ($scope.search.text.length > 2) {
                meetingService.findByNamePaged($scope.search.text, 0, $scope.pageSize).then(function(data) {
                    $scope.meetingsLoaded = data.length > 0 && data.length < $scope.pageSize;
                    $scope.notes = (data.length == 0) ? 'No meetings found' : '';
                    $scope.meetings = data;
                    $scope.meetingsPage++;
                });
            } else {
                $scope.init();
            }
        };
		
		$scope.blur = function() {
			document.getElementById('meetingSearchText').blur();
		};

		$scope.init();
		
		// Nav
        $scope.menu = function() { $location.url("/directory/meetings"); };
    })

    .controller('TeamMemberSearchCtrl', function ($scope, userService, $location, locationService, $ionicLoading) {
        $scope.search = {text: '', location:0};

        $scope.pageSize = 20;

        $ionicLoading.show({
          template: 'Loading...'
        });
        
        $scope.loadMoreMeetings = function() {
            if ($scope.search.location == 0) {
                userService.pageByName($scope.search.text, $scope.usersPage, $scope.pageSize).then($scope.initUserList);
            } else {
                userService.findByNameAndLocationPaged($scope.search.text, $scope.search.location, $scope.usersPage, $scope.pageSize).then($scope.initUserList);
            }
        };

        $scope.initUserList = function(data) {
            $scope.usersLoaded = data.length < $scope.pageSize;
            $scope.users = $scope.users.concat(data);
            $scope.usersPage++;
        }
		
		$scope.init = function() {
            $scope.usersPage = 0;
            $scope.usersLoaded = true;
			$scope.users = [];
			$scope.notes = 'Please enter at least three characters';
		};

        // RDT
        $scope.selectedRegion = {};
        $scope.selectedDistrict = {};
        $scope.selectedTerritory = {};

        $scope.listLocations = function () {
            locationService.list()
                .then(function (d) {
                    $scope.locations = d;
                    $scope.gridOptions.data = d;
                });
        }
        $scope.loadRegions = function () {
            locationService.regions(0, 100)
                .then(function (d) {
                    $scope.regions = d;
                });
        }
        $scope.loadDistricts = function () {
            $scope.districts = [];
            $scope.selectedDistrict = {};

            locationService.districts($scope.search.regions, 0, 100)
                .then(function (d) {
                    $scope.districts = d;
                    $scope.loadTerritories();
                });
        }
        $scope.loadTerritories = function () {
            $scope.territories = [];
            $scope.selectedTerritory = {};

            locationService.territories($scope.search.regions, $scope.search.districts, 0, 100)
                .then(function (d) {
                    $scope.territories = d;
            });
        }

        $scope.regionChange = function() {
            $scope.loadDistricts();
            $scope.onChange();
        };
        $scope.districtChange = function() {
            $scope.loadTerritories();
            $scope.onChange();
        };
        $scope.territoryChange = function() {
            $scope.onChange();  
        }
        $scope.loadRegions();
		
		$scope.handleFirstResults  = function(data) {			
			if (data.length == 0) {
				$scope.notes = 'No users found';
				$scope.users = [];
				return;
			}
		
			$scope.usersLoaded = data.length < $scope.pageSize;
            if ($scope.search.text.length == 0 && $scope.search.location == 0) {
                $scope.notes = 'Please enter at least three characters';
            } else {
			    $scope.notes = '';
            }
			$scope.users = data;
			$scope.usersPage++;
		};

        $scope.onChange = function() {
            if ($scope.search.territories != undefined && $scope.search.territories != null ) {
                $scope.search.location = $scope.search.territories;
            } else if ($scope.search.districts != undefined && $scope.search.districts != null) {
                for (var i = 0; i < $scope.districts.length; i++) {
                    if ($scope.districts[i].District == $scope.search.districts) {
                        $scope.search.location = $scope.districts[i].Id;
                        break
                    }
                };
            } else if ($scope.search.regions != undefined && $scope.search.regions != null) {
                for (var i = 0; i < $scope.regions.length; i++) {
                    if ($scope.regions[i].Region == $scope.search.regions) {
                        $scope.search.location = $scope.regions[i].Id;
                        break
                    }
                };
            } else 
                $scope.search.location = 0;
            if ($scope.search.location != 0 && $scope.search.text == "") {
                userService.pageByLocation($scope.search.location, 0, $scope.pageSize).then($scope.handleFirstResults);
            } else if ($scope.search.text.length > 2 && $scope.search.location != 0 && $scope.search.text != "") {
                userService.findByNameAndLocationPaged($scope.search.text, $scope.search.location, 0, $scope.pageSize).then($scope.handleFirstResults);
            } else if ($scope.search.text.length > 2 && $scope.search.location == 0) {
				userService.pageByName($scope.search.text, 0, $scope.pageSize).then($scope.handleFirstResults);
			} else if ($scope.search.text.length == 0 && $scope.search.location == 0) {
                userService.page($scope.usersPage, $scope.pageSize).then($scope.handleFirstResults);
            } else {
                $scope.init();    
            }
        };
		
		$scope.blur = function() {
			document.getElementById('memberSearchText').blur();
		};
		
		$scope.init();

        userService.page($scope.usersPage, $scope.pageSize).then(function(data) {
            $ionicLoading.hide();
            $scope.usersLoaded = data.length < $scope.pageSize;
            $scope.users = $scope.users.concat(data);
            $scope.membersPage++;
        });

		// Nav
        $scope.menu = function() { $location.url("/directory/members"); };
    })

    .controller('LocationsCtrl', function ($scope, locationService, $location, $stateParams) {
        
		$scope.locations = [];		
		$scope.page = 0;
		$scope.pageSize = 20;
		$scope.title = 'Locations';
		
		$scope.loadMoreLocations = function() {
            if ($stateParams.type == "region") {
				$scope.title = 'Regions';
                locationService.regions($scope.page, $scope.pageSize).then(function(data) {
    				$scope.loaded = data.length < $scope.pageSize;
                    for (var i = 0; i < data.length; i++) {
                        data[i].url = data[i].Region;
                    };
    				$scope.locations = $scope.locations.concat(data);
    				$scope.page++;
    			});
            } else if ($stateParams.type == "district") {
				$scope.title = 'Districts';
                locationService.districts($stateParams.id, $scope.page, $scope.pageSize).then(function(data) {
                    $scope.loaded = data.length < $scope.pageSize;
                    for (var i = 0; i < data.length; i++) {
                        data[i].url = data[i].District;
                    };
                    $scope.locations = $scope.locations.concat(data);
                    $scope.page++;
                });
            } else {
				$scope.title = 'Territories';
                var par = $stateParams.id.split(",");
                locationService.territories(par[0], par[1], $scope.page, $scope.pageSize).then(function(data) {
                    $scope.loaded = data.length < $scope.pageSize;
                    $scope.locations = $scope.locations.concat(data);
                    $scope.page++;
                });
            }
		};
		$scope.loadMoreLocations();
		
		// Nav
        $scope.edit = function(id) {
            $location.url("/locations-edit/" + id);
        };
        $scope.add  = function()   {
            if ($stateParams.type == "region") {
                $location.url("/locations-add/region/0");
            } else if ($stateParams.type == "district") {
                $location.url("/locations-add/district/" + $stateParams.id);
            } else if ($stateParams.type == "territory") {
                $location.url("/locations-add/territory/" + $stateParams.id);
            }
        };
        $scope.back = function()   {
            if ($stateParams.type == "region")
                $location.url("/directory/meetings");
            else
                window.history.back();
        };
        $scope.next = function(id) {
            if ($stateParams.type == "region") {
                $location.url("/locations/district/" + id);
            } else if ($stateParams.type == "district") {
                $location.url("/locations/territory/" + $stateParams.id + "," + id);
            }
        }
    })

    .controller('LocationsAddCtrl', function ($ionicPopup, $scope, $location, locationService, $stateParams) {
        $scope.location = {};
        if ($stateParams.type == "region") {
            $scope.location.Region = "00";
            $scope.location.District = "00";
            $scope.location.Territory = "00";
            $scope.location.LocationType = "Region";
        } else if ($stateParams.type == "district") {
            $scope.location.Region = $stateParams.id;
            $scope.location.District = "00";
            $scope.location.Territory = "00";
            $scope.location.LocationType = "District";
        } else if ($stateParams.type == "territory") {
            var par = $stateParams.id.split(",");
            $scope.location.Region = par[0];
            $scope.location.District = par[1];
            $scope.location.Territory = "00";
            $scope.location.LocationType = "Territory";
        }

        $scope.save = function() {
            locationService.add($scope.location).then(function() {
                var path = '/locations/region/0';
				switch ($stateParams.type) {
					case "district":  path = '/locations/district/' + $scope.location.Region; break;
					case "territory": path = '/locations/territory/' + $scope.location.Region + ',' + $scope.location.District; break;
				};
				$location.url(path);
            });
        };

		// Nav
        $scope.cancel = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Discard changes',
				template: 'Are you sure you want to discard changes?'
			}).then(function(res) {
				if (res) {
					$location.url("/locations");
				}
			});
		};
    })

    .controller('LocationsEditCtrl', function ($scope, $location, $stateParams, $ionicPopup, locationService) {
        $scope.location = {};

        locationService.get($stateParams.id).then(function(data) {
            $scope.location = data;
            console.log(data);

            if ($scope.location.LocationType == "District") {
                locationService.regions(0, 100)
                    .then(function (d) {
                        for (var i = 0; i < d.length; i++) {
                            if (d[i].Region == $scope.location.Region) {
                                $scope.region = d[i].Name;
                                break
                            }
                        };
                    });
            }
            if ($scope.location.LocationType == "Territory") {
                locationService.regions(0, 100)
                    .then(function (d) {
                        for (var i = 0; i < d.length; i++) {
                            if (d[i].Region == $scope.location.Region) {
                                $scope.region = d[i].Name;
                                break
                            }
                        };
                    });
                locationService.districts($scope.location.Region, 0, 100)
                    .then(function (d) {
                        for (var i = 0; i < d.length; i++) {
                            if (d[i].District == $scope.location.District) {
                                $scope.district = d[i].Name;
                                break
                            }
                        };
                    });
            }
        });

        $scope.save = function() {
            locationService.set($scope.location).then(function() {
                $location.url("/locations/region/0");
            });
        };

        $scope.delete = function(id) {
			confirmPopup = $ionicPopup.confirm({
				title: 'Location delete',
				template: 'Are you sure you want to delete ' + $scope.location.Name + '?'
			}).then(function(res) {
				if (res) {
					locationService.delete($scope.location.Id).then(function(data) {
						$location.url("/locations/region/0");
					});
				}
			});
        };

		// Nav
        $scope.cancel = function() {
			confirmPopup = $ionicPopup.confirm({
				title: 'Discard changes',
				template: 'Are you sure you want to discard changes?'
			}).then(function(res) {
				if (res) {
					 $location.url("/locations"); 
				}
			});
		};
    })
	
	.controller('MyProfileCtrl', function ($scope, $rootScope, $location, $stateParams, userService, locationService, $stateParams, roleService, $location, $ionicPopup) {
		$scope.roles = roleService.get();
	
		try {
			$scope.user = JSON.parse(localStorage.getItem('user'));
		} catch(e) {
			$scope.user = $rootScope.user;
		}
        if ($scope.user.UserId == undefined) {
           $rootScope.user = { ApiKey: '' };
            try {
                localStorage.setItem('user', JSON.stringify($rootScope.user));
            } catch(e) {}
            $location.url("#/login"); 
        }
        userService.get($scope.user.UserId).then(function(data) {
            $scope.user = data;
        });

        $scope.password = {};

        $scope.changePassword = function() {
           if ($scope.password.newPassword && $scope.password.newPassword == $scope.password.newPasswordConfirm) {
                $scope.user.Password = $scope.password.newPassword;
                userService.set($scope.user).then(function(data) {
					$scope.password.newPassword = '';
					$scope.password.newPasswordConfirm = '';
                    $scope.password.success = true;
                    $location.url("/my-profile");
                });
           } else {
                var alertPopup = $ionicPopup.alert({
                 title: 'Error',
                 template: 'Passwords are empty or not equal'
               });
            }
        };

		// Nav
        $scope.back = function() { $location.url("/directory/meetings"); }
    })

	
;