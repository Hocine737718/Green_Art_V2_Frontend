<template>
    <section class="commandes section container" id="commandes">
        <div class="commandes_container">
            <div class="commandes_header">
                <h2>Votre Commandes</h2>
                <div class="input-group">
                    <input type="search" placeholder="Rechercher..." v-model="this.searchQuery">
                    <i class='ri-search-line'></i>
                </div>
                <div class="export_file">
                    <label for="export-file" class="export_file-btn" title="Export"></label>
                    <input type="checkbox" id="export-file">
                    <div class="export_file-options">
                        <label for="export-file" @click="toPDF()">PDF <img src="../../assets/img/icons/pdf.png" alt=""></label>
                        <label for="export-file"  @click="toExcel()">EXCEL <img src="../../assets/img/icons/excel.png" alt=""></label>
                    </div>
                </div>
            </div>
            <div class="commandes_body">
                <table class="commandes_table">
                    <thead class="commandes_thead">
                        <tr>
                            <th class="commandes_th" @click="setSort('num',$event)"> Num <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th" @click="setSort('date_commande',$event)"> Date <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th" @click="setSort('etat',$event)"> Etat <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th" @click="setSort('total',$event)"> Total <span class="icon-arrow">&UpArrow;</span></th>
                            <th class="commandes_th"> Details</th>
                        </tr>
                    </thead>
                    <tbody class="commandes_tbody">
                        <tr v-if="filterCommandes.length==0">
                            <td class="commandes_td" style="text-align: center;width:100%;" colspan="5">Aucun résultat trouvé.</td>
                        </tr>
                        <tr v-for="commande in filterCommandes" :key="commande">
                            <td class="commandes_td">{{ commande.num }}</td>
                            <td class="commandes_td">{{ commande.date_commande }}</td>
                            <td class="commandes_td">{{ commande.etat }}</td>
                            <td class="commandes_td">{{ commande.total }} DA</td>
                            <td class="commandes_td"><i class="ri-eye-fill"></i> Voir</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
import $ from 'jquery';
import XLSX from 'xlsx';
export default {
    name: 'CommandesCompo',
    props:["user"],
    data(){
        return {
            searchQuery: "",
            sortColumn: null,
            sortOrder: 'asc',
            headers:['num','date_commande','etat','total']
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
                    commande.total.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            if (this.sortColumn) {
                const orderFactor = this.sortOrder === 'asc' ? 1 : -1;
                filteredData = filteredData.sort((a, b) =>
                    (a[this.sortColumn] > b[this.sortColumn] ? 1 : -1) * orderFactor
                );
            }
            return filteredData;
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
                        console.log("i="+i);
                        console.log("index="+index);
                        console.log("i="+index==i);
                        if(index==i){
                            $(this).addClass('active');
                        } 
                    });
                });
                head.classList.toggle('desc', this.sortOrder==="desc" );
            }
        },
        toPDF(){
            const lien="http://localhost:80/server/Djennat_Green_Art/v2/front-end/src/assets/css/"
            const html_code = `
                <!DOCTYPE html>
                    <link rel="stylesheet" type="text/css" href="${lien}mon-style.css">
                    <link rel="stylesheet" type="text/css" href="${lien}commandes.css">
                    <style>
                        .commandes_header .input-group,
                        .commandes_header .export_file,
                        .commandes_th span.icon-arrow, 
                        th:last-child, 
                        td:last-child{
                            display:none;
                        }
                    </style>
                    <main  class="main">
                        <section class="commandes section container" id="commandes">${document.querySelector('#commandes').innerHTML}</secton>
                    </main`;
            const new_window = window.open();
            new_window.document.write(html_code);
            setTimeout(() => {
                new_window.print();
                new_window.close();
            }, 400);
        },
        toExcel() {
            var data = [this.headers];
            this.commandes.forEach(commande => {
                data.push([commande.num,commande.date_commande,commande.etat,commande.total+" DA"])
            });
            var wb = XLSX.utils.book_new();
            wb.SheetNames.push("Votre Commandes");
            wb.Sheets["Votre Commandes"] = XLSX.utils.aoa_to_sheet(data);
            XLSX.writeFile(wb, "download.xlsx");
        }

    }
}
</script>
