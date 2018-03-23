<template>

	<div id="ci-articles" class="yui-u first">
		<ul>
			<li v-for="article in articles | filterByType type | limitBy count">

				<a href="{{article.url}}">{{{article.title}}}</a>
				<span class="postedDate">{{article.datePublished | localeDate}}</span>
			</li>
		</ul>

		<!-- hide if articles are less than 8 -->
		<div v-show="articles.length > 8">
		<p class="center">
			<a href="#" class="btn_loadMore" id="bulletins-more" @click.prevent="loadMoreArticle">
				{{$i18n.loadMore}}</a>
		</p>
		</div>
	</div>
	<div class="yui-u">
		<div class="module">

			<div>
				<h3>{{$i18n.sortBy}}</h3>
				<p></p><a href="#" class="btn_loadMore" @click.prevent="setType()">{{$i18n.allArticles}}</a>

				<a href="#" class="btn_loadMore" @click.prevent="setType('product')">{{$i18n.productInsights}}</a>
				<a href="#" class="btn_loadMore" @click.prevent="setType('success')">{{$i18n.successStories}}</a></p>			
			</div>

		</div>
	</div>

</template>

<script type="text/babel">

	import articleStore from '../store/articles'
	import moment from 'moment'

	const validFilters = ["product", "success"];

	export default {
		name: 'Articles',

		props: ["page"],

		data: function() {
			return {
				section: "Articles Insights",
				articles: [],
				count: 10,
				type: "",
				order: articleStore.SORT_DESC,
				term: "datePublished"
			}
		},

		beforeCompile(){
			var hash = window.location.hash.replace('#', '');
			if (hash && validFilters.indexOf(hash) > -1) {
				this.type = hash.replace("#", "");
			} else {
				window.location.hash = "";
			}
		},
		filters: {
			filterByType: function(articles, key) {
				var filteredArticle = [];
				if (key) {
					articles.forEach(function(article) {
						if (article.type.indexOf(key) > -1) {
							//console.log(article.title)
							filteredArticle.push(article)
						}
					});

					return filteredArticle;
				}
				//console.log(articles.length)
				return articles;
			},

			dateFormat: function(curDate) {
				// return moment(curDate).format("LL");
				return curDate
			}

		},
		computed: {
			page: function() {
				var page = "Articles";

				switch (this.type) {
					case "product":
						page = this.$i18n.productInsights;
						break;
					case "success":
						page = this.$i18n.successStories;
						break;
					default:
						page = "Articles";
				}
				return page;
			}
		},
		methods: {
			loadMoreArticle: function() {
				this.count += 4;
			},
			setType: function(val) {
				switch (val) {
					case "product":
						this.page = this.$i18n.productInsights;
						break;
					case "success":
						this.page = this.$i18n.successStories;
						break;
					default:
						this.page = "Articles";
				}
				this.type = val;
				this.count = 10;

				if (val) {
					window.location.hash = val;
				}
			},
			reverseOrder: function() {
				this.order = !this.order;
				this.articles = articleStore.orderByDate(this.order);
			}
		},


		events: {
			'store-ready': function() {

				// get all articles from loki and assign to local articles array
				this.articles = articleStore.orderByDate(true);

			}
		}
	}
</script>