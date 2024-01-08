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
                    <div class="profile_box">
                        <label >Mot de passe :</label>
                        <input type="password" class="profile_input" v-model="user.mdp" id="profile-mdp" required>
                        <i class="eye_icon ri-eye-fill" @click="visualiser()"></i>
                    </div>

                    <div class="profile_buttons">
                        <button type="submit" class="profile_button">
                            <i class="ri-save-2-fill"></i>
                            Mémoriser 
                        </button>
                        <button @click="reset" class="profile_button">
                            <i class="ri-refresh-fill"></i>
                            Refaire
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>
    <CommandesCompo :user="user"></CommandesCompo>
</template>
<script>
import $ from 'jquery';
import axios from 'axios';
import CommandesCompo from '@/components/Profile/CommandesCompo.vue';
export default {
    name: 'ProfileView',
    components:{
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

                
                console.log(`response.data=${response.data}`);
                console.log(`response.data[0]=${response.data[0]}`);
                console.log(`response.data[1]=${response.data[1]}`);
            } 
            catch (error) {
                // Gestion des erreurs en cas d'échec de la connexion
                console.error('Erreur de connexion:', error);
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
            // Obtenir la liste des fichiers sélectionnés
            const fileList = event.target.files;
            // Vérifier s'il y a des fichiers
            if (fileList.length > 0) {
                // Obtenir le nom du premier fichier
                this.user.image = fileList[0].name;
            } 
            else {
                console.log("Aucun fichier sélectionné");
            }
        },
        visualiser(){
            const eye_icon=$('.eye_icon');
            const profile_mdp = $('#profile-mdp');
            if (profile_mdp.prop('type') === 'password') {
                profile_mdp.prop('type','text');
                eye_icon.addClass('ri-eye-off-fill');
            } 
            else {
                profile_mdp.prop('type','password');
                eye_icon.removeClass('ri-eye-off-fill');
            } 
        }
    }
}
</script>