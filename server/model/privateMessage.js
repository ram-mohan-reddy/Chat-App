var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatData',{useNewUrlParser:true});
var mongoSchema=mongoose.Schema;

var messageSchema = mongoSchema({

    sender : String,
    receiver : String,
    message : String,
    dateTime : String,
    
    

});

module.exports=mongoose.model('singlechats',messageSchema);
