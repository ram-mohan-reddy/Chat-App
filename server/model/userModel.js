var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatData',{useNewUrlParser:true});
var mongoSchema=mongoose.Schema;
var userSchema=new mongoSchema({
    'username' :{
        type:String,
        required:false
    },
    'phonenumber' :{
        type:Number,
        required:false,
        min:10
    },
    'email' :{
        type:String,
        required:true
    },
    'password' :{
        type:String,
        required:true
    }
    
});
module.exports=mongoose.model('users',userSchema);


