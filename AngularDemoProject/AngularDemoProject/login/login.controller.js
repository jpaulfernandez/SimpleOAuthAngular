(function() {

    angular.module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$location', 'AuthFactory'];

    function loginController($scope, $location, AuthFactory) {

        var vm = this;

        vm.login = login;

        (function() {
            AuthFactory.clearCredentials();
        })();

        function login() {
            var promiseLogin = AuthFactory.login(vm.username, vm.password);

            promiseLogin.then(
                function (response) {
                    console.log(response);
                    AuthFactory.setCredentials(vm.username, response.accessToken);
                    $location.path('/home');
                },
                function(reason) {
                    console.log(reason);
                    alert(reason.error);
                }
            );
        };

    }


})();