// Require the Express Module
var express = require('express');
var path = require('path');

// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    quote: String
   })
   // We are setting this Schema in our Models as 'User'
   var User = mongoose.model('users', UserSchema) // We are retrieving this Schema from our Models, named 'User'
   

app.use(bodyParser.urlencoded({ extended: true }));
// Require path
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
});
app.get('/quotes', function(req, res){
    User.find({}, function(err, results){
        if(err) { console.log(err); }
      
    res.render('quotes',{users: results})
});
});
// Add User Request 
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    User.create(req.body, function(err){
        if(err) { console.log(err); }

    // This is where we would add the user from req.body to the database.
    res.redirect('/quotes');
    });
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
