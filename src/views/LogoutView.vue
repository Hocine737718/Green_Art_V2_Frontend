<script>
export default {
    name: 'LogoutView',
    mounted(){
        this.$store.commit('logout');
        this.$router.push({ name: "login" });
    }
}
</script>