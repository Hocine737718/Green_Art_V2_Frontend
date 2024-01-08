<template>
    <section class="contact section container" id="contact">                
        <div class="contact_container grid">
            <div class="contact_box">
                <div class="contact_data">
                    <div class="contact_information">
                        <h3 class="contact_subtitle">Appelez-nous pour un soutien immédiat.</h3>
                        <span class="contact_description">
                            <i class="ri-phone-line contact_icon"></i>
                            0540 44 41 83
                        </span>
                    </div>
                    <div class="contact_information">
                        <h3 class="contact_subtitle">Écrivez-nous par courrier.</h3>
                        <span class="contact_description">
                            <i class="ri-mail-line contact_icon"></i>
                            billel1599@gmail.com
                        </span>
                    </div>
                </div>
            </div>
            <ContactFormCompo></ContactFormCompo>
        </div>
    </section>
</template>

<script>
import ContactFormCompo from './ContactFormCompo.vue';
export default {
  name: "ContactView",
  components : {ContactFormCompo},
};
</script>
