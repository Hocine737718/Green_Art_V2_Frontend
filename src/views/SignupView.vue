<template>
    <section class="signup section container" id="signup">
        <form @submit.prevent="action_signup" class="signup_container grid">
            <h1 class="signup_title">Inscription</h1>
            <div class="signup_inputs">
                <div class="signup_box">
                    <input v-model="nom" type="text" placeholder="Nom" required class="signup_input" name="nom">
                    <i class="ri-user-fill"></i>
                </div>
                <div class="signup_box">
                    <input v-model="prenom" type="text" placeholder="Prénom" required class="signup_input" name="prenom">
                    <i class="ri-user-fill"></i>
                </div>
                <div class="signup_box">
                    <input v-model="email" type="email" placeholder="Email" required class="signup_input" name="email">
                    <i class="ri-mail-fill"></i>
                </div>
                <div class="signup_box">
                    <input v-model="mdp" type="password" placeholder="Mot de Passe" required class="signup_input" name="motPasse">
                    <i class="ri-lock-2-fill"></i>
                </div>
                <div class="signup_box">
                    <input v-model="remdp" type="password" placeholder="Confirmer Votre Mot de Passe" required class="signup_input" name="motPasse">
                    <i class="ri-lock-2-fill"></i>
                </div>
            </div>
            <button type="submit" class="signup_button">S'inscrir</button>
            <div class="signup_return">
                <router-link :to="{ name: 'login'}">Retour vers la page de connexion.</router-link>
            </div>
        </form>
    </section>
</template>
<script>
import axios from 'axios';
export default {
    name: 'SignupView',
    data() {
        return {
            nom: '',
            prenom: '',
            email: '',
            mdp: '',
            remdp: ''
        };
    },
    methods:{
        async action_signup(){
            try {
                const data = new URLSearchParams();
                data.append('inscription', JSON.stringify({ nom:this.nom, prenom:this.prenom, email: this.email, mdp: this.mdp, remdp: this.remdp  }));
                const response = await axios.post(`${this.$store.state.baseURL}/signup.php`, data);

                /*console.log(`response.data=${response.data}`);
                console.log(`response.data[0]=${response.data[0]}`);*/
                console.log(`response.data[1]=${response.data[1]}`);

                this.$router.push({ name: "login" });
            } 
            catch (error) {
                // Gestion des erreurs en cas d'échec de la inscription
                console.error("Erreur d'inscription:", error);
            }
        }
    },
}
</script>