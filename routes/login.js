
let User = require('../db').User;

let setLoginRoutes = (routes)=>{
    routes.post('/login', function (req, res) {
        if (!req.body || !req.body.name || !req.body.password) {
            return res.send({type: 'error', msg: 'Wrong login credential !'});
        }

        let {name, password} = req.body;
        User.findOne({name, password}, (err, user)=>{
            if (err) return res.send({type: 'error', msg: 'Error during finding user for login !'});
            if(user === null) {
                return res.send({type: 'info', msg: `Pleas check name or password !`});
            }
            res.send(
                {type: 'info',
                    msg: `User "${name}" succefully login!`,
                    name: user.name,
                    token: user.token});
        })
    });
};


module.exports = setLoginRoutes;















