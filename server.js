
var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

var router=require('./server/route/routes')

app.use('/',router);

app.listen(2000);
console.log("Listening to PORT 2000");

app.use(express.static('./public'));
 