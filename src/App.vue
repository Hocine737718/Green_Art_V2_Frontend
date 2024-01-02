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
  <a href="#" class="scrollup" id="scroll-up"> 
    <i class="ri-arrow-up-fill scrollup_icon"></i>
  </a>
</template>

<script>
import Navbar from './components/Header/NavbarCompo.vue';
import Footer from './components/FooterCompo.vue';
export default {
  components: { Navbar, Footer }
}
</script>


