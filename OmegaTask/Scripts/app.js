(function () {
    'use strict';

    config.$inject = ['$routeProvider', '$locationProvider']

    angular.module('contactsApp', [
        // Angular modules 
        'ngRoute',
        // Custom modules
        'contactsServices'

        // 3rd Party Modules
        
    ]).config(config);

    function config($routeProvider, $locationProvder){
        $routeProvider
            .when('/', {
                templateUrl: 'Views/list.html',
                controller: 'contactsListController'
            })
            .when('/contacts/add', {
                templateUrl: 'Views/add.html',
                controller: 'contactsAddController'
            })
            .when('/contacts/edit/:id', {
                templateUrl: 'Views/edit.html',
                controller: 'contactsEditController'
            })
            .when('/contacts/delete/:id', {
                templateUrl: 'Views/delete.html',
                controller: 'contactsDeleteController'
            });
        $locationProvder.html5Mode(true);
    }
})();