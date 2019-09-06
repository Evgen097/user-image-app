
let db = require('./mongoosedb');

module.exports = db;

var user = db.User;

// setTimeout(()=>{
//     user = new db.User({ name: 'Macha', password: '1234', token: 'secrettoken4' });
//     user.save(function (err, data) {
//         if (err) return console.error(err);
//         console.log('user.save');
//         console.log(data)
//     });
// }, 1000)

// setTimeout(()=>{
//     db.User.find({name: 'Garry'}, function (err, users) {
//         if (err) return console.error(err);
//         console.log('user.find');
//         console.log(users);
//     })
//
// }, 2000)





















