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
       name: 'ProductInsights',
       data: function(){
            return {
                section: "Product Insights",
                articles: []
            }
        },
        events: {
            'store-ready': function() {

                // get all articles then filter by 'product'
                this.articles = articleStore.filterByType("product")
            }
        }
    }
</script>