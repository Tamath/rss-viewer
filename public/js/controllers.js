var rssReaderControllers = angular.module('rssReaderControllers', []);

rssReaderControllers.controller('RSSPosts', function ($scope, $http) {
    $scope.posts = [];
    $scope.address = '';
    $scope.addressError = false;

    $scope.$watch('posts', function () {
        $scope.$emit('posts:update');
    });

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