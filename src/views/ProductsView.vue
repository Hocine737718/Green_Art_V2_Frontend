<template>
    <section class="product section container" id="products">
        <h2 class="section_title-center">
          Consultez nos produits.
        </h2>
        <p class="product_description">
          Voici nos plantes. <br>
          Achetez et profitez de la meilleure qualité.
        </p>
        <div v-if="filterProduits.length!=0"  class="product_container grid">
          <article v-for="produit of filterProduits" :key="produit.id" class="product_card">
            <ProductCompo :produit="produit"></ProductCompo>
          </article> 
        </div>
        <div v-else  class="product_null">
          Aucun produit trouvé.
        </div>
    </section>    
</template>

<script>
import ProductCompo from '../components/Products/ProductCompo.vue';
export default {
  name: "ProductsView",
  components : {ProductCompo},
  computed:{
    searchQuery(){
      return this.$store.state.searchQuery;
    },
    produits() {
      return this.$store.state.produits;
    },
    filterProduits() {
      let filteredData=this.produits.filter(
        produit =>
          produit.titre.toString().toLowerCase().includes(this.searchQuery.toLowerCase())||
          produit.prix.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        return filteredData;
    },
  }
};
</script>