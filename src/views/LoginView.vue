<template>
    <section class="login section container" id="login">
        <form @submit.prevent="action_login" class="login_container grid">
            <h1 class="login_title">Connexion</h1>
            <div class="login_inputs">
                <div class="login_box">
                    <input v-model="email" type="email" placeholder="Email" required class="login_input" name="email">
                    <i class="ri-mail-fill"></i>
                </div>
                <div class="login_box">
                    <input v-model="mdp" type="password" placeholder="Mot de Passe" required class="login_input" name="mdp">
                    <i class="ri-lock-2-fill"></i>
                </div>
            </div>
            <div class="login_forgot_container">
                <a href="#" class="login_forgot">Mot de passe oublié?</a>
            </div>
            <button type="submit" class="login_button" name="connexion">Se Connecter</button>
            <div class="login_register">
               Vous n'avez pas de compte ? <router-link :to="{ name: 'signup'}">S'inscrir</router-link>
            </div>
        </form>
    </section>    
</template>
<script>
import axios from 'axios';
export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            mdp: '',
        };
    },
    methods:{
        async action_login(){
            try {
                const data = new URLSearchParams();
                data.append('connexion', JSON.stringify({ email: this.email, mdp: this.mdp }));
                const response = await axios.post(`${this.$store.state.baseURL}/login_email.php`, data);

                /*
                console.log(`response.data=${response.data}`);
                console.log(`response.data[0]=${response.data[0]}`);
                console.log(`response.data[1]=${response.data[1]}`);
                */

                localStorage.setItem("token", response.data[1]);
                this.$router.push({ name: "acceuil" });
            } 
            catch (error) {
                // Gestion des erreurs en cas d'échec de la connexion
                console.error('Erreur de connexion:', error);
            }
        }
    }
}
</script>