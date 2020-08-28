// npm
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const GoogleSpreadsheet = require('google-spreadsheet'),
{ promisify } = require('util');

// required
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

// import oAuth file for sheets
const creds = require('./client_secret.json');

// routes

app.get("/", function(req,res){
	res.render("index");
});

app.get("/checkout", function(req,res){
	res.render("checkout");
});

app.post("/success", function(req, res) {
	// will print out in console the body of the form value data
	let items = [];

	for(var key in req.body) {
		if(req.body.hasOwnProperty(key)){
			//do something with e.g. req.body[key]
			if(key.match(/item/)) {
				console.log("yes item");
				console.log(req.body[key]);
				items.push(req.body[key]);
			}
		}
	}
	
	const guest = req.body.nameGuest;
	const room = req.body.roomNumber;
	const employee = req.body.nameEmployee;
	const subtotal = req.body.Subtotal;
	const products = req.body.Products;
	const itemsAdded = items;
	accessSpreadsheet(guest,room,employee,subtotal, products, itemsAdded);
	// res.status(204).send();
	return req.body;
});

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});

// run send to sheets function
async function accessSpreadsheet(guest,room,employee,subtotal, products, itemsAdded) {
	const doc = new GoogleSpreadsheet('1CI3gd3w6rZ2Bi9Bleg2fQGq4NdqHkZjWe5f2N5fBu2A');
	await promisify(doc.useServiceAccountAuth)(creds);
	const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[1];
	
	const row = {
		GuestName : guest,
		RoomNumber : room,
		Employee : employee,
		Subtotal : subtotal,
		Products : products,
		Items: itemsAdded
	}
	
	await promisify(sheet.addRow)(row);
}
