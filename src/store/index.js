import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    baseURL: "http://localhost:80/server/Djennat_Green_Art/v2/php",
    produits:[],
    commandes:[],
    user:{image:"profile.png"},
    panier:[],
    searchQuery:""
  },

  getters: {
    token:()=>{
      const token = localStorage.getItem('token');
      if (token !== null && token !== undefined && token!="") {
        return token;
      }
      return null;
    }
  },

  mutations: {
    setProduits(state, produits) {
      state.produits = produits;
    },
    setCommandes(state, commandes) {
      state.commandes = commandes;
    },
    setUser(state, user) {
      if(user.image==null){
        user.image="profile.png";
      }

      const originalDate = new Date(user.date_creation);
      const day = originalDate.getDate().toString().padStart(2, '0');
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
      const year = originalDate.getFullYear();
      user.date_creation=`${day}/${month}/${year}`;

      state.user = user;
    },
    setPanier(state, panier) {
      state.panier = panier;
    },
    supprimerDuPanier(state, id_produit) {
      state.panier = state.panier.filter(ligne=>ligne.id_produit!=id_produit);
    },
    search(state, s){
      state.searchQuery=s;
    },
    logout(state){
      state.token="";
      localStorage.removeItem('token');
    }
  },

  actions: {
    async getProduits(context){
      try {
        const data = new URLSearchParams();
        data.append('get_produits', JSON.stringify({}));
        const response = await axios.post(`${context.state.baseURL}/get_produits.php`, data);
        
        if(response.data.success) context.commit('setProduits', response.data.success);
        else throw new Error(response.data.error);
      } 
      catch (error) {
        console.error("Erreur Get Produits:", error);
      }
    },
    async getCommandes(context){
      try {
        const data = new URLSearchParams();
        data.append('get_commandes', JSON.stringify({ token:context.state.token}));
        const response = await axios.post(`${context.state.baseURL}/get_commandes.php`, data);
        //console.log(`response.data=${response.data}`);
        //response.data.forEach(commande => console.log(commande));
        context.commit('setCommandes', response.data);
      } 
      catch (error) {
        console.error("Erreur Get Commandes:", error);
      }
    },
    async getUser(context){
      try {
        const data = new URLSearchParams();
        data.append('get_compte', JSON.stringify({ token:context.state.token}));
        const response = await axios.post(`${context.state.baseURL}/get_compte.php`, data);
        //console.log(`response.data=${response.data}`);
        //console.log(`response.data.mdp=${response.data.mdp}`);
        context.commit('setUser', response.data);
      } 
      catch (error) {
        console.error("Erreur Get User:", error);
      }
    },
    async getPanier(context){
      try {
        const data = new URLSearchParams();
        data.append('get_panier', JSON.stringify({ token:context.state.token}));
        const response = await axios.post(`${context.state.baseURL}/get_panier.php`, data);
        console.log(`panier response.data=${response.data}`);
        response.data.forEach(produit => console.log(produit));
        context.commit('setPanier', response.data);
      } 
      catch (error) {
        console.error("Erreur Get Panier:", error);
      }
    }    
  }
})
