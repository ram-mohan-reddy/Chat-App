var chatApp = angular.module('chatApp', ['ui.router','btford.socket-io']);

chatApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'template/loginpage.html',
            controller: 'loginController'
        })
        .state('register', {

            url: '/register',
            templateUrl: 'template/registrationpage.html', 
            controller: 'registerController'       
        })
        .state('home', {
            url: '/home',
            templateUrl: 'template/home.html',
            controller: 'homeController'
        });
});

chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:2000')
    });
}]);
  
