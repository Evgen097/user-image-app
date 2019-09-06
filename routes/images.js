
let User = require('../db').User;
let fs = require('fs')
const {parse} = require ('querystring');

let setImagesRoutes = (routes)=>{
    routes.get('/images/:file', function (req, res) {
        let file = req.params.file;
        console.log('/images/:file');
        console.log(file);
        res.send('ok image/:file')
    });

    routes.get('/images', function (req, res) {
        console.log('/images');
        res.send({type: 'info', msg: `Images !`})
    });


    routes.post('/images', function (req, res) {
        // let file = req.params.file;
        // console.log('/images/:file');
        console.log(req.url);

        let data = [];
        req.on('data', chunc => {
            console.log(chunc)
            data.push(chunc);
        });
        req.on('end', ()=>{
            if(!data.length) return res.send({type: 'error', msg: `No data to save !`});
            console.log('File uploaded');
            console.log('File length: ', data.length)
            let file = (Math.random().toString().split('').splice(2).join(''))+'.jpg';
            fs.writeFileSync(file, Buffer.concat(data))
            res.send({type: 'info', msg: `Image succefully uploaded !`})
        })

    });

}

module.exports = setImagesRoutes;













