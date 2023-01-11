cnsApp.factory("locationService", ["$http", "$rootScope", "$q", "baseService",

function ($http, $rootScope, $q, baseService) {

    // get all locations
    function _list() {
        var url = $rootScope.API_ROOT + "locations";
        return baseService.get(url);
    }

    function _page(pageIndex, pageSize) {
        var url = $rootScope.API_ROOT + "locations?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
        return baseService.get(url);
    }

    // get one location
    function _get(id) {
        var url = $rootScope.API_ROOT + "locations/" + id;
        return baseService.get(url);
    }

    // update location
    function _set(loc) {
        var url = $rootScope.API_ROOT + "locations/" + loc.Id;
        var postData = JSON.stringify(loc);
        return baseService.put(url, postData);
    }

    // add location
    function _add(loc) {
        var url = $rootScope.API_ROOT + "locations";
        var postData = JSON.stringify(loc);
        return baseService.post(url, postData);
    }

    // delete location
    function _delete(id) {
        var url = $rootScope.API_ROOT + "locations/" + id;
        return baseService.delete(url);
    }

    // RDT regions
    function _regions(pageIndex, pageSize) {
        var url = $rootScope.API_ROOT + "locations/regions";
        if ((pageIndex != undefined) && (pageSize != undefined)) {
            url += "?pageIndex=" + pageIndex + "&pageSize=" + pageSize;
        }
        return baseService.get(url);
    }

    function _districts(region, pageIndex, pageSize) {
        var url = $rootScope.API_ROOT + "locations/districts?region=" + region;
        if ((pageIndex != undefined) && (pageSize != undefined)) {
            url += "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
        }
        return baseService.get(url);
    }

    function _territories(region, district, pageIndex, pageSize) {
        var url = $rootScope.API_ROOT + "locations/territories?region=" + region + "&district=" + district;
        if ((pageIndex != undefined) && (pageSize != undefined)) {
            url += "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
        }
        return baseService.get(url);
    }

    function _findLocationByRDT(rdt) {
        var url = $rootScope.API_ROOT + "locations/findlocationbyrdt?rdt=" + rdt;
        return baseService.get(url);
    }

    return {
        list: _list,
        page: _page,
        get: _get,
        set: _set,
        add: _add,
        delete: _delete,

        // RDT
        regions: _regions,
        districts: _districts,
        territories: _territories,
        findLocationByRDT : _findLocationByRDT


    }
}]);