<template>
    <div class="product_circle"></div>
    <img v-bind:src="require(`@/assets/img/produits/${produit.imgUrl}`)" alt="imageProduit" class="product_img">
    <h3 class="product_title">{{ produit.nom }}</h3>
    <span class="product_price">{{ produit.prix }}</span>
    <button class="button--flex product_button">
      <i class="ri-shopping-bag-line"></i>
    </button>
</template>

<script>
export default {
  name: "ProductCompo",
  props: ["produit"]
};
</script>