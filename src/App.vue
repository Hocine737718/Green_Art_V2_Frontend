<template>
  <header class="header">
    <Navbar
    />
  </header>
  <main  class="main">
    <router-view/>
  </main>
  <Footer
  />
</template>

<script>
import Navbar from './components/Header/NavbarCompo.vue';
import Footer from './components/FooterCompo.vue';
import script from './assets/js/mon-script.js';
export default {
  components: { Navbar, Footer },
  mounted(){
    script();
  }
}
</script>


