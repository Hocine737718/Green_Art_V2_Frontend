<template>
    <div></div>
</template>
<script>
export default {
    name: 'LogoutView',
    mounted(){
        this.$store.commit('logout');
        window.location = "/login";
    }
}
</script>