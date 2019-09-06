
// getting-started.js
let mongoose = require('mongoose');
let User = require('./userschema');

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongoose connected succefully !')
});

module.exports = {db, User};














