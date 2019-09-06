
let express = require('express');
let routes = express.Router();

let login = require('./login');
let registration = require('./regisration');
let users = require('./users');
let images = require('./images')
let defaultRoutes = require('./default');


login(routes);
registration(routes);
users(routes);
images(routes);
defaultRoutes(routes);



module.exports = routes;










