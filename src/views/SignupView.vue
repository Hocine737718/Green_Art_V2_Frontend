<template>
    <section class="signup section container" id="signup">
        <form @submit.prevent="signup" class="signup_container grid">
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
import { useAxios } from '@/assets/js/global';
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
        async signup(){
            const dataLabel="signup";
            const dataContent=`{
                                "nom":"${this.nom}",
                                "prenom":"${this.prenom}",
                                "email":"${this.email}",
                                "mdp":"${this.mdp}",
                                "remdp":"${this.remdp}"
                                }`;
            const serverUrl=`${this.$store.state.baseURL}/signup.php`;
            const res=await useAxios(dataLabel,dataContent,serverUrl);
            if(!res.error){
                console.log("Signup -> ",res.msg);
                this.$router.push({ name: "login" });
            }
            else{
                console.error("Signup -> ",res.msg);
            }
        }
    },
}
</script>