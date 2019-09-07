
let User = require('../db').User;
let fs = require('fs')
let {parse} = require ('querystring');
let url = require('url');
let path = require('path');

let images = path.resolve('./static/images/');

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

    routes.delete('/images/:file', function (req, res) {
        console.log('DELETE /images/:file');

        let file = req.params.file;
        let {name, token} = url.parse(req.url, true).query;
        console.log(file, name, token);

        console.log(name, token);
        if(!file || !name || !token) {
            return res.send({type: 'error', msg: `Please Login before deleting file!`});
        }
        User.findOne({name, token}, (err, user)=>{
            if(err) return res.send({type: 'error', msg: `Error in database!`});
            if(user === null) return res.send({type: 'error', msg: `Please Login!`});

            user.images = user.images.filter(image=> image !== file);
            user.save(err=>{
                if(err) return res.send({type: 'error', msg: `Error in database, deleting image!`});
                res.send({type: 'info', msg: `Image succefully DELETED !`})
            })
        })

    });


    routes.post('/images', function (req, res) {
        let {name, token} = url.parse(req.url, true).query;
        console.log(name, token);
        if(!name || !token) return res.send({type: 'error', msg: `Please Login!`});



        let data = [];
        req.on('data', chunc => {
            console.log(chunc)
            data.push(chunc);
        });
        req.on('end', ()=>{
            if(!data.length) return res.send({type: 'error', msg: `No data to save !`});
            console.log('File uploaded');
            console.log('File length: ', data.length)

            User.findOne({name, token}, (err, user)=>{
                if(err) return res.send({type: 'error', msg: `Error in database!`});
                if(user === null) return res.send({type: 'error', msg: `Please Login!`});

                let file = (Math.random().toString().split('').splice(2).join(''))+'.jpg';
                fs.writeFileSync(path.join(images,file), Buffer.concat(data));
                user.images.push(file);
                user.save(err=>{
                    if(err) return res.send({type: 'error', msg: `Error in database, add new image!`});
                    res.send({type: 'info', msg: `Image succefully uploaded !`})
                })
            })
        })

    });

}

module.exports = setImagesRoutes;

// C:\Nodejs_Kiril_Syhov_book\2_Part_basik_db\1_basik_mongoost\static\images











