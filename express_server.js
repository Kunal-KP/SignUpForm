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
app.listen(8080,"0.0.0.0");
console.log('Localhost server started on port 8080');
