<template>
    <nav class="nav container">
        <a href="#" id="logo">
            <img src="../../assets/img/logo.png" alt="logo">
        </a>
        <div class="nav_menu" id="nav-menu">
            <ul class="nav_list">
                <li class="nav_item">
                    <router-link :to="{ name: 'acceuil' }" class="nav_link">
                        Acceuil
                    </router-link>
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'produits' }" class="nav_link">
                        Produits
                    </router-link>
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'contactez-nous' }" class="nav_link">
                        Contactez-nous
                    </router-link>
                </li>
                <!--li class="nav_item">
                    <router-link :to="{ name: 'se-connecter' }" class="nav_link">
                       Se Connecter
                    </router-link>
                </li-->
            </ul>
            <div class="nav_close" id="nav-close">
                <i class="ri-close-line nav_icon"></i>
            </div>
        </div>
        <div class="nav_btns">
            <i class="ri-moon-line nav_icon" id="theme-button"></i>
            <div class="nav_toggle" id="nav-toggle">
                <i class="ri-menu-line nav_icon"></i>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: "NavbarCompo",
  //props: ["cartCount"],
  data() {
    return {
      token: null,
    };
  },
  mounted() {
    //this.token = localStorage.getItem("token");
  },
};
</script>
