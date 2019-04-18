const express = require('express');
const app = express();
const methodOverride  = require("method-override");
// var {query} = require('./util/database');
var db = require('./util/database');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

var engine = require('ejs-locals');
app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');

// var data = {};

// query('select * from MyGuests', function(err, rows, fields) {
//   if (err) throw err;
//   data.user = rows[1];
//   console.log(data.user);
//   console.log('connecting to the database');
// });

app.get('/', function(req, res){
	db.execute('select * from MyGuests').then(([rows, fieldData]) => {
	  console.log('connecting to the database');	
	  res.render('index',{data: rows});	  
	}).catch(err => {
		throw err;
	});	
});

app.get('/:id/update/', function(req, res){
	console.log(req.params.id);
	db.execute('select * from MyGuests WHERE MyGuests.guest_id = ?', [req.params.id]).then(([rows, fieldData]) => {
	  console.log('connecting to the database');	
	  res.render('update',{user: rows[0]});	  
	}).catch(err => {
		throw err;
	});		
});

// 'SELECT * FROM products WHERE products.id = ?'
app.put('/:id', function(req, res){
	console.log(req.params.id);
	let data = [req.body.firstname, req.body.lastname, req.body.email, req.params.id];
	db.execute('UPDATE MyGuests SET firstname = ?, lastname = ?, email = ? WHERE guest_id = ?', data).then(([rows, fieldData]) => {
		res.redirect('/');
	}).catch(err => {
		throw err;
	});			
});

app.post('/', function(req, res){
	console.log(req.body);
	db.execute('INSERT INTO MyGuests(firstname, lastname, email) VALUES( ?, ?, ?)'
		,[req.body.firstname, req.body.lastname, req.body.email])
	.then(() => {
		console.log('insert data to the database');
		res.redirect('/');
	}).catch(err => {
		throw err;
	});
});

app.get('/', function(req, res){
	db.execute('select * from MyGuests').then(([rows, fieldData]) => {
	  console.log('connecting to the database');	
	  res.render('index',{data: rows});	  
	}).catch(err => {
		throw err;
	});	
});

app.delete('/:id', function(req, res) {
	console.log('delete');
	db.execute('DELETE FROM MyGuests WHERE guest_id = ?', [req.params.id]).then(([rows, fieldData]) => {
	  res.redirect('/');
	}).catch(err => {
		throw err;
	});	
})

// check running enviroment
var port = process.env.PORT || 3000;

app.listen(port);

if(port === 3000){
  console.log('RUN http://localhost:3000/')
}