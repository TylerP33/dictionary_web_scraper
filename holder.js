		$('ol').each(function(i, element){
			const $element = $(element)
			const $definition = $(element).find('li')
			const word = {
				keyword: searchTerm,
				definition: $definition.text(),
				speechParts: $('span.luna-pos').text(),
				tenses: $('span.luna-inflected-form').text()
			}
			words.push(word);
		});
		return words
	});