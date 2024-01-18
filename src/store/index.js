import { createStore } from 'vuex';
import axios from 'axios';
import {loadImage, prixDA} from '@/assets/js/global.js';
import { useAxios } from '@/assets/js/global';

export default createStore({
  state: {
    baseURL: "http://localhost:80/server/Djennat_Green_Art/v2/php",
    produits:[],
    commandes:[],
    user:{image:loadImage("clt",null)},
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
    },
    cartCount:(state)=>{
      return state.panier.length;
    }
  },

  mutations: {
    setProduits(state, produits) {
      produits.forEach(prd => {
        prd.prix=prixDA(prd.prix);
        prd.image=loadImage("produits",prd.image);
      });
      state.produits = produits;
    },
    setCommandes(state, commandes) {
      commandes.forEach(comm => {
        comm.total=prixDA(comm.total);
        comm.lignes.forEach((ligne)=>{
          ligne.image=loadImage("produits",ligne.image);
        });
      });
      state.commandes = commandes;
    },
    setUser(state, user) {
      user.image=loadImage("clt",user.image);

      const originalDate = new Date(user.date_creation);
      const day = originalDate.getDate().toString().padStart(2, '0');
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
      const year = originalDate.getFullYear();
      user.date_creation=`${day}/${month}/${year}`;

      state.user = user;
    },
    setPanier(state, panier) {
      panier.forEach((ligne)=>{
        ligne.image=loadImage("produits",ligne.image);
      });
      state.panier = panier;
    },
    supprimerDuPanier(state, id_produit) {
      state.panier = state.panier.filter(ligne=>ligne.id_produit!=id_produit);
    },
    search(state, s){
      state.searchQuery=s;
    },
    logout(){
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
        data.append('get_commandes', JSON.stringify({ token:context.getters.token}));
        const response = await axios.post(`${context.state.baseURL}/get_commandes.php`, data);

        if(response.data.success) context.commit('setCommandes', response.data.success);
        else throw new Error(response.data.error);
      } 
      catch (error) {
        console.error("Erreur Get Commandes:", error);
      }
    },
    async getUser(context){
      try {
        const data = new URLSearchParams();
        data.append('get_compte', JSON.stringify({ token:context.getters.token}));
        const response = await axios.post(`${context.state.baseURL}/get_compte.php`, data);

        if(response.data.success) context.commit('setUser', response.data.success);
        else throw new Error(response.data.error);
      } 
      catch (error) {
        console.error("Erreur Get User:", error);
      }
    },
    async getPanier(context){
      try {
        const data = new URLSearchParams();
        data.append('get_panier', JSON.stringify({ token:context.getters.token}));
        const response = await axios.post(`${context.state.baseURL}/get_panier.php`, data);
        
        if(response.data.success) context.commit('setPanier', response.data.success);
        else throw new Error(response.data.error);
      } 
      catch (error) {
        console.error("Erreur Get Panier:", error);
      }
    },
    async login(context,{ email, mdp }){
      const dataLabel="login_email";
      const dataContent=`{
                          "email":"${email}",
                          "mdp":"${mdp}"
                        }`;
      const serverUrl=`${context.state.baseURL}/login_email.php`;
      const res=await useAxios(dataLabel,dataContent,serverUrl);
      if(!res.error){                
        console.log("Login-> ",res.msg);
        localStorage.setItem("token", res.data);
        window.location = "/";
      }
      else{
        console.error("Login -> ",res.msg);
      }      
    },
    async logout(context){
      const dataLabel="logout";
      const dataContent=`{
                          "token":"${context.getters.token}"
                        }`;
      const serverUrl=`${context.state.baseURL}/logout.php`;
      const res=await useAxios(dataLabel,dataContent,serverUrl);
      if(!res.error){                
        console.log("Logout-> ",res.msg);
        window.location = "/login";
      }
      else{
        console.error("Login -> ",res.msg);
      }      
    }   
  }
})
