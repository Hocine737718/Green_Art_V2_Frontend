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
export default {
  components: { Navbar, Footer }
}
</script>


