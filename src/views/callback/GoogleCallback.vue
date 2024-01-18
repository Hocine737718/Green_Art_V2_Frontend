<template>
    <div></div>
</template>

<script>
import userManager from '@/google-auth-config';
import axios from 'axios';
import { useAxios } from '@/assets/js/global';
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
            const dataLabel="signin_google";
            const dataContent=`{
                                "email":"${this.email}",
                                "nom":"${this.nom}",
                                "prenom":"${this.prenom}"
                                }`;
            const serverUrl=`${this.$store.state.baseURL}/signin_google.php`;
            const res=await useAxios(dataLabel,dataContent,serverUrl);
            if(!res.error){
                console.log("Signin Google -> ",res.msg);
                localStorage.setItem("token", res.data);
            }
            else{
                console.error("Signin Google -> ",res.msg);
            }
            window.location='/';
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
                            console.error('Signin Google -> '+err);
                        }
                    }
                })
            })
            .catch((e)=>{
                window.location='/';
                console.error('Signin Google -> '+e);
            });
        },
    }
    ,
    created(){
        this.signupUserInApi();
    }
}
</script>