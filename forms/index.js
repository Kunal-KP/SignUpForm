
var fs = require ('fs');
var path = require('path');
var cloudinary = require('cloudinary');
const MongoClient = require('mongodb').MongoClient;
cloudinary.config({ 
	  cloud_name: 'dxpsr96be', 
	  api_key: '495986963395255', 
	  api_secret: 'X2vH7TwkAilD4Mx62kg1w1JQxpI' 
	});
module.exports = function(req,res) {
	var response_body = {
		name: req.body.name,
		number: req.body.number,
		birthday: req.body.birthday
	}
	
	console.log('File Uploaded is : '+JSON.stringify(req.files));
	console.log('File name is : '+req.files[0].originalname);
	
	
	/*var file = path.join(__dirname, '..', 'dest/images',req.files[0].originalname);
	console.log('Dir prev ' + file);
	
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
	});*/	
	
	
	//console.log('Response-bodyyyyyyyy outside'+JSON.stringify(response_body));
	MongoClient.connect('mongodb://kunal:test%40317@ds143542.mlab.com:43542/dev-db', (err, database) => {
  // ... start the server
		if(err) {
			console.log('Errorrr'+err);
		}
		console.log('Connection Successful');
		var db =  database;
		cloudinary.uploader.upload(req.files[0].path, function(result) { 
		  console.log(result);
		  response_body["image_url"]=result.secure_url;
		  console.log('Response-bodyyyyyyyy inside'+JSON.stringify(response_body));
		  db.collection('user').insert(response_body);
		  console.log('Insertion Successful');
		db.collection('user').find().toArray((err, result) => {
			if (err) return console.log(err)
			// renders index.ejs
			console.log('Retrieval Successful');
			res.render('buddy-details.ejs', {buddy: result});
		  })
		});			
	})
	
	
	//res.send('Name is : ' + response_body.name + '<br>' + 'Number is : ' + response_body.number + '<br>' + 'Birthday is : ' + response_body.birthday + '<br>' + '<img height = 40% width = 20% src= "/images/'+ req.files[0].originalname + '"/>' );
}