import $ from 'jquery';

const articles = {
	SORT_ASC: false,
	SORT_DESC: true
};

export default articles;

articles.loadJsonUrl = (url, resolve) => {
	$.ajax(url, {dataType: 'json'})
		.done(function(response) {
			articles.items = response.articles;
			resolve();
		}).fail(function(xhr, status) {
			alert('Data could not be loaded');
		});
};

articles.orderByDate = (desc = false) => {
	return articles.items.slice().sort(function(a, b) {
		let aMoment = moment(a.datePublished);
		let bMoment = moment(b.datePublished);
		let result = 0;
		if (aMoment.isBefore(bMoment)) {
			result = -1;
		} else if (aMoment.isAfter(bMoment)) {
			result = 1;
		}

		return desc ? result * -1 : result;
	});
};

articles.filterByTag = (competitor) => {

	return articles.items;
	//return lokiArticles.where(function(obj) {
	//	return obj.competitors.indexOf(competitor) > -1;
	//});
};

// Filter article by Competitor - [BMO, CIBC, TD]
articles.filterByCompetitor = (competitor) => {
	return articles.items.filter(function(item) {
		return item.competitors.indexOf(competitor) > -1;
	});
};

// Filter article by Type - [Product, Success, Competitive Insights]
articles.filterByType = (type) => {
	return articles.items.filter(function(item) {
		return item.type.indexOf(type) > -1;
	});
};

articles.getAll = () => {
	return articles.items;
	//return lokiArticles.find()
};




