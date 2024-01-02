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
  data() {
    return {
      produits: [
        {"id":"1","nom":"Cacti Plant","prix":"2000 DA","imgUrl":"1.png"},
        {"id":"2","nom":"Cactus Plant","prix":"1000 DA","imgUrl":"2.png"},
        {"id":"3","nom":"Aloe Vera Plant","prix":"3000 DA","imgUrl":"3.png"},
        {"id":"4","nom":"Succulent Plant","prix":"4000 DA","imgUrl":"4.png"},
        {"id":"4","nom":"Succulent Plant","prix":"1000 DA","imgUrl":"5.png"},
        {"id":"4","nom":"Green Plant","prix":"7000 DA","imgUrl":"6.png"}
      ]
    };
  },
};
</script>