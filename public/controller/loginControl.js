chatApp.controller("loginController", function ($scope) {
 

    // controller logic goes here
    $scope.message = "Welcome to Home..!!";
    
    $scope.displayHome = function () {
    alert("Hi there " + $scope.message);
    };
    
});