var messageSchema = mongoose.Schema({

    name : String,
    message : String,
    time : Date,
    status : Boolean

});

var Message = mongoose.model('Message',messageSchema);

module.exports = Message;