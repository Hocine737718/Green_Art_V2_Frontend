<template>
    <section class="profile section container" id="profile">
        <div class="profile_container grid">
            <h1 class="profile_header">Profile</h1>
            <form @submit.prevent="sauvegarder" class="profile_form grid">
                <div class="profile_photo">
                    <img :src="require(`@/assets/img/clt/${this.user.image}`)" alt="photo profile">
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
                        <button type="submit" class="profile_button">
                            <i class="ri-save-2-fill"></i>
                            Sauvegarder 
                        </button>
                        <button @click="reset" class="profile_button">
                            <i class="ri-refresh-fill"></i>
                            Refaire
                        </button>
                    </div>
                </div>
            </form>
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
import CommandesCompo from '@/components/Profile/CommandesCompo.vue';
import EditMdpCompo from '@/components/Profile/EditMdpCompo.vue';
export default {
    name: 'ProfileView',
    components:{
        EditMdpCompo,
        CommandesCompo
    },
    computed:{
        user() {
            return this.$store.state.user;
        }
    },
    methods:{
        async sauvegarder(){
            try {
                const data = new URLSearchParams();
                data.append('edit_profil', JSON.stringify(this.user));
                const response = await axios.post(`${this.$store.state.baseURL}/edit_profil.php`, data);

                
                if(response.data.success) console.log("success",response.data.success);
                else throw new Error(response.data.error);
            } 
            catch (error) {
                console.error('Erreur de profile:', error);
            }
        },
        async reset(){
            this.$store.dispatch('getUser');
        },
        selectionner_image(){
            var file_input = document.getElementById("file_input");
            file_input.click();
        },
        handleFileChange(event) {
            const fileList = event.target.files;
            if (fileList.length > 0) {
                this.user.image = fileList[0].name;
            } 
            else {
                console.log("Aucun fichier sélectionné");
            }
        },
        edit_mdp(){
            $('.edit_mdp').addClass("show_edit_mdp");          
        }
    }
}
</script>