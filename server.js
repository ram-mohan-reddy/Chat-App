
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const Socket = require('socket.io')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

var router = require('./server/controller/controller')

var user = require('./server/controller/user')

app.use('/', router);

var server = app.listen(2000);

var io = Socket(server);

io.on('connection', function (client) {

    console.log('A user enter in the room');

    client.on('disconnect', function () {
        console.log("socket disconnected ")
    })
    client.on('chatRoomBackend', function (data) {
        // console.log(data.message);
        var size = 0;
        for (key in data) {
             size++;
             
        }

        
        if(size === 3) {
            user.chatSave(data.sender, data.message, data.dateTime)
            console.log(data.sender);
            
            console.log('................');
            // users.chatSave(data.userid, data.username, data.message, data.dateTime);
            io.emit('chatroomClient', data);
        }

        else {
            
            user.singleChat(data.sender, data.receiver, data.message, data.dateTime)
            io.emit('chatroomClient', data);
            
        }
       
    })

});


console.log("Listening to PORT 2000");

app.use(express.static('./public'));
