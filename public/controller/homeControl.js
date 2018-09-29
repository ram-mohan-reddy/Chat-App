chatApp.controller("homeController", function ($scope, $http,$state) {
    $scope.secret = JSON.parse(window.localStorage.getItem('user'));
    $scope.contacts = [];
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

            var socket = io.connect('http://localhost:2000');

            socket.on('connect', function () {
                socket.send('hi');
            
                socket.on('message', function (msg) {
                 console.log(msg);
                 
                });
              });

            // socket.on('message', function(message) {

            //     console.log('The server has a message for you: ' + message);

            //     socket.broadcast.emit('message', 'Message to all units. I repeat, message to all units.');
                
            // })

           


            if (response.status == 200) {
                console.log("Contacts are");

                for (const key in response.data.contacts) {
                    // $scope.message ='';
                    console.log(response.data.contacts[key].username);
                    $scope.contacts.push(response.data.contacts[key].username);
                    // $scope.message = response.data.contacts[key].username;
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

        window.localStorage.clear();
        console.log($scope.secret);
        
        window.location.replace("#!/login");  

    }


});