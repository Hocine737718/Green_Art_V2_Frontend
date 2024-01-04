<template>
    <section class="product section container" id="products">
        <h2 class="section_title-center">
          Consultez nos produits.
        </h2>
        <p class="product_description">
          Voici nos plantes. <br>
          Achetez et profitez de la meilleure qualité.
        </p>
        <div  class="product_container grid">
          <article v-for="produit of produits" :key="produit.id" class="product_card">
            <ProductCompo :produit="produit"></ProductCompo>
          </article> 
        </div>
    </section>    
</template>

<script>
import ProductCompo from '../components/Products/ProductCompo.vue';
export default {
  name: "ProductsView",
  components : {ProductCompo},
  computed:{
    produits() {
      return this.$store.state.produits;
    }
  }
};
</script>