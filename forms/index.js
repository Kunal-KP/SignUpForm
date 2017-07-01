
var fs = require ('fs');
var path = require('path');
const MongoClient = require('mongodb').MongoClient;
module.exports = function(req,res) {
	var response_body = {
		name: req.body.name,
		number: req.body.number,
		birthday: req.body.birthday
	}
	MongoClient.connect('mongodb://kunal:test%40317@ds143542.mlab.com:43542/dev-db', (err, database) => {
  // ... start the server
	if(err) {
		console.log('Errorrr'+err);
	}
		console.log('Success');
		var db =  database;
		db.collection('kuser').insert(response_body);
	})
	console.log('File Uploaded is : '+JSON.stringify(req.files));
	console.log('File name is : '+req.files[0].originalname);
	var file = path.join(__dirname, '..', 'dest/images',req.files[0].originalname);
	console.log('Dir prev ' + file);
	//var file = __dirname + "/" + req.files[0].originalname;
	
	fs.readFile( req.files[0].path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log( err );
            }else{
               response = {
                  message:'File uploaded successfully',
                  filename:req.files[0].originalname
               };
            }
         console.log( response );
         //res.end( JSON.stringify( response ) );
      });
	});
	
	
	res.send('Name is : ' + response_body.name + '<br>' + 'Number is : ' + response_body.number + '<br>' + 'Birthday is : ' + response_body.birthday + '<br>' + '<img height = 40% width = 20% src= "/images/'+ req.files[0].originalname + '"/>' );
}