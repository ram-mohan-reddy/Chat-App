chatApp.controller("homeController", function ($scope, $http,) {
    $scope.token  = JSON.parse(window.localStorage.getItem('user'));
    console.log(JSON.parse(window.localStorage.getItem('user')));
   
    $scope.displayContacts = function () {
        $http({
            method: 'get',
            url: '/users/data',

        }).then(function (response) {
                if (response.status == 200) {
                    console.log("Contacts are");
                    console.log(response.data.users.username);
                    $scope.message = response.data.users.username;
                   
                }
                else if (response.status == 404) {
                    console.log("error.");
                    console.log(response);
                }           
        },function (response) {
            console.log(response);
            $scope.message = response.data.users;
        })
    };
    
});