<template>
    <section class="commandes section container" id="commandes">
        <div class="commandes_container">
            <div class="commandes_header">
                <h2>Votre Commandes</h2>
                <div class="input-group">
                    <input type="search" placeholder="Rechercher..." v-model="this.searchQuery">
                    <i class='ri-search-line'></i>
                </div>
            </div>
            <div class="commandes_body">
                <table class="commandes_table">
                    <thead class="commandes_thead">
                        <tr>
                            <th class="commandes_th" @click="setSort('num',$event)"> Num <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th" @click="setSort('date_commande',$event)"> Date <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th" @click="setSort('etat',$event)"> Etat <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th" @click="setSort('addresse',$event)"> Addresse <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th" @click="setSort('telephone',$event)"> Telephone <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th" @click="setSort('total',$event)"> Total <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th"> Details</th>
                        </tr>
                    </thead>
                    <tbody class="commandes_tbody">
                        <tr v-if="filterCommandes.length==0">
                            <td class="commandes_td" style="text-align: center;width:100%;min-width: 800px;" colspan="7">Aucun résultat trouvé.</td>
                        </tr>
                        <tr v-for="commande in filterCommandes" :key="commande">
                            <td class="commandes_td">{{ commande.num }}</td>
                            <td class="commandes_td">{{ commande.date_commande }}</td>
                            <td v-if="commande.etat=='livré'"><div class="state delivered">livré</div></td>
                            <td v-if="commande.etat=='annulé'"><div class="state cancelled">annulé</div></td>
                            <td v-if="commande.etat=='en attente'"><div class="state pending">en attente</div></td>
                            <td class="commandes_td">{{ commande.addresse }}</td>
                            <td class="commandes_td">{{ commande.telephone }}</td>
                            <td class="commandes_td">{{commande.total}}</td>
                            <td class="commandes_td" @click="setNumCommande(commande.num)"><i class="ri-eye-fill"></i> Voir</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <LignesCommandeCompo :lignes="this.lignes"/>
</template>

<script>
import $ from 'jquery';
import LignesCommandeCompo from './LignesCommandeCompo.vue';
export default {
    name: 'CommandesCompo',
    components: {LignesCommandeCompo},
    data(){
        return {
            searchQuery: "",
            sortColumn: null,
            sortOrder: 'asc',
            headers:['num','date_commande','etat','addresse','telephone','total'],
            numCommande:""
        }
    },
    computed:{
        commandes(){
            return this.$store.state.commandes;
        },
        filterCommandes() {
            let filteredData=this.commandes.filter(
                commande =>
                    commande.num.toString().toLowerCase().includes(this.searchQuery.toLowerCase())||
                    commande.date_commande.toString().toLowerCase().includes(this.searchQuery.toLowerCase())||
                    commande.etat.toString().toLowerCase().includes(this.searchQuery.toLowerCase())||
                    commande.addresse.toString().toLowerCase().includes(this.searchQuery.toLowerCase())||
                    commande.telephone.toString().toLowerCase().includes(this.searchQuery.toLowerCase())||
                    commande.total.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            if (this.sortColumn) {
                const orderFactor = this.sortOrder === 'asc' ? 1 : -1;
                filteredData = filteredData.sort((a, b) =>
                    (a[this.sortColumn] > b[this.sortColumn] ? 1 : -1) * orderFactor
                );
            }
            return filteredData;
        },
        lignes(){
            if(this.numCommande!="")
                return this.commandes.filter(commande => commande.num===this.numCommande)[0].lignes;
            else
                return [];
        }
    },
    methods: {
        setSort(column,event) {
            if(this.filterCommandes.length!=0){
                let index=this.headers.indexOf(column);

                let head=event.currentTarget;
                if (column === this.sortColumn) {
                    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
                } 
                else {
                    this.sortColumn = column;
                    this.sortOrder = 'asc';
                }

                $('thead th').each(function(){
                    $(this).removeClass('active');
                });
                head.classList.add('active');
                $('td').each(function(){
                    $(this).removeClass('active');
                });
                $('tbody tr').each(function(){
                    $(this).find('td').each(function(i){
                        if(index==i){
                            $(this).addClass('active');
                        } 
                    });
                });
                head.classList.toggle('desc', this.sortOrder==="desc" );
            }
        },
        setNumCommande(num){
            this.numCommande=num;//pour avoir la commande à affiché
            $('.lignes_commande').addClass('show_lignes');
            $('main').addClass('fix_height');
        }
    }
}
</script>
