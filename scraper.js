const fetch = require('node-fetch');
// a library used for scraping with a jQuery like syntax
const cheerio = require('cheerio'); 


function searchDictionary(searchTerm){
	const url = `https://www.dictionary.com/browse/${searchTerm}?s=t`
	// combine url with user search term
	return fetch(`${url}${searchTerm}`)
		// takes response stream and reads it to completion. returns a promise that resolves with a USVString (text)
		.then(response => response.text())
		.then(body => {
		const words = []
		const $ = cheerio.load(body);
		//each method in cheerio requires an index and element to iterate succesfully
		$('ol').each(function(i, element){ 
			const $element = $(element)
			const $definition = $(element).find('li')	
			const word = {
				keyword: searchTerm,
				definition: $definition.text(),
				tense: $('.luna-inflected-form').text(),
			}
			//pushes javasript object into words array
			words.push(word); 
		})
		//removes unnecessary OL from definition
		words.splice(-1); 
		return words
	})
}

// export to app.js
module.exports = {
	searchDictionary 
}
