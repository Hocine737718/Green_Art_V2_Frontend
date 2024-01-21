<template>
    <div class="lignes_commande" id="lignes_commande">
        <div class="lignes_container">
            <h2 class="lignes_title">Votre Commande</h2>
            <div class="lignes_infos">
                <table class="lignes_table">
                    <thead class="lignes_thead">
                        <tr>
                            <!--th class="lignes_th">Num</th-->
                            <th class="lignes_th">Titre</th>
                            <th class="lignes_th">Image</th>
                            <th class="lignes_th">Prix</th>
                            <th class="lignes_th">Quantite</th>
                            <th class="lignes_th">Total</th>
                        </tr>
                    </thead>
                    <tbody class="lignes_tbody">
                        <tr v-if="this.lignes.length==0">
                            <td class="lignes_td" style="text-align: center;width:100%;" colspan="6">Aucun produit trouvé.</td>
                        </tr>
                        <template v-else>
                            <tr v-for="ligne in this.lignes" :key="ligne.id">
                                <!--td class="lignes_td">{{ ligne.num }}</td-->
                                <td class="lignes_td">{{ ligne.titre }}</td>
                                <td class="lignes_td"><img :src="ligne.image" width="70px" height="70px" alt="image produit"></td>
                                <td class="lignes_td">{{usePrixDA(ligne.prix)}}</td>
                                <td class="lignes_td">{{ ligne.quantite }}</td>
                                <td class="lignes_td">{{usePrixDA(ligne.total)}}</td>
                            </tr>
                            <tr>
                                <td class="lignes_td" style="text-align: right;width:100%;" colspan="4">Total</td>
                                <td class="lignes_td">{{total()}}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="lignes_print">
                <button>
                    <i class="ri-printer-fill"></i>
                    Imprimer
                </button>
            </div>
        </div>
        <i class="ri-close-line lignes_close" @click="close()" id="lignes-close"></i>
    </div>
</template>

<script>
import {prixDA} from '@/assets/js/global.js';
import $ from 'jquery';
export default {
    name: 'LignesCommandeCompo',
    props: ["lignes"],
    methods:{
        usePrixDA(x){
            return prixDA(x);
        },
        close(){
            $('.lignes_commande').removeClass('show_lignes');
            $('main').removeClass('fix_height');
        },
        total(){
            var total=0;
            for(let i in this.lignes) total+=Number(this.lignes[i].total);
            return prixDA(total);
        }
    }
}
</script>