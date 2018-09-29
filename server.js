
// var express     =   require("express");
// var app         =   express();
// var bodyParser  =   require("body-parser");

// // var router = express.Router();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({"extended" : false}));

// var router=require('./server/controller/controller')

// app.use('/',router);

// app.listen(2000);
// console.log("Listening to PORT 2000");

// app.use(express.static('./public')); 



var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

var router = require('./server/controller/controller')

app.use('/', router);

server.listen(2000);

io.on('connection', (socket) => {


    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        socket.emit('message', { type: 'new-message', text: "hello.! How are u.?" });
    });
});

console.log("Listening to PORT 2000");

app.use(express.static('./public'));
