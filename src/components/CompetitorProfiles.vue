<template>
    <p v-for="competitor in competitors | limitBy 10">{{competitor}}</p>
</template>

<script type="text/babel">
    import articleStore from '../store/articles'

    export default {
        name: 'CompetitorProfiles',
        data: function (){
            return {
                section: "Competitor Profiles",
                articles: [],
                competitors: []
            }
        },
        events: {
            'store-ready': function() {
                let self = this
                // get all articles from loki and assign to local articles array
                this.articles = articleStore.getAll()

                // get unique competitors and assing to local competitors array
                this.articles.forEach(function(article) {
                    article.competitors.forEach(function(competitor) {
                        if (self.competitors.indexOf(competitor) === -1) {
                            self.competitors.push(competitor);
                        }
                    })
                })


            }
        }
    }
</script>