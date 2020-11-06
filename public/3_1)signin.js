(function() {
    var app = angular.module('myApp', ['ui.router']);

    app.run(function($rootScope, $location, $state, LoginService) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                console.log('Changed state to: ' + toState);
            });

        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
    });

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('login', {
                url: '/signin',
                templateUrl: 'public\3_1)signin.html',
                controller: 'LoginController'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'public\1_1)Homepage.html',
                controller: 'HomeController'
            });
    }]);

    app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
        $rootScope.title = "AngularJS Login Sample";

        $scope.formSubmit = function() {
            if (LoginService.login($scope.username, $scope.password)) {
                $scope.error = '';
                $scope.username = '';
                $scope.password = '';
                $state.transitionTo('home');
            } else {
                $scope.error = "Incorrect username/password !";
            }
        };

    });

    app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
        $rootScope.title = "AngularJS Login Sample";

    });

    app.factory('LoginService', function() {
        var admin = 'admin';
        var pass = 'pass';
        var isAuthenticated = false;

        return {
            login: function(username, password) {
                isAuthenticated = username === admin && password === pass;
                return isAuthenticated;
            },
            isAuthenticated: function() {
                return isAuthenticated;
            }
        };

    });

})();