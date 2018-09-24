const express = require('express')
const app = express();
const path = require('path')
const scraper = require('./scraper.js')
const bodyParser = require('body-parser')


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
	res.render("index");
})

app.post('/search', (req, res) => {
	var keyword = req.body.keyword
	res.redirect('/search/' + keyword);
})


// json is finished
app.get('/search/:keyword/json', (req, res) => {
	scraper
		.searchDictionary(req.params.keyword)
		.then(words => {
		res.json(words);
	});
})

// regular view

app.get('/search/:keyword', (req, res) => {
		scraper
		.searchDictionary(req.params.keyword)
		.then(words => {
		res.render('result', {
			"words": words,
			"keyword": words[Object.keys(words)[0]].keyword,
			"tense": words[Object.keys(words)[0]].tense.replace(/,/g, ', '),
			"speechParts": words[Object.keys(words)[0]].speechParts
		});
	});
})




const port = process.env.PORT || 3000
app.listen(port, () =>{
	console.log(`Listening on ${port}`)
})

// add pug to express app	
