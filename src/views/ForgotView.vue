<template>
    <section class="forgot-new_mdp section container" id="forgot-new_mdp">
        <form @submit.prevent="action_forgot" class="forgot_container grid">
            <h1 class="forgot_title">Récupérer votre mot de passe</h1>
            <div class="forgot_inputs">
                <div class="forgot_box">
                    <input v-model="email" type="email" placeholder="Email" required class="forgot_input" name="email">
                    <i class="ri-mail-fill"></i>
                </div>
            </div>
            <button type="submit" class="forgot_button" name="forgot">Vérifier votre email <i class="ri-arrow-up-circle-fill"></i></button>
            <div class="forgot_return">
                <router-link :to="{ name: 'login' }">Retour à page de connexion</router-link>
            </div>
        </form>
        <form @submit.prevent="action_new_mdp" class="new_mdp_container grid">
            <h1 class="new_mdp_title">Récupérer votre mot de passe</h1>
            <div class="new_mdp_inputs">
                <div class="new_mdp_box">
                    <input v-model="code_recup" type="text" placeholder="Code de récépuration"  required class="new_mdp_input" name="code">
                    <i class="ri-barcode-line"></i>
                </div>
                <div class="new_mdp_box">
                    <input v-model="mdp" type="password" placeholder="Mot de Passe"  required class="new_mdp_input" name="mdp">
                    <i class="ri-lock-2-fill"></i>
                </div>
                <div class="new_mdp_box">
                    <input v-model="remdp" type="password" placeholder="Confirmer votre mot de passe"  required class="new_mdp_input" name="remdp">
                    <i class="ri-lock-2-fill"></i>
                </div>
            </div>
            <button type="submit" class="new_mdp_button" name="modifier_mdp">Modifier votre mot de passe</button>
            <div class="new_mdp_return" @click="action_retour()">
                Revérifier votre email
            </div>
        </form>
    </section>
</template>

<script>
import $ from 'jquery';
import { useAxios } from '@/assets/js/global';
export default {
    name: 'ForgotView',
    data(){
        return{
            email:"",
            code_recup:"",
            mdp:"",
            remdp:""
        }
    },
    methods:{
        async action_forgot(){
            var forgot=$('.forgot_container');
            var new_mdp=$('.new_mdp_container');
            if(!forgot.hasClass('show_forgot')){
                forgot.addClass('show_forgot');
                new_mdp.addClass('show_new_mdp');
            }
            else{
                forgot.removeClass('show_forgot');
                new_mdp.removeClass('show_new_mdp');               
            }

            const dataLabel="forgot_mdp";
            const dataContent=`{
                                "email":"${this.email}"
                                }`;
            const serverUrl=`${this.$store.state.baseURL}/forgot_mdp.php`;
            const res=await useAxios(dataLabel,dataContent,serverUrl);
            if(!res.error){
                console.log("Forgot -> ",res.msg);
            }
            else{
                console.error("Forgot -> ",res.msg);
            }
        },
        async action_new_mdp(){
            const dataLabel="new_mdp";
            const dataContent=`{
                                "code_recup":"${this.code_recup}",
                                "mdp":"${this.mdp}",
                                "remdp":"${this.remdp}"
                                }`;
            const serverUrl=`${this.$store.state.baseURL}/new_mdp.php`;
            const res=await useAxios(dataLabel,dataContent,serverUrl);
            if(!res.error){                
                console.log("New Mdp-> ",res.msg);
                this.$router.push({ name: "login" });
            }
            else{
                console.error("New Mdp -> ",res.msg);
            }
        },
        action_retour(){
            var forgot=$('.forgot_container');
            var new_mdp=$('.new_mdp_container');
            if(new_mdp.hasClass('show_new_mdp')){
                forgot.removeClass('show_forgot');
                new_mdp.removeClass('show_new_mdp');
            }
            else{
                forgot.addClass('show_forgot');
                new_mdp.addClass('show_new_mdp');               
            }
        }
    }
}
</script>