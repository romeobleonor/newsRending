<template>
    
    <ul>
        <li class="expand" v-for="article in articles | orderBy 'datePublished' -1 | limitBy count">
            <a href="{{article.url}}">{{{article.title}}}</a>
            <span class="postedDate">{{article.datePublished | localeDate }}</span>
        </li>
    </ul>
    
    <div v-show="articles.length > 8">
        <p class="center">
        <a href="#" id="bulletins-more" @click.prevent="loadMoreArticle" class="btn_loadMore">{{$i18n.loadMore}}</a>
        </p>
    </div>
</template>

<script type="text/babel">
    import articleStore from '../store/articles'

    export default {

        name: 'CompetitveInsights',

        props: ["competitor"],

        data: function () {
            return {
                section: "Competitive Insights",
                count: 8,
                articles: []
            }
        },

        methods: {
            loadMoreArticle: function(){
                this.count += 4;
            }
        },

        events: {
            'store-ready': function () {
                // filter the articles on ready state
                 if (this.competitor)
                    this.articles = articleStore.filterByCompetitor(this.competitor);
                 else
                    this.articles = articleStore.getAll();
            }
        }
    }
</script>

<style>
</style>
