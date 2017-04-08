(function () {
    angular.module("app", ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];

    function config($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when(
                '/home',
                {
                    controller: 'homeController',
                    templateUrl: 'home/home.partial.html',
                    controllerAs: 'vm'
                }
            )
            .when(
                '/login',
                {
                    controller: 'loginController',
                    templateUrl: 'login/login.partial.html',
                    controllerAs: 'vm'
                }
            )
            .when(
                '/form',
                {
                    controller: 'FormController',
                    templateUrl: 'home/form.partial.html',
                    controllerAs: 'vm'
                }

            )
            //.when(
            //    '/attendees/update',
            //    {
            //        controller: 'HomeController',
            //        templateUrl: 'partial_pages/add.partial.html',
            //        controllerAs: 'vm'
            //    }

            //)
            .otherwise(
                {
                    redirectTo: '/login'
                }
            );

        $locationProvider.html5Mode(true);

        $httpProvider.defaults.headers.delete = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }

    run.$inject = ['$http', '$cookies', '$location', '$rootScope'];

    function run($http, $cookies, $location, $rootScope) {
        $rootScope.globals = $cookies.getObject('globals') || {};

        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.authData;
        }

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }

        });

    }
})();