(function () {
    'use strict';

    var contactsServices = angular
        .module('contactsServices', ['ngResource'])
        .factory('Number', Number)
        .factory('Contacts', Contacts);

    Contacts.$inject = ['$resource'];
    Number.$inject = ['$resource'];

    function Contacts($resource) {
        return $resource('/api/contacts/:id');
    }
    function Number($resource) {
        return $resource('/api/numbers/:id');
    }

})();