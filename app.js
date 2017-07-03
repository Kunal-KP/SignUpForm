
var express = require('express');
var router = require('./router');
var app = express();
//var fileUpload = require('express-fileupload');
//app.use(fileUpload());
var multer  = require('multer');
app.use(multer({ dest: '/tmp/'}).any());
app.set('view engine', 'ejs');

app.use(express.static('images'));
//app.use(express.static('dest'));
app.use(express.static('pages'));

app.use('/',router);
//var port = process.env.port || 8080;
app.listen(process.env.PORT);
console.log('Localhost server started on port '+process.env.PORT);
