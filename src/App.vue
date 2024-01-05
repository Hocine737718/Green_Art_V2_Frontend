<template>
  <header class="header">
    <Navbar
    />
  </header>
  <main  class="main">
    <router-view :baseURL="baseURL"/>
  </main>
  <Footer
  />
  <a href="#" class="scrollup" id="scroll-up"> 
    <i class="ri-arrow-up-fill scrollup_icon"></i>
  </a>
</template>

<script>
import Navbar from './components/Header/NavbarCompo.vue';
import Footer from './components/FooterCompo.vue';
export default {
  components: { Navbar, Footer },
  data(){
    return{
      baseURL: "http://localhost:80/server/Djennat_Green_Art/v2/php"
    }
  },
  beforeMount(){
    this.$store.dispatch('getProduits');
    this.$store.dispatch('getCommandes');
    this.$store.dispatch('getUser');
  }
}
</script>


