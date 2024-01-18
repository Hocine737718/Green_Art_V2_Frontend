<template>
    <div></div>
</template>
<script>
export default {
    name: 'LogoutView',
    mounted(){
        this.$store.dispatch('logout');
    }
}
</script>