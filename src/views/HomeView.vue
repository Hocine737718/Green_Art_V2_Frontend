<template>
  <!--HOME-->
  <section class="home" id="home">
    <div class="container home_container grid">
      <img src="../assets/img/home.png" alt="home" class="home_img">
      <div class="home_data">
        <h1 class="home_title">
          Bienvenue chez <br> DJENNAT <small>Green Art</small>
        </h1>
        <p class="home_description">
          Votre destination de choix pour des plantes artificielles exceptionnelles en Algérie !
        </p>
        <router-link :to="{ name: 'produits' }" class="button button--flex">
          Nos Produits
        </router-link>
      </div>
      <div class="home_social">
        <span class="home_social-follow">Suivez-nous</span>
        <div class="home_social-links">
          <a href="https://www.facebook.com/" target="_blank" class="home_social-link">
            <i class="ri-facebook-fill"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" class="home_social-link">
            <i class="ri-instagram-line"></i>
          </a>
        </div>
      </div>
    </div>
  </section> 
  <ContactCompo></ContactCompo>   
</template>
<script>
import ContactCompo from '../components/Contact/ContactCompo.vue'
export default {
  name: 'HomeView',
  components:{ContactCompo}
}
</script>
