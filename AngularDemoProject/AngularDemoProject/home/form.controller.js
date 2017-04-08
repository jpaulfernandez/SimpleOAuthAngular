(function() {

    angular.module('app')
        .controller('FormController', formController);

    formController.$inject = ['$scope', '$location', 'AttendeesFactory'];

    function formController($scope, $location, AttendeesFactory) {

        var vm = this;
        var action = 'POST';

        vm.title = 'Register New Attendee';
        vm.back = back;
        vm.saveUpdate = saveUpdate;

        if ($location.search().q !== undefined)
        {
            vm.attendee = ($location.search().q[0] === undefined) ? {} : $location.search().q[0];
        }
        
        if (!$.isEmptyObject(vm.attendee)) {
            vm.title = 'Update Attendee Information';
            action = 'PUT';
        }

        function back() {
            $location.search('q', null);
            $location.path('/home');
        }

        function saveUpdate() {

            console.log(action);
            var promiseSaveUpdate = AttendeesFactory.saveUpdateAttendee(vm.attendee, action);

            promiseSaveUpdate.then(function (response) {
                if (action != 'POST') {
                    alert('Attendee has been updated!');
                } else {
                    alert('Attendee has been registered!');
                }
                    back();
                },
                function (reason) {
                    console.log(reason);
                    alert('Oh-oh something went wrong!');
                });


        }

    }
})();