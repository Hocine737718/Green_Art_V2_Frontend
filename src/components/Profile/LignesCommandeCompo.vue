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
                <button @click="generatePDF()">
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
import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';
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
            //console.log("test "+this.lignes);
            return prixDA(total);
        },
        generatePDF(){
            const lien="http://localhost:80/server/Djennat_Green_Art/v2/front-end/src/assets/css/";//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            /*const html_code = `
                <!DOCTYPE html>
                <html lang="fr">
                    <head>
                        <meta charset="utf-8">
                        <link rel="stylesheet" type="text/css" href="${lien}mon-style.css">
                        <link rel="stylesheet" type="text/css" href="${lien}lignes_com.css">
                        <link rel="stylesheet" type="text/css" href="${lien}print.css">
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css">
                    </head>
                    <body>
                        <main  class="main">
                            <div>${document.querySelector('#lignes_commande').innerHTML}</div>
                        </main>
                    </body>
                </html>
            `;*/
            const html_code2 = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Facture ZARA </title>
                        <link rel="stylesheet" href="${lien}facture_salome.css">
                    </head>
                    <body>


<div id="style">

  <div id="stylee"></div>

  <div id="s1">
    
    <div id="s2">

      <div class="info">

        <h2> Salomé Guez </h2>

        <p> 


           27 rue de la saussière 92100 <br>

             Boulogne-Billancourt <br>

            guezsalome@gmail.com <br>

            Numéro : 0698489234 

        </p>

      </div>

      <div class="titre">

        <h1>Facture n°2024012225</h1>

        <p>
           Lundi 22 Janvier 2024 
       </p>

        <p> 09:57:37 </p>

      </div>

    </div>

    <div id="s3">
      
      <div class="societe"></div>

      <div class="info">

        <h2> Zara </h2>
        
        <p>

            01 55 38 93 30 

         </p>

         <p>

            zara.contact@gmail.com
         </p>

      </div>

      <div id="sss">

        <h2>Adresse</h2>

        <p>

           Les passages 
        </p>

        <p>

          5 Rue Tony Garnier Boulogne Billancourt 

              
        </p>
       
      </div>  

      </div>

      <div id="s4">
      
      <div id="table">

        <table>

          <tbody><tr class="titretableau">

            <td> <h3> Article </h3> </td>
            <td> <h3> Référence </h3> </td>
            <td> <h3> Quantité </h3> </td>
            <td> <h3> Prix HT </h3> </td>
            <td> <h3> Sous-total </h3> </td>

          </tr>

<tr class="tableau_"><td class="tableau">Pull</td><td class="tableau">3A56D8</td><td class="quantite">5</td><td class="tableau">29.95 €</td><td class="tableau">149.75 €</td></tr><tr><td class="tableau">Jupe</td><td class="tableau">87Y65D</td><td class="quantite">12</td><td class="tableau">25.95 €</td><td class="tableau">311.4 €</td></tr><tr><td class="tableau">Robe</td><td class="tableau">093RB6</td><td class="quantite">9</td><td class="tableau">39.95 €</td><td class="tableau">359.55 €</td></tr><tr><td class="tableau">Jean</td><td class="tableau">P894TN</td><td class="quantite">28</td><td class="tableau">35.95 €</td><td class="tableau">1006.6 €</td></tr><tr><td class="tableau">Echarpe</td><td class="tableau">58J7YB</td><td class="quantite">12</td><td class="tableau">15.95 €</td><td class="tableau">191.4 €</td></tr><tr><td class="tableau">Bijoux</td><td class="tableau">BI876N</td><td class="quantite">12</td><td class="tableau">12.95 €</td><td class="tableau">155.4 €</td></tr></tbody></table>

  <table>
  
       <tbody><tr class="tabl2">

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td><strong>Total HT</strong></td>
            <td><strong>2 174,10 €</strong></td>

       </tr>

       <tr class="tabl2">

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td> TVA 20%</td>
            <td>434,82 €</td>

        </tr>

        <tr class="tabl2">

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td><strong>Total TTC</strong></td>
            <td><strong>2 608,92 €</strong></td>

        </tr>
          
    </tbody></table>

      </div> 

      
      <div id="loi">

        <p class="legal">
       
		Conditions de paiement : paiement à réception de facture, 20 jours.<br><br>

    Aucun escompte consenti pour règlement anticipé. <br> <br>

		En cas de retard de paiement, indemnité forfaitaire pour frais de recouvrement : 40 euros (art.L. 441-6 code du commerce).

        </p>

      </div>
      
    </div>














</div></div></body></html>
            `;
           const pdf = new jsPDF();

            // Convertir le contenu HTML en format de données pour jsPDF
            pdf.html(html_code2, { 
                callback: function () {
                    // Sauvegarder le PDF
                    pdf.save('document.pdf');
                },
            });
        }
    }
}
</script>