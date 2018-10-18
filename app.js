const path = require('path')
const scraper = require('./scraper.js')
// middleware module used to parse JSON, buffer, string and URL encoded data when submitted with POST request
// middleware is not handled internally by express
const bodyParser = require('body-parser') 
const express = require('express')
const app = express();
const { check, validationResult } = require('express-validator/check');


// sets pug as our view engine in express
app.set("view engine", "pug"); 
// views (pug files) are accessible to app.js
app.set("views", path.join(__dirname, "views")); 
// CSS/JS folders in public is now accessible to app.js
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({ extended: true }));


// home page
app.get('/', (req, res) => {
	// renders index view
	res.render("index");
})

// handles user input; sends form value to search URL
app.post('/search', (req, res) => {
	var keyword = req.body.keyword
	// after form submit, redirect to search/keyword route
	res.redirect('/search/' + keyword);
})



// json is finished
app.get('/search/:keyword/json', (req, res) => {
	// returns response into json
	scraper
		.searchDictionary(req.params.keyword)
		.then(words => {
		res.json(words);
	});
})



// renders our words array from scraper.js
app.get('/search/:keyword', (req, res) => {
		scraper
		// takes value from form (req.body.keyword) and inputs it as our searchTerm
		.searchDictionary(req.params.keyword)
		.then(words => {
		//handles our errors - if words array is empty; promise was never returned, therefore our word cannot be found
		if (words.length === 0){
			res.render('error')
		} else {
		res.render('result', {
		// use Object.keys with an explicit search for first element to return value of JSON key
			"words": words,
			"keyword": words[Object.keys(words)[0]].keyword,
		// regex - add space after comma for tenses
			"tense": words[Object.keys(words)[0]].tense.replace(/,/g, ', '),
			"speechParts": words[Object.keys(words)[0]].speechParts
			});
		}
	});
})


// sets port for development mode
const port = process.env.PORT || 3000
app.listen(port, () =>{
	console.log(`Listening on ${port}`)
})

