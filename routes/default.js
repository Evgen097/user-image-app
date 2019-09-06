
let setDefaultRoutes = (routes)=>{
    routes.get('*', function (req, res) {
        res.send('Wrong GET path!');
    });

    routes.post('*', function (req, res) {
        // let obj = {type: 'login', success: true, name: 'Garry', token: 'seckrettoken', id: 1};
        // console.log(req.url)
        // res.json(obj);
        res.send('Wrong POST path!');
    });

}

module.exports = setDefaultRoutes;













