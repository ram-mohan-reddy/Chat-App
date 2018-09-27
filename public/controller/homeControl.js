chatApp.controller("homeController", function ($scope, $http,$state) {
    $scope.secret = JSON.parse(window.localStorage.getItem('user'));

    $scope.params = {

        'id': $scope.secret.id
    }

    console.log($scope.params);

    $scope.displayContacts = function () {
        $http({
            method: 'get',
            url: '/users/' + $scope.secret.id + '/list',
            headers: {
                'token': $scope.secret.token,
            },
            params: $scope.params
        }).then(function (response) {
            if (response.status == 200) {
                console.log("Contacts are");

                for (const key in response.data.contacts) {
                    console.log(response.data.contacts[key].username);
                    $scope.message = response.data.contacts[key].username;
                }
            }
            else if (response.status == 404) {
                console.log("error.");
                console.log(response);
            }
        }, function (response) {
            console.log(response);
            $scope.message = response.data;
        })
    };

    $scope.close = function () { 

        // window.location.replace("#!/login");  

    }


});