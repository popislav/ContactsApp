!function() {
    "use strict";
    function config($routeProvider, $locationProvder) {
        $routeProvider.when("/", {
            templateUrl: "Views/list.html",
            controller: "contactsListController"
        }).when("/contacts/add", {
            templateUrl: "Views/add.html",
            controller: "contactsAddController"
        }).when("/contacts/edit/:id", {
            templateUrl: "Views/edit.html",
            controller: "contactsEditController"
        }).when("/contacts/delete/:id", {
            templateUrl: "Views/delete.html",
            controller: "contactsDeleteController"
        }), $locationProvder.html5Mode(!0);
    }
    config.$inject = [ "$routeProvider", "$locationProvider" ], angular.module("contactsApp", [ "ngRoute", "contactsServices" ]).config(config);
}(), function() {
    "use strict";
    function contactsListController($scope, Contacts, Number) {
        $scope.contacts = Contacts.query({}, function(contacts) {
            Number.query({}, function(numbers) {
                contacts.forEach(function(contact) {
                    contact.Numbers = [], numbers.forEach(function(number) {
                        contact.Id == number.ContactId && contact.Numbers.push(number.numb);
                    });
                });
            });
        });
    }
    function contactsAddController($scope, $location, Contacts, Number) {
        $scope.contact = new Contacts(), $scope.number = new Number(), $scope.numbers = [ $scope.number ], 
        $scope.addNewNumber = function() {
            $scope.newNumber = new Number(), $scope.numbers.push($scope.newNumber);
        }, $scope.removeNewNumber = function(index) {
            $scope.numbers.splice(index, 1);
        }, $scope.add = function() {
            $scope.contact.$save(function(d) {
                for (var i = 0; i < $scope.numbers.length; i++) $scope.numbers[i].ContactId = d.Id, 
                i == $scope.numbers.length - 1 ? $scope.numbers[i].$save(function() {
                    $location.path("/");
                }) : $scope.numbers[i].$save();
            }, function(error) {
                _showValidationErrors($scope, error);
            });
        };
    }
    function contactsEditController($scope, $routeParams, $location, Contacts, Number) {
        $scope.contact = Contacts.get({
            id: $routeParams.id
        }), $scope.numbers = Number.query({
            id: $routeParams.id
        }), $scope.removeNumber = function(index) {
            console.log(index), console.log($scope.numbers), console.log($scope.numbers[index]), 
            console.log($scope.numbers[index].ContactId), $scope.numbers[index].$remove({
                id: $scope.numbers[index].Id
            }, function() {
                $scope.numbers.splice(index, 1);
            });
        }, $scope.edit = function() {
            console.log($scope.numbers);
            for (var i = 0; i < $scope.numbers.length; i++) i == $scope.numbers.length - 1 ? $scope.numbers[i].$save(function() {
                $scope.contact.$save(function() {
                    $location.path("/");
                });
            }) : $scope.numbers[i].$save();
        };
    }
    function contactsDeleteController($scope, $routeParams, $location, Contacts, Number) {
        $scope.contact = Contacts.get({
            id: $routeParams.id
        }), $scope.numbers = Number.query({
            id: $routeParams.id
        }), $scope.remove = function() {
            if (0 != $scope.numbers.length) for (var i = 0; i < $scope.numbers.length; i++) i == $scope.numbers.length - 1 ? $scope.numbers[i].$remove({
                id: $scope.numbers[i].ContactId
            }, function() {
                $scope.contact.$remove({
                    id: $scope.contact.Id
                }, function() {
                    $location.path("/");
                });
            }) : $scope.numbers[i].$remove({
                id: $scope.numbers[i].ContactId
            }); else $scope.contact.$remove({
                id: $scope.contact.Id
            }, function() {
                $location.path("/");
            });
        };
    }
    angular.module("contactsApp").controller("contactsListController", contactsListController).controller("contactsAddController", contactsAddController).controller("contactsEditController", contactsEditController).controller("contactsDeleteController", contactsDeleteController), 
    contactsListController.$inject = [ "$scope", "Contacts", "Number" ], contactsAddController.$inject = [ "$scope", "$location", "Contacts", "Number" ], 
    contactsEditController.$inject = [ "$scope", "$routeParams", "$location", "Contacts", "Number" ], 
    contactsDeleteController.$inject = [ "$scope", "$routeParams", "$location", "Contacts", "Number" ];
}(), function() {
    "use strict";
    function Contacts($resource) {
        return $resource("/api/contacts/:id");
    }
    function Number($resource) {
        return $resource("/api/numbers/:id");
    }
    angular.module("contactsServices", [ "ngResource" ]).factory("Number", Number).factory("Contacts", Contacts);
    Contacts.$inject = [ "$resource" ], Number.$inject = [ "$resource" ];
}();