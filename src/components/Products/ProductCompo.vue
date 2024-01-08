<template>
    <div class="product_circle"></div>
    <img v-bind:src="require(`@/assets/img/produits/${produit.image}`)" alt="imageProduit" class="product_img">
    <h3 class="product_title">{{ produit.titre }}</h3>
    <span class="product_price">{{ produit.prix }}.00 DA</span>
    <button class="button--flex product_button">
      <i class="ri-shopping-cart-fill"></i>
    </button>
</template>

<script>
export default {
  name: "ProductCompo",
  props: ["produit"]
};
</script>