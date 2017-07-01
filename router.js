var express = require('express');
var router = express.Router();
var handleForm = require('./forms');
var bodyParser = require('body-parser');
var multer = require('multer');
var urlEncodedParser = bodyParser.urlencoded({extended:false});

router.get('/',function(req,res) {
	res.sendFile(__dirname + '/pages/' + 'index.html');
});

router.get('/favicon.ico',function(req,res) {
	res.send();
});

router.post('/submit', urlEncodedParser, handleForm);

module.exports = router;

