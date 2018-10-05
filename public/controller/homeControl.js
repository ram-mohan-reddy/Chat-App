chatApp.controller("homeController", function ($scope, $http,$state,SocketService) {
    $scope.secret = JSON.parse(window.localStorage.getItem('user'));
    $scope.contacts = [];
    var choice = 'groupChat';
    $scope.show = 'group';
    $scope.currentUser = $scope.secret.username;
    var receiver;
    $scope.params = {

        'id': $scope.secret.id
    }


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
                console.log(response);
                
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
    

    $scope.close = function () { 

        window.localStorage.clear();
        console.log($scope.secret);
        
        window.location.replace("#!/login");  

    }

    $scope.openSingleChat = function(rec){
        $scope.show = 'single'; 
        choice = 'singleChat';
        $scope.identity = rec;
        // $scope.receiver = receiver; 
        receiver = rec;
    console.log(receiver);

    $http({
        method: 'get',  
        url: '/users/' +  $scope.currentUser +'/'+ receiver +'/list',

    }).then(function (response) {

        if (response.status == 200) {
            console.log("Messages are");

            console.log(response.data.messages);

            //$scope.chatlistnew = arr;
            $scope.chatSingleArr = response.data.messages;        
        }
        else if (response.status == 500) {
            console.log("error.");
            console.log(response);
        }
    }, function (response) {
        console.log(response);
    })

     
    }

    $scope.add = function(){
      
        if($scope.message.length !== 0 && choice == 'groupChat'){

            console.log(choice);
            
        SocketService.emit('chatRoomBackend', {'sender': $scope.secret.username, 'message': $scope.message, 'dateTime': new Date()});
       
       console.log('chatRoomBackend', {'user': $scope.secret.username, 'message': $scope.message, 'dateTime': new Date()});
       
        }

        else {
            SocketService.emit('chatRoomBackend', {'sender': $scope.secret.username, 'receiver': receiver, 'message': $scope.message, 'dateTime': new Date()});
        }

        $scope.message = null;
    }


    $http({
        method: 'get',
        url: '/users/chat',

    }).then(function (response) {

        if (response.status == 200) {
            console.log("Messages are");

            console.log(response.data.messages);

            //$scope.chatlistnew = arr;
            $scope.chatArr = response.data.messages;       
        }
        else if (response.status == 500) {
            console.log("error.");
            console.log(response);
        }
    }, function (response) {
        console.log(response);
    })

    

    

    
    SocketService.on('chatroomClient', function(msg) {

        var size = 0;
        for (key in msg) {
             size++;
             
        }

        if (size ===3) {

            $scope.chatArr.push(msg);
        }

        else {
            $scope.chatSingleArr.push(msg);
        }
        // $scope.chatlist = msg;
       

        // console.log($scope.chatlist);    
    });

   
});