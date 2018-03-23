<template>
    
    <ul>
        <li v-for="article in articles | limitBy 5" >
            <a href="{{article.url}}">{{{article.title}}}</a>
        </li>
    </ul>
    
</template>

<script type="text/babel">

    import articleStore from '../store/articles'

    export default {
        name: 'SuccessStories',
        data: function(){
            return {
                section: "Success Stories",
                articles: []
            }
        },
        events: {
            'store-ready': function() {
                // get all articles, filtered by type "Success Story"
                this.articles = articleStore.filterByType("success")
            }
        }

    }
</script>