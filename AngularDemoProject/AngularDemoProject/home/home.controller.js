(function() {

    angular.module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$rootScope','$scope','$location', 'AttendeesFactory'];

    function homeController($rootScope,$scope,$location, AttendeesFactory) {

        var vm = this;
        vm.currentUser = $rootScope.globals.currentUser.username;
        vm.deleteAttendee = deleteAttendee;
        vm.registerOrModifyAttendee = registerOrModifyAttendee;
        (function() {
            getAttendees();
        })();

        function getAttendees() {
            var promiseUsers = AttendeesFactory.getAllAttendees();

            promiseUsers.then(function (response) {
                console.log(response);
                vm.allUser = response;
            },
               function (reason) {
                   console.log(reason);
               });
        }

        function deleteAttendee($index, id) {
            console.log(id);
            var promiseUsers = AttendeesFactory.deleteAttendee(id);

            promiseUsers.then(function (response) {
                    getAttendees();
                alert('Successfully Deleted');
                
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }

        function registerOrModifyAttendee(id) {
            console.log(id);
            if (id === undefined) {
                $location.path('/form');
            }
            else
            {
                var attendee = $.grep(vm.allUser, function (e) {
                    return e.Id == id;
                });
                console.log(attendee);
                $location.path('/form').search({ q:attendee });
            }
            
        }


    }

})();