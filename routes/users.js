
let url = require('url');
let path = require('path');

let User = require('../db').User;


let setUserRoutes = (routes)=>{
    routes.get('/users/:name', function (req, res) {
        let user_name = req.params.name;
        let {name, token} = url.parse(req.url, true).query;
        if( !user_name  || !user_name.length) return res.send({type: 'error', msg: 'Wrong user Name !'});

        if(!name || !token) return res.send({type: 'error', msg: `Please Login!`});

        console.log(name, token)

        User.findOne({name: name, token: token}, (err, user)=>{
            if (err) return res.send({type: 'error', msg: 'User not found !'});
            if (user === null) return res.send({type: 'error', msg: 'User not Exist !'});
            console.log('User found!!!');
            let {name, images, token} = user;
            res.send({name, images, token})
        })
    });

    routes.get('/users', function (req, res) {
        User.find((err, users)=>{
            if (err) return res.send({type: 'error', msg: 'Users not found !'});
            console.log('Users found!!!');
            res.send(users)
        })
    });
}

module.exports = setUserRoutes;




// routes.get('/users/:id', function (req, res) {
//     let userid = req.params.id;
//     if(
//         (typeof userid !== 'string') ||
//         (!userid.length)
//     ) return res.send({type: 'error', msg: 'Wrong user ID !'});
//
//     User.findOne({_id: userid}, (err, user)=>{
//         if (err) return res.send({type: 'error', msg: 'User not found !'});
//         console.log('User found!!!');
//         let {name, images, token} = user;
//         res.send({name, images, token})
//     })
// });










