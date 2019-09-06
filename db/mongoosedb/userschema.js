
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {type: String},
    password: {type: String},
    images: {type: Array},
    token: {type: String}
});

let User = mongoose.model('User', userSchema);

module.exports = User;
















