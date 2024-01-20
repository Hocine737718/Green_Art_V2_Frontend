<template>
    <section class="edit_mdp" id="edit_mdp">
        <div class="edit_mdp_container grid">
            <h1 class="edit_mdp_title">Modifier Votre Mot de Passe</h1>
            <form @submit.prevent="sauvegarder" class="edit_mdp_form grid">
                <div class="edit_mdp_inputs">
                    <input type="password" name="mdp" placeholder="Saisir votre mot de passe actuel." class="edit_mdp_input" v-model="mdp" required>
                    <i class="ri-lock-2-fill"></i>
                </div>
                <div class="edit_mdp_inputs">
                    <input type="password" name="new_mdp" placeholder="Saisir votre nouveau mot de passe." class="edit_mdp_input" v-model="new_mdp" required>
                    <i class="ri-lock-2-fill"></i>
                </div>
                <div class="edit_mdp_inputs">
                    <input type="password" name="re_new_mdp" placeholder="Confirmer votre nouveau mot de passe." class="edit_mdp_input" v-model="re_new_mdp" required>
                    <i class="ri-lock-2-fill"></i>
                </div>
                <button type="submit" class="edit_mdp_button">
                    <i class="ri-save-2-fill"></i>
                    Sauvegarder 
                </button>
            </form>
        </div>
        <i class="ri-close-line edit_mdp_close" id="edit_mdp-close"  @click="close()"></i>
    </section>
</template>

<script>
import $ from 'jquery'
import {useAxios}  from '@/assets/js/global.js';
export default {
    name: 'EditMdpCompo',
    data(){
        return{
            mdp:"",
            new_mdp:"",
            re_new_mdp:""
        }
    },
    computed:{
        token(){
            return this.$store.getters.token;
        }
    },
    methods:{
        close(){
            $('.edit_mdp').removeClass("show_edit_mdp");  
            $('main').removeClass('fix_height');
        },
        async sauvegarder(){
            const dataLabel="edit_mdp";
            const dataContent=`{"token":"${this.token}","mdp":"${this.mdp}","new_mdp":"${this.new_mdp}","re_new_mdp":"${this.re_new_mdp}"}`;
            const serverUrl=`${this.$store.state.baseURL}/edit_mdp.php`;
            const res=await useAxios(dataLabel,dataContent,serverUrl);
            if(!res.error){
                console.log("Edit Password -> ",res.msg);
                this.mdp="";this.re_new_mdp="";this.new_mdp="";
                $('.edit_mdp').removeClass("show_edit_mdp"); 
                $('main').removeClass('fix_height');
            }
            else{
                console.error("Edit Password -> ",res.msg);
            }                       
        }
    }
    
}
</script>