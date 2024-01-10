<template>
    <section class="forgot-new_mdp section container" id="forgot-new_mdp">
        <form @submit.prevent="action_forgot" class="forgot_container grid">
            <h1 class="forgot_title">Récupérer votre mot de passe</h1>
            <div class="forgot_inputs">
                <div class="forgot_box">
                    <input v-model="email" type="email" placeholder="Email" class="forgot_input" name="email">
                    <i class="ri-mail-fill"></i>
                </div>
            </div>
            <button type="submit" class="forgot_button" name="forgot">Vérifier votre email <i class="ri-arrow-up-circle-fill"></i></button>
        </form>
        <form @submit.prevent="action_new_mdp" class="new_mdp_container grid">
            <h1 class="new_mdp_title">Récupérer votre mot de passe</h1>
            <div class="new_mdp_inputs">
                <div class="new_mdp_box">
                    <input v-model="code_recup" type="text" placeholder="Code de récépuration" class="new_mdp_input" name="code">
                    <i class="ri-barcode-line"></i>
                </div>
                <div class="new_mdp_box">
                    <input v-model="mdp" type="password" placeholder="Mot de Passe" class="new_mdp_input" name="mdp">
                    <i class="ri-lock-2-fill"></i>
                </div>
                <div class="new_mdp_box">
                    <input v-model="remdp" type="password" placeholder="Confirmer votre mot de passe" class="new_mdp_input" name="remdp">
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
import axios from 'axios';
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

            const data = new URLSearchParams();
            data.append('forgot', JSON.stringify({email:this.email}));
            const response = await axios.post(`${this.$store.state.baseURL}/forgot.php`, data);

            if(response.data.success) console.log(response.data.success);
            else throw new Error(response.data.error);
        },
        async action_new_mdp(){
            const data = new URLSearchParams();
            data.append('new_mdp', JSON.stringify({code_recup:this.code_recup, mdp:this.mdp, remdp:this.remdp}));
            const response = await axios.post(`${this.$store.state.baseURL}/new_mdp.php`, data);

            if(response.data.success) this.$router.push({ name: "login" });
            else throw new Error(response.data.error);
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