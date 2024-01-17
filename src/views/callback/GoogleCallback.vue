<template>
    <div></div>
</template>

<script>
import userManager from '@/google-auth-config';
import axios from 'axios';
export default {
    name: "GoogleCallback",
    data(){
        return{
            prenom:'',
            nom:'',
            email:'',
        }
    },
    methods:{
        async signup(){
            try {
                const data = new URLSearchParams();
                data.append('signin_google', JSON.stringify({ nom:this.nom, prenom:this.prenom, email: this.email  }));
                const response = await axios.post(`${this.$store.state.baseURL}/signin_google.php`, data);
                
                if(response.data.success){
                    console.log("success",response.data.success);
                    localStorage.setItem("token", response.data.success);
                }
                else throw new Error(response.data);
            } 
            catch (error) {
                // Gestion des erreurs en cas d'échec de la inscription
                console.error("Erreur d'inscription:", error);
            }
            finally{
                window.location='/';
            }
        },
        signupUserInApi(){
            userManager.signinRedirectCallback().then(() => {
                // Récupérez l'utilisateur actuel
                userManager.getUser().then(async (user) => {
                    if (user && user.access_token) {
                        // Vous avez maintenant accès au token d'accès
                        const accessToken = user.access_token;
                        // Faites une demande pour obtenir les informations du profil de l'utilisateur
                        try {
                            const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', 
                            {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                            });

                            // La réponse contient les informations du profil de l'utilisateur
                            const userProfile = response.data;

                            this.prenom = userProfile.given_name;
                            this.nom = userProfile.family_name;
                            this.email = userProfile.email;
                            
                            this.signup();
                        }
                        catch (err) {
                            window.location='/';
                            alert('Erreur getUser : '+err);
                        }
                    }
                })
            })
            .catch((e)=>{
                window.location='/';
                alert('Erreur signinRedirectCallback : '+e);
            });
        },
    }
    ,
    created(){
        this.signupUserInApi();
    }
}
</script>