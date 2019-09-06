
var express = require('express');
var app = express();
var bodyParser = require('body-parser')



app.use(express.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

let routes = require('./routes')

app.use(express.static('static'));


app.use('/', routes);



app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});


















