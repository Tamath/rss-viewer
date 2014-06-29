var rssReader = angular.module('rssReader', []);

rssReader.controller('RSSPosts', function ($scope, $http) {
    $scope.posts = [];
    $scope.address = '';
    $scope.addressError = false;
    $scope.loadPosts = function () {
        if ( $scope.address ) {
            $scope.addressError = false;
            $http.get('backend.php', {
                params: {
                    url: $scope.address
                }
            }).success(function (data) {
                if ( data.success==true ) {
                    $scope.posts = data.data;
                } else {
                    $scope.addressError = true;
                }
            }).error(function () {
                $scope.addressError = true;
            });
        } else {
            $scope.addressError = true;
        }
    }
});