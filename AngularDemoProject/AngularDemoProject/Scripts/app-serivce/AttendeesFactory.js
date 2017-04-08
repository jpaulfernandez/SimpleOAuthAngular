(function() {
    angular.module('app')
        .factory('AttendeesFactory', AttendeesFactory);

    AttendeesFactory.$inject = ['$rootScope', '$http', '$q'];

    function AttendeesFactory($rootScope, $http, $q) {

        var service = {};
        service.getAllAttendees = getAllAttendees;
        service.saveUpdateAttendee = saveUpdateAttendee;
        service.deleteAttendee = deleteAttendee;

        return service;

        function getAllAttendees() {

            var deffered = $q.defer();

            $http({
                method: 'Get',
                url: 'api/attendees/attendees'
            }).then(function(response) {
                deffered.resolve(response.data);
            }, function (reason) { deffered.reject(reason); });

            return deffered.promise;
        }

        function deleteAttendee(id) {

            var deffered = $q.defer();

            
            console.log(id);
            $http({
                method: 'DELETE',
                url: 'api/attendees/attendees',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: $.param({
                    Id:id
                }),
            }).then(function (response) {
                deffered.resolve(response);
            },function(reason) {
                deffered.reject(reason);
            });

            return deffered.promise;
        }

        function saveUpdateAttendee(attendee,method) {

            var deffered = $q.defer();

            var data = $.param(attendee);
            console.log(data);
            
            $http({
                method: method,
                url: 'api/attendees/attendees',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: data
            }).then(function(response) {
                    deffered.resolve(response);
                },
            function (reason) {
                deffered.reject(reason);
            });

            return deffered.promise;
        }
    }
})();