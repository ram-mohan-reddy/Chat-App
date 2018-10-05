
chatApp.controller("registerController", function ($scope, $http) {

    $scope.user = {
        'username': '',
        'email': '',
        'password': '',
        'phonenumber': '',

    }
    
    // console.log("register initial calling",$scope.user);

    $scope.register = function () {
        //  console.log("register calling",$scope.user);
        $http({
            method: 'post',
            url: '/register',
            data: $scope.user
        }).then(function (response) {
            // console.log(response.data.message);

                if (response.status == 200) {
                    console.log("sucessfull");
                    console.log(response.data);
                    $scope.message = response.data.message;
                     window.location.replace("#!/login");
                   
                }

                else if (response.status == 400) {
                    console.log("already registerd");
                    console.log(response);
                }

                
            
        },function (response) {

            console.log(response);
            $scope.message = response.data.message;
          //  $scope.myWelcome = response.statusText;
        })
    };

    $scope.displayLogin = function () { 

        window.location.replace("#!/login");

    }


});
