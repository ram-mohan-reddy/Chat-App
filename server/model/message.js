var messageSchema = mongoose.Schema({

    name : String,
    message : String,
    time : Date,
    

});

var Message = mongoose.model('Message',messageSchema);

module.exports = Message;