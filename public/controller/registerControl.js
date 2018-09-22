chatApp.controller("registerController", function ($scope) {
 

    // controller logic goes here
    $scope.message = "Registerd Successfully..!!";
    
    $scope.registerSuccess = function () {
    alert("Hi there " + $scope.message);
     window.location.replace("index.html#/login");
    };
    
});

