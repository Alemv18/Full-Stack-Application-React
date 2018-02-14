let express = require ("express");
let bodyParser = require("body-parser");
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;

let pool = new pg.Pool({
	port: 5432, 
	database: "countries",
	password: "alejandra23",  
	max: 10, 
	host: "localhost", 
	user:"postgres"
});

pool.connect((err, db, done) =>{
	if(err) {
		return console.log(err);
	} else {
		var country_name = 'Spain';
		var continent_name = 'Europe';
		var id = Math.random().toFixed(3);
		
		db.query("SELECT * FROM country", (err, table) => {
			if(err) {
				return console.log(err)
			} else {
				console.log(table.rows)
			}
		})
	}
})

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/new-country', function(request, response) {
	//console.log(request.body);
	var country_name = request.body.country_name;
	var continent_name = request.body.continent_name;
	pool.connect((err, db, done) => {
		if(err) {
			return console.log(err);
		}
		db.query("INSERT INTO country (country_name, continent_name) VALUES ($1, $2", 
			[country_name, continent_name], (err, res) => {
				done();
			if(err) {
				//return console.log(err);
			}	
			else {
				console.log('INSERTED DATA SUCESS');
				db.end();
			}
			})
	})
});

app.listen(PORT, () => console.log('Listening on port' + PORT));