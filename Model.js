
var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roletype: { type: String, require: true },
    userstatus: { type: String, require: true },
    mobilenum: String,
    created_time: { type: Date, default: Date.now },
    updated_time: { type: Date, default: Date.now }
},
    { versionKey: false });

userSchema.plugin(uniqueValidator);

var User = module.exports = mongoose.model('tblusers', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}


