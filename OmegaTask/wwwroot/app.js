!function(){"use strict";function a(a,b){a.when("/",{templateUrl:"Views/list.html",controller:"contactsListController"}).when("/contacts/add",{templateUrl:"Views/add.html",controller:"contactsAddController"}).when("/contacts/edit/:id",{templateUrl:"Views/edit.html",controller:"contactsEditController"}).when("/contacts/delete/:id",{templateUrl:"Views/delete.html",controller:"contactsDeleteController"}),b.html5Mode(!0)}a.$inject=["$routeProvider","$locationProvider"],angular.module("contactsApp",["ngRoute","contactsServices"]).config(a)}(),function(){"use strict";function a(a,b,c){a.numbers=c.query(),a.contacts=b.query()}function b(a,b,c,d){a.contact=new c,a.number=new d,a.numbers=[a.number],a.addNewNumber=function(){a.newNumber=new d,a.numbers.push(a.newNumber)},a.add=function(){a.contact.$save(function(c){for(var d=0;d<a.numbers.length;d++)a.numbers[d].ContactId=c.Id,d==a.numbers.length-1?a.numbers[d].$save(function(){b.path("/")}):a.numbers[d].$save()},function(b){_showValidationErrors(a,b)})}}function c(a,b,c,d,e){a.contact=d.get({id:b.id}),a.numbers=e.query({id:b.id}),a.edit=function(){for(var b=0;b<a.numbers.length;b++)b==a.numbers.length-1?a.numbers[b].$save(function(){a.contact.$save(function(){c.path("/")})}):a.numbers[b].$save()}}function d(a,b,c,d,e){a.contact=d.get({id:b.id}),a.numbers=e.query({id:b.id}),a.remove=function(){if(0!=a.numbers.length)for(var b=0;b<a.numbers.length;b++)b==a.numbers.length-1?a.numbers[b].$remove({id:a.numbers[b].ContactId},function(){a.contact.$remove({id:a.contact.Id},function(){c.path("/")})}):a.numbers[b].$remove({id:a.numbers[b].ContactId});else a.contact.$remove({id:a.contact.Id},function(){c.path("/")})}}angular.module("contactsApp").controller("contactsListController",a).controller("contactsAddController",b).controller("contactsEditController",c).controller("contactsDeleteController",d),a.$inject=["$scope","Contacts","Number"],b.$inject=["$scope","$location","Contacts","Number"],c.$inject=["$scope","$routeParams","$location","Contacts","Number"],d.$inject=["$scope","$routeParams","$location","Contacts","Number"]}(),function(){"use strict";function a(a){return a("/api/contacts/:id")}function b(a){return a("/api/numbers/:id")}angular.module("contactsServices",["ngResource"]).factory("Number",b).factory("Contacts",a);a.$inject=["$resource"],b.$inject=["$resource"]}();