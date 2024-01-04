<template>
    <section class="profile section container" id="profile">
        <div class="profile_container grid">
            <h1 class="profile_header">Profile</h1>
            <form class="profile_form grid">
                <div class="profile_photo">
                    <img src="../assets/img/clt/profile.png" alt="photo profile">
                    <button class="profile_button">
                        <i class="ri-edit-2-fill"></i>
                        Modifier
                    </button>
                </div>
                <div class="profile_infos">
                    <div class="profile_labels">
                        <label >Date de création :</label>
                        <label >04/01/2024</label>
                        <i class="ri-calendar-fill"></i>
                    </div>
                    <div class="profile_box">
                        <label >Nom :</label>
                        <input type="text" name="nom" class="profile_input" value="Hocine">
                        <i class="ri-user-fill"></i>
                    </div>
                    <div class="profile_box">
                        <label >Prénom :</label>
                        <input type="text" name="prenom" class="profile_input" value="Billel">
                        <i class="ri-user-fill"></i>
                    </div>
                    <div class="profile_box">
                        <label >Email :</label>
                        <input type="email" name="email" class="profile_input" value="hocine737718@gmail.com">
                        <i class="ri-mail-fill"></i>
                    </div>
                    <div class="profile_box">
                        <label >Mot de passe :</label>
                        <input type="password" name="mdp" class="profile_input" value="hocine737718" id="profile-mdp">
                        <i class="eye_icon ri-eye-fill"></i>
                    </div>

                    <div class="profile_buttons">
                        <button type="submit" class="profile_button">
                            <i class="ri-save-2-fill"></i>
                            Mémoriser 
                        </button>
                        <button type="reset" class="profile_button">
                            <i class="ri-refresh-fill"></i>
                            Refaire
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>
<script>
export default {
    name: 'ProfileView',
    //props: ["baseURL"],
    data() {
        return {
            email: '',
            mdp: '',
        };
    },
  computed:{
    user() {
      return this.$store.state.user;
    }
  }
}
</script>