(function () {
    'use strict';

    angular
        .module('contactsApp')
        .controller('contactsListController', contactsListController)
        .controller('contactsAddController', contactsAddController)
        .controller('contactsEditController', contactsEditController)
        .controller('contactsDeleteController', contactsDeleteController);

    //List
    contactsListController.$inject = ['$scope', 'Contacts', 'Number']; 

    function contactsListController($scope, Contacts, Number) {

        $scope.contacts = Contacts.query({}, function (contacts) {
            Number.query({}, function (numbers) {
                contacts.forEach(function (contact) {
                    contact.Numbers = [];
                    numbers.forEach(function (number) {
                        if (contact.Id == number.ContactId) {
                            contact.Numbers.push(number.numb);
                        }
                    });
                });
            });
        });
    }

    //Create/Add
    contactsAddController.$inject = ['$scope', '$location', 'Contacts', 'Number'];

    function contactsAddController($scope, $location, Contacts, Number) {
        $scope.contact = new Contacts();
        $scope.number = new Number();
        $scope.numbers = [$scope.number];
        $scope.addNewNumber = function () {
            $scope.newNumber = new Number();
            $scope.numbers.push($scope.newNumber);
        };        
        $scope.removeNewNumber = function (index) {
            $scope.numbers.splice(index, 1);
        }

        $scope.add = function () {
            $scope.contact.$save(
                //success
                function (d) {
                    for (var i = 0; i < $scope.numbers.length; i++) {
                        $scope.numbers[i].ContactId = d.Id;
                        if (i == $scope.numbers.length - 1) {
                            $scope.numbers[i].$save(function () {
                                $location.path("/");
                            });
                        } else {
                            $scope.numbers[i].$save();
                        }                        
                    }                   
                },
                //error
                function (error) {
                    _showValidationErrors($scope, error);
                }
                );
        };
    }

    //Edit
    contactsEditController.$inject = ['$scope', '$routeParams', '$location', 'Contacts', 'Number'];

    function contactsEditController($scope, $routeParams, $location, Contacts, Number) {
        $scope.contact = Contacts.get({ id: $routeParams.id });
        $scope.numbers = Number.query({ id: $routeParams.id });
        //$scope.removeNumber = function (index) {
        //    console.log(index);
        //    console.log($scope.numbers);
        //    console.log($scope.numbers[index]);
        //    console.log($scope.numbers[index].ContactId);
        //    $scope.numbers[index].$remove({ id: $scope.numbers[index].Id }, function () {
        //        $scope.numbers.splice(index, 1);
        //    });


        }
        $scope.edit = function () {
            console.log($scope.numbers);
            for (var i = 0; i < $scope.numbers.length; i++) {
                if (i == $scope.numbers.length - 1) {
                    $scope.numbers[i].$save(function () {
                        $scope.contact.$save(
                            //success
                            function () {
                                $location.path("/");
                            });
                    });
                } else {
                    $scope.numbers[i].$save();
                }
            }
        };
    }

    //Delete
    contactsDeleteController.$inject = ['$scope', '$routeParams', '$location', 'Contacts', 'Number'];

    function contactsDeleteController($scope, $routeParams, $location, Contacts, Number) {
        $scope.contact = Contacts.get({ id: $routeParams.id });
        $scope.numbers = Number.query({ id: $routeParams.id });
        $scope.remove = function () {
            if ($scope.numbers.length != 0) {
                for (var i = 0; i < $scope.numbers.length; i++) {
                    if (i == $scope.numbers.length - 1) {
                        $scope.numbers[i].$remove({ id: $scope.numbers[i].ContactId }, function () {
                            $scope.contact.$remove({ id: $scope.contact.Id }, function () {
                                $location.path('/');
                            });
                        });
                    } else {
                        $scope.numbers[i].$remove({ id: $scope.numbers[i].ContactId });
                    }
                }
            } else {
                $scope.contact.$remove({ id: $scope.contact.Id }, function () {
                    $location.path('/');
                });
            }
        };
    }
})();
