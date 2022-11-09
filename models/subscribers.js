var mongoose = require("mongoose");

var subscribeSchema = mongoose.Schema({
    emailSubscribe: {type: String, required:true},
    createdAt: {type: Date, default:Date.now},
    public: {type:Boolean, default:false, required:false, unique:false}
});

var Subscribers = mongoose.model("Subscribers", subscribeSchema);

module.exports = Subscribers;