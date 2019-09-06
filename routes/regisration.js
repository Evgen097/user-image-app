
let User = require('../db').User;

let setRegistrationRoutes = (routes)=>{

    routes.post('/registration', (req, res)=>{
        if (!req.body || !req.body.name || !req.body.password) {
            return res.send({type: 'error', msg: 'Wrong registration credential !'});
        }

        let {name, password} = req.body;
        let images = [];
        let token = 'secrettoken'+ Math.random();

        User.findOne({name: name}, (err, user)=>{
            if (err) return res.send({type: 'error', msg: 'Error during finding user !'});
            if(user !== null) {
                return res.send({type: 'info', msg: `User name "${name}" already taken!`});
            }
            user = new User({name, password, images, token });
            user.save( (err, data)=>{
                if (err) return res.send({type: 'error', msg: 'Error during saving user !'});
                return res.send(
                    {type: 'info', msg: `User "${name}" saved!`, name: name, token: token});
            });
        })
    })
}

module.exports = setRegistrationRoutes;


















