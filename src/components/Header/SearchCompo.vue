<template>
    <div class="search" id="search">
        <div action="" class="search_container">
            <i class="ri-search-line search_icon"></i>
            <input type="search" placeholder="Que cherchez-vous ?" class="search_input" v-model="search" @keypress.enter="clickSearch">
        </div>
        <i class="ri-close-line search_close" id="search-close"  @click="closeSearch"></i>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: "SearchCompo",
    data(){
        return {
            search:""
        }
    },
    methods:{
        closeSearch(){
            $('.search').removeClass('show_search');
        },
        clickSearch(){
            this.$store.commit('search',this.search);
            $('.search').removeClass('show_search');
        }
    }
}
</script>