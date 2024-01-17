<template>
    <section class="login section container" id="login">
        <div class="login_container grid">
            <form @submit.prevent="login_email">
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
                    <router-link :to="{ name: 'forgot' }" class="login_forgot">Mot de passe oublié?</router-link>
                </div>
                <button type="submit" class="login_button" name="connexion">Se Connecter</button>
                <div class="login_register">
                    Vous n'avez pas de compte ? <router-link :to="{ name: 'signup'}">S'inscrir</router-link>
                </div>
            </form>
            <div class="login_google">
                <div class="login_ou">
                    <div class="login_ligne"></div>
                    ou
                    <div class="login_ligne"></div>
                </div>
                <button @click="signin_google()">
                    Se Connecter avec Google
                    <i class="ri-google-fill"></i>
                </button>
            </div>
        </div>
    </section>    
</template>
<script>
import userManagerG from '@/google-auth-config';
export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            mdp: '',
        };
    },
    methods:{
        async login_email(){
            this.$store.dispatch('login',{ email:this.email, mdp:this.mdp});
        },
        async signin_google(){
            userManagerG.signinRedirect();
        }
    }
}
</script>