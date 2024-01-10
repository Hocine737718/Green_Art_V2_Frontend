<template>
    <nav class="nav container">
        <div @click="refresh()" id="logo">
            <img src="../../assets/img/logo.png" alt="logo">
        </div>
        <div class="nav_menu" id="nav-menu">
            <ul class="nav_list">
                <li class="nav_item">
                    <router-link :to="{ name: 'home' }" class="nav_link">
                        <i class='ri-home-2-fill nav_icon'></i>
                        <span class="nav_text">Acceuil</span>
                    </router-link>
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'products' }" class="nav_link">
                        <i class='ri-plant-fill nav_icon'></i>
                        <span class="nav_text">Produits</span>
                    </router-link>
                </li>
                <li class="nav_item">
                    <div class="nav_link" @click="goSearch()">
                       <i class='ri-search-line nav_icon'></i>
                       <span class="nav_text">Recherche</span>
                    </div>
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'cart' }" class="nav_link">
                        <span class="nav_cart_count">{{ this.cartCount }}</span>
                        <i class='ri-shopping-cart-fill nav_icon'></i>
                        <span class="nav_text">Panier</span>
                    </router-link>
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: this.login_direction() }" class="nav_link">
                       <i class='ri-account-circle-fill nav_icon'></i>
                       <span class="nav_text">Mon Compte</span>
                    </router-link>
                </li>
                <li  class="nav_item" v-if="this.token">
                    <router-link :to="{ name: 'logout' }" class="nav_link">
                        <i class="ri-logout-box-r-line nav_icon"></i>
                        <span class="nav_text">Sortir</span>
                    </router-link>
                </li>
            </ul>
            <div class="nav_close" id="nav-close">
                <i class="ri-close-line nav_icon"></i>
            </div>
        </div>
        <div class="nav_btns">
            <i class="ri-moon-line nav_icon" id="theme-button"></i>
            <div class="nav_toggle" id="nav-toggle">
                <i class="ri-menu-line nav_icon"></i>
            </div>
        </div>
        <SearchCompo></SearchCompo>
    </nav>
</template>

<script>
import SearchCompo from './SearchCompo.vue'
import $ from 'jquery';

export default {
  name: "NavbarCompo",
  components:{SearchCompo},
  computed:{
    cartCount(){
        return this.$store.getters.cartCount;
    },
    token(){
        return this.$store.getters.token;
    }
  },
  methods:{
    login_direction(){
        if(this.token){
            return "profile";
        }
        else{
            return "login";
        }
    },
    goSearch(){
        $('.search').addClass('show_search');
    },
    refresh(){
        location.reload();
    }
  }
};
</script>
