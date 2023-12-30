<template>
    <nav class="nav container">
        <a href="#" id="logo">
            <img src="../../assets/img/logo.png" alt="logo">
        </a>
        <div class="nav_menu" id="nav-menu">
            <ul class="nav_list">
                <li class="nav_item">
                    <a href="#home" class="nav_link">
                        Acceuil
                    </a>
                </li>
                <li class="nav_item">
                    <a href="#products" class="nav_link">
                        Produits
                    </a>
                </li>
                <li class="nav_item">
                    <a href="#contact" class="nav_link">
                        Contactez-nous
                    </a>
                </li>
                <li class="nav_item">
                    <a href="#login" class="nav_link">
                       Se Connecter
                    </a>
                </li>
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
