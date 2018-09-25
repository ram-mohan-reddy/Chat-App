chatApp.controller("loginController", function ($scope, $http) {
 
    $scope.user={

        'email' : '',
        'password' : '',
    } 
    console.log($scope.user);
    $scope.displayHome = function () {
        $http({
            method: 'post',
            url: '/login',
            data: $scope.user
        }).then(function (response) {
                if (response.status == 200) {
                    console.log("Successfully logged in");
                    console.log(response.data);
                    $scope.message = response.data.message;   
                }
                else if (response.status == 404) {
                    console.log("Invalid Credentials.");
                    console.log(response);
                }           
        },function (response) {
            console.log(response);
            $scope.message = response.data.message;
        })
    };
    
});