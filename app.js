// npm
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// required
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req,res){
	res.render("index");
});

app.get("/checkout", function(req,res){
	res.render("checkout");
});

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});
