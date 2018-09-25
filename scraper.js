const fetch = require('node-fetch');
const cheerio = require('cheerio');


function searchDictionary(searchTerm){
	const url = `https://www.dictionary.com/browse/${searchTerm}?s=t`
	return fetch(`${url}${searchTerm}`)
		.then(response => response.text())
		.then(body => {
		const words = []
		const $ = cheerio.load(body);
		$('ol').each(function(i, element){
			const $element = $(element)
			const $definition = $(element).find('li')
			const word = {
				keyword: searchTerm,
				definition: $definition.text(),
				tense: $('.luna-inflected-form').text(),
			}
			words.push(word);
		});
		words.splice(-1);
		return words
	});
}


module.exports = {
	searchDictionary
}