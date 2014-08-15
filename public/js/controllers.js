var rssReaderControllers = angular.module('rssReaderControllers', ['LocalStorageModule']);

rssReaderControllers.controller('RSSPosts', function ($scope, $http, $location, localStorageService) {
    $scope.posts = [];
    $scope.addresses = [];
    $scope.address = '';
    $scope.addressError = false;
    $scope.loading = false;

    localStorageService.bind($scope, 'addresses', $scope.addresses);

    $scope.isActive = function (viewLocation) { 
        return $location.path().indexOf(viewLocation) === 0;
    };

    $scope.loadPosts = function () {
        if ( $scope.addresses.length ) {
            
            $scope.loading = true;
            $http.get('backend.php', {
                params: {
                    'url[]': $scope.addresses
                }
            }).success(function (data) {
                if ( data.success==true ) {
                    $scope.posts = data.data;
                    $scope.loading = false;
                }
            });
        }
    };
    
    $scope.addAddress = function () {
        $scope.addresses[$scope.addresses.length] = $scope.address;
        $scope.loadPosts();
    };
    
    if ( $scope.addresses.length ) {
        $scope.loadPosts();
    }
});

rssReaderControllers.controller('Feeds', function ($scope, localStorageService) {
    $scope.addresses = [];
    localStorageService.bind($scope, 'addresses', $scope.addresses)
    $scope.deleteAddress = function (address) {
        var index = $scope.addresses.indexOf(address);
        if ( index!==-1 ) {
            $scope.addresses.splice(index, 1);
        }
    };
});

rssReaderControllers.controller('Settings', function ($scope) {

});

rssReaderControllers.directive("jqTrim", function () {
    return function (scope, element, attrs) {
        scope.$watch("posts", function () {
            $(element).dotdotdot({
                watch: 'window',
                height: 200
            });
            //element.dataTable();
        });
    };
});