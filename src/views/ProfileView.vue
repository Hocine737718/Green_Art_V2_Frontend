<template>
    <section class="profile section container" id="profile">
        <div class="profile_container grid">
            <h1 class="profile_header">Profile</h1>
            <div class="profile_form grid">
                <div class="profile_photo">
                    <img :src="this.user.image" alt="photo profile">
                    <button class="profile_button" @click="selectionner_image">
                        <i class="ri-edit-2-fill"></i>
                        Modifier
                    </button>
                    <input type="file" id="file_input" @change="handleFileChange">
                </div>
                <div class="profile_infos">
                    <div class="profile_labels">
                        <label >Date de création :</label>
                        <label>{{ user.date_creation }}</label>
                        <i class="ri-calendar-fill"></i>
                    </div>
                    <div class="profile_box">
                        <label >Nom :</label>
                        <input type="text" name="nom" class="profile_input" v-model="user.nom" required>
                        <i class="ri-user-fill"></i>
                    </div>
                    <div class="profile_box">
                        <label >Prénom :</label>
                        <input type="text" name="prenom" class="profile_input" v-model="user.prenom" required>
                        <i class="ri-user-fill"></i>
                    </div>
                    <div class="profile_box">
                        <label >Email :</label>
                        <input type="email" name="email" class="profile_input" v-model="user.email" required>
                        <i class="ri-mail-fill"></i>
                    </div>
                    <div class="profile_buttons">
                        <button @click="sauvegarder" class="profile_button">
                            <i class="ri-save-2-fill"></i>
                            Sauvegarder 
                        </button>
                        <button @click="reset" class="profile_button">
                            <i class="ri-refresh-fill"></i>
                            Refaire
                        </button>
                    </div>
                </div>
            </div>
            <div class="profile_mdp">
                <div class="profile_ligne"></div>
                <span @click="edit_mdp()">Vous pouvez modifier votre mot de passe ici.</span>
            </div>
        </div>
    </section>
    <CommandesCompo :user="user"></CommandesCompo>
    <EditMdpCompo></EditMdpCompo>
</template>
<script>
import $ from 'jquery';
import axios from 'axios';
import {loadImage}  from '@/assets/js/global.js';
import CommandesCompo from '@/components/Profile/CommandesCompo.vue';
import EditMdpCompo from '@/components/Profile/EditMdpCompo.vue';
export default {
    name: 'ProfileView',
    data(){
        return{
            selected_img:null
        }
    },
    components:{
        EditMdpCompo,
        CommandesCompo
    },
    computed:{
        token() {
            return this.$store.getters.token;
        },
        user() {
            return this.$store.state.user;
        }
    },
    methods:{
        async sauvegarder(){
            try {
                var data = new URLSearchParams();
                this.user.token=this.token;
                data.append('edit_profil', JSON.stringify(this.user));
                var response = await axios.post(`${this.$store.state.baseURL}/edit_profil.php`, data);

                if(response.data.success) console.log("success",response.data.success);
                else throw new Error(response.data.error);
                if(this.selected_img!=null){
                    console.log("flg 02");
                    data = new FormData();
                    data.append('edit_image', `{"token":"${this.token}"}`);
                    data.append('profile_img', this.selected_img);

                    response = await axios.post(`${this.$store.state.baseURL}/edit_image.php`, data);

                    if(response.data.success){
                        console.log("success",JSON.stringify(response.data).success);
                        this.user.image = loadImage('clt',response.data.profile_img);
                    } 
                    else throw new Error(response.data.error);
                }
            } 
            catch (error) {
                console.error(JSON.stringify(response.data).error);
            }
        },
        async reset(){
            this.$store.dispatch('getUser');
        },
        selectionner_image(){
            var file_input = document.getElementById("file_input");
            file_input.click();
        },
        async handleFileChange(event) {
            try{
                const fileList = event.target.files;
                if (fileList.length > 0) 
                {
                    this.selected_img=fileList[0];
                    console.log("flg 01");
                    if(this.selected_img.type !== "image/jpeg" && 
                       this.selected_img.type !== "image/png" &&
                       this.selected_img.type !== "image/jpg")
                    {
                        throw new Error("Erreur Type Image");
                    }
                    else
                    {
                        this.sauvegarder();
                    }
                }
                else
                {
                    console.log("Aucun fichier sélectionné");
                }
            }
            catch (error) {
                this.selected_img=null;
                console.error(error);
            }
        },
        edit_mdp(){
            $('.edit_mdp').addClass("show_edit_mdp");          
        }
    },
}
</script>