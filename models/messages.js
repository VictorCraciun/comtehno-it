var mongoose = require("mongoose");

var messagesSchema = mongoose.Schema({
    name: {type: String, required:true},
    youremail: {type: String, required:true},
    messages: {type: String, required:true},
    createdAt: {type: Date, default:Date.now},
    public: {type:Boolean, default:false, required:false, unique:false}
});

var Mess = mongoose.model("Mess", messagesSchema);

module.exports = Mess;