<template>
    <div class="product_circle"></div>
    <img v-bind:src="require(`@/assets/img/produits/${produit.image}`)" alt="imageProduit" class="product_img">
    <h3 class="product_title">{{ produit.titre }}</h3>
    <span class="product_price">{{ produit.prix }}.00 DA</span>
    <button class="button--flex product_button">
      <i class="ri-shopping-cart-fill" @click="ajouterAuPanier"></i>
    </button>
</template>

<script>
import axios from 'axios';
export default {
  name: "ProductCompo",
  props: ["produit"],
  methods:{
    async ajouterAuPanier(){
      const data = new URLSearchParams();
      data.append('add_ligne_panier', JSON.stringify({token:"token0001", id_produit: this.produit.id, quantite: 1}));
      const response = await axios.post(`${this.$store.state.baseURL}/add_ligne_panier.php`, data);
      console.log(`response.data=${response.data}`);
      this.$store.dispatch('getPanier');  
    }
  }
};
</script>