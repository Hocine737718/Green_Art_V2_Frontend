<template>
    <section  class="section cart" id="cart">
        <div class="container cart_container">
            <div class="cart_title">
                <h2>Votre Panier</h2>
            </div>
            <div class="cart_content">
            <table class="cart_table">
                <thead class="cart_thead">
                    <tr>
                        <th class="cart_th">Num</th>
                        <th class="cart_th">Titre</th>
                        <th class="cart_th">Image</th>
                        <th class="cart_th">Prix Unitaire</th>
                        <th class="cart_th">Quantité</th>
                        <th class="cart_th  cart_prix">Prix total</th>
                        <th class="cart_th">Outils</th>
                    </tr>
                </thead>
                <tbody class="cart_tbody">
                    <tr v-if="lignes.length==0">
                        <td class="cart_td" style="text-align: center;width:100%;" colspan="7">Le panier est vide.</td>
                    </tr>
                    <tr v-for="ligne in lignes" :key="ligne">
                        <td class="cart_td">
                            {{ ligne.num }}
                        </td>
                        <td class="cart_td">
                            <img :src="ligne.image" width="70px" height="70px" alt="image produit">
                        </td>
                        <td class="cart_td">
                            {{ ligne.titre }}
                        </td>
                        <td class="cart_td">
                            {{ usePrixDA(ligne.prix) }}
                        </td>
                        <td class="cart_td">
                            <div class="cart_q">
                                <i class="ri-add-line" @click="add(ligne.id_produit)"></i>
                                <label>{{ ligne.quantite }}</label>
                                <i class="ri-subtract-line" @click="sub(ligne.id_produit)"></i>
                            </div>
                        </td>
                        <td class="cart_td cart_prix">
                            {{ usePrixDA(ligne.prix*ligne.quantite) }}
                        </td>
                        <td class="cart_td">
                            <i class="ri-delete-bin-2-fill del" @click="del(ligne.id_produit)"></i>
                        </td>
                    </tr>
                    <tr v-if="lignes.length!=0">
                        <td class="cart_td" style="border-top: 2px solid black;text-align: right;width:100%;" colspan="5">Total :</td>
                        <td class="cart_td cart_prix" style="border-top: 2px solid black;">{{this.total}}</td>
                        <td class="cart_td" style="border-top: 2px solid black;"></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <form @submit.prevent="validerCommande()" class="cart_footer">
                <div class="cart_title">
                    <h2>
                        Continuer Votre Commande 
                    </h2>
                </div>
                <div class="cart_inputs">
                    <input type="text" placeholder="Saisir Votre Addresse ici ..." v-model="this.addresse" required>
                    <input type="text" placeholder="Saisir Votre Téléphone ici ..." v-model="this.telephone" required>
                </div>
                <button> Valider </button>
            </form>
        </div>
    </section>
</template>

<script>
import {prixDA} from '@/assets/js/global.js';
import axios from 'axios';
export default {
    name: 'CartView',
    data(){
        return{
            addresse:"",
            telephone:""
        }
    },
    computed:{
        lignes(){
            return this.$store.state.panier;
        },
        total(){
            var total=0;
            for(let i in this.lignes) total+=Number(this.lignes[i].prix*this.lignes[i].quantite);
            return prixDA(total);
        },
        token(){
            return this.$store.getters.token;
        }
    },
    methods:{
        usePrixDA(x){
            return prixDA(x);
        },
        async add(id_produit){
            const ligneTrouvee = this.lignes.find(ligne => ligne.id_produit === id_produit);
            ligneTrouvee.quantite++;

            try{
                const data = new URLSearchParams();
                data.append('q_ligne_panier', JSON.stringify({token:this.token, id_produit: id_produit, quantite: ligneTrouvee.quantite}));
                const response = await axios.post(`${this.$store.state.baseURL}/q_ligne_panier.php`, data);

                if(response.data.success){
                    console.log("success",response.data.success);
                } 
                else throw new Error(response.data.error);
            }
            catch (error) {
                console.error('Erreur de connexion:', error);
            }
        },
        async sub(id_produit){
            const ligneTrouvee = this.lignes.find(ligne => ligne.id_produit === id_produit);
            if(ligneTrouvee.quantite>1){
                ligneTrouvee.quantite--;
                try{
                    const data = new URLSearchParams();
                    data.append('q_ligne_panier', JSON.stringify({token:this.token, id_produit: id_produit, quantite: ligneTrouvee.quantite}));
                    const response = await axios.post(`${this.$store.state.baseURL}/q_ligne_panier.php`, data);

                    if(response.data.success) console.log("success",response.data.success)
                    else throw new Error(response.data.error);
                }
                catch (error) {
                    console.error('Erreur de connexion:', error);
                }               
            }
        },
        async del(id_produit){
            try{
                this.$store.commit('supprimerDuPanier', id_produit);

                const data = new URLSearchParams();
                data.append('del_ligne_panier', JSON.stringify({token:this.token, id_produit: id_produit }));
                const response = await axios.post(`${this.$store.state.baseURL}/del_ligne_panier.php`, data);

                if(response.data.success) console.log("success",response.data.success)
                else throw new Error(response.data.error);
            }
            catch (error) {
                console.error('Erreur de connexion:', error);
            }
        },
        async validerCommande(){
            if(this.lignes.length!=0){
                try{
                    const data = new URLSearchParams();
                    data.append('add_commande', JSON.stringify({token:this.token, lignes:this.lignes,addresse:this.addresse, telephone:this.telephone }));
                    const response = await axios.post(`${this.$store.state.baseURL}/add_commande.php`, data);
                    
                    if(response.data.success){
                        location.reload();                   
                    }
                    else throw new Error(response.data.error);
                }
                catch (error) {
                    console.error('Erreur de connexion:', error);
                }
            }
        }
    }
}
</script>