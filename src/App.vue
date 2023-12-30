<template>
  <header class="header">
    <Navbar
    />
  </header>
  <router-view/>
</template>

<script>
import Navbar from './components/Header/NavbarCompo.vue';
import script from './assets/js/mon-script.js';
export default {
  components: { Navbar },
  mounted(){
    script();
  }
}
</script>


