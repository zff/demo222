
angular.module('app', ['ionic'])

    .controller('appCtrl', function($scope) {

    });

angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('event', {
            url: "/event",
            abstract: true,
            templateUrl: "templates/event.html"
        })
        .state('event.list', {
            url: "/event-list",
            views: {
                'event-list': {
                    templateUrl: "templates/event-list.html"
                    //controller: 'HomeTabCtrl'
                }
            }
        })
        .state('event.detail', {
            url: "/event-detail",
            views: {
                'event-list': {
                    templateUrl: "templates/event-detail.html"
                    //controller: 'HomeTabCtrl'
                }
            }
        })



// 默认跳转到首页

        $urlRouterProvider.otherwise("/event/event-list");



})