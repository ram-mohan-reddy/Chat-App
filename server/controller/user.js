module.exports = {

    chatSave: function (userName, message, dateTime) {

        var schema = require('../model/message');
        var messages = new schema();

        
        messages.sender = userName;
        messages.message = message;
        messages.dateTime = dateTime;

       
        

        try {
            messages.save(function (err) {

                console.log( messages.sender);
               
                    console.log('successfully added to data base')
               
            });
        }
        catch (err) {

            console.log("Error while adding to data base")

        }
    },

    singleChat : function ( sender ,receiver,message, dateTime) {

        var schema = require('../model/privateMessage');
        var chats = new schema();
        chats.sender = sender;
        chats.receiver = receiver;
        chats.message = message;
        chats.dateTime = dateTime;
        try {
            chats.save(function (err) {       
                    console.log('successfully added to data base')       
            });
        }
        catch (err) {
            console.log("Error while adding to data base")
        }
    }
}
