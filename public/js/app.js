var rssReaderApp = angular.module('rssReaderApp', [
    'ngRoute',
    'rssReaderControllers'
]);

rssReaderApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/posts', {
            templateUrl: 'partials/posts.html',
            controller: 'RSSPosts'
        }).
        when('/feeds', {
            templateUrl: 'partials/feeds.html',
            controller: 'Feeds'
        }).
        when('/settings', {
            templateUrl: 'partials/settings.html',
            controller: 'Settings'
        }).
        otherwise({
            redirectTo: '/posts'
        });
}]);