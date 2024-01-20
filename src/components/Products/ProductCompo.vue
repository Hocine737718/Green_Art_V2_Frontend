<template>
    <div class="product_circle"></div>
    <img :src="produit.image" alt="imageProduit" class="product_img">
    <h3 class="product_title">{{ produit.titre }}</h3>
    <span class="product_price">{{ produit.prix }}</span>
    <button class="button--flex product_button">
      <i class="ri-shopping-cart-fill" @click="ajouterAuPanier"></i>
    </button>
</template>

<script>
import {useAxios}  from '@/assets/js/global.js';
export default {
  name: "ProductCompo",
  props: ["produit"],
  computed:{
    token(){
      return this.$store.getters.token;
    }
  },
  methods:{
    async ajouterAuPanier(){
      if(this.token){
        const dataLabel="add_ligne_panier";
        const dataContent=`{"token":"${this.token}", "id_produit": "${this.produit.id}"}`;
        const serverUrl=`${this.$store.state.baseURL}/add_ligne_panier.php`;
        const res=await useAxios(dataLabel,dataContent,serverUrl);
        if(!res.error)
        {
          console.log("Add Cart -> ",res.msg);
          this.$store.dispatch('getPanier');
        }
        else
        {
          console.error("Add Cart -> ",res.msg);
        }
      }
      else{
        console.error("Add Cart -> ", "Il faut se connecter d'abord !!");
      }
    }
  }
};
</script>