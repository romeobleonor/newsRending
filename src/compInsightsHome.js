import es5shim from 'es5-shim';
import Vue from 'vue';

// VUE - Reusable components
import CompetitiveInsights from './components/CompetitiveInsights.vue';
import ProductInsights from './components/ProductInsights.vue';
import CompetitorProfiles from './components/CompetitorProfiles.vue';
import SuccessStories from './components/SuccessStories.vue';
import Articles from './components/Articles.vue';

// Utitlity
import articleStore from './store/articles';
import moment from 'moment';

import i18n from 'vue-i18n-plugin';

Vue.use(i18n, {
   baseUrl: '/content/lib/CompInsights/src/i18n'
});

// figure out what the language is
var metaLang = document.querySelector("meta[http-equiv='ms.locale']").getAttribute('content');
// metaLang = "fr";


if (metaLang && metaLang.toLowerCase() === 'fr') {
	moment.locale('fr-CA');
} else {
	moment.locale('en', {
		longDateFormat : {
			LL : 'MMMM D, YYYY',
			LLL : 'MMMM D, YYYY h:mm A',
			LLLL : 'dddd, MMMM D, YYYY h:mm A'
		}
	})
}

// set the momentjs locale based on the derived language
Vue.filter('localeDate', function(strDate) {
	return moment(strDate).format("LL");
});

// Global filter - COMPETITOR
Vue.filter('filterByCompetitor', function(articles, key){
	var filteredArticle = [];
	if(key){
		articles.forEach(function(article){
			if(article.competitors.indexOf(key) > -1 )
				filteredArticle.push(article)
		});
		return filteredArticle;
	}
	return articles;
});

new Vue({
	el: '#bd',
	
	props: ["jsonurl"],

	data: {
		section: "Articles",
		type: "",
		articles: []
	},

	components: {
		ProductInsights,
		CompetitorProfiles,
		SuccessStories,
		Articles,
		CompetitiveInsights
	},

	beforeCompile: function() {

    	this.$setLanguage(metaLang.toLowerCase());
  	},
  	
	ready() {
		let self = this;
		articleStore.loadJsonUrl(this.jsonurl, function() {
			self.$broadcast('store-ready');
		})
	}

});
