(function() {

    angular.module('app')
        .factory('AuthFactory', authFactory);

    authFactory.$inject = ['$rootScope', '$cookies', '$http', '$q'];

    function authFactory($rootScope, $cookies, $http, $q) {

        var service = {};

        service.login = login;

        service.setCredentials = setCredentials;

        service.clearCredentials = clearCredentials;

        return service;

        function login(username, password) {

            var deffered = $q.defer();

            $http(
            {
                method: 'POST',
                url: 'api/token',
                headers: { 'Content-Type': 'application/x-www-url-formencoded' },
                data: $.param({
                    grant_type: 'password',
                    username: username,
                    password: password
                }),
            }).then(function(response) {
                deffered.resolve({
                    username: username,
                    accessToken : response.data.access_token
                });
            },
                function(reason) {
                    deffered.reject({
                        error: reason.data.error
                });
                }
            );

            return deffered.promise;
        }

        function setCredentials(username, accessToken) {
            $rootScope.globals = {
                currentUser:
                {
                    username: username,
                    authData: accessToken
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expiration: cookieExp });

        }

        function clearCredentials() {
            $rootScope.globals = {};
            $http.defaults.headers.common.Authorization = 'Bearer ';
            $cookies.remove('globals');
        }
    }


})();