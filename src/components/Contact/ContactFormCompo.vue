<template>
  <form :action="actionURL" method="POST" class="contact_form">
    <h2 class="section_title-center">
      Contactez-nous
    </h2>
    <div class="contact_inputs">
        <div class="contact_content">
            <input type="text" class="contact_input" name="name" placeholder="Votre Nom" id="name" required>
        </div>
        <div class="contact_content" style="justify-content:right;">
            <input type="email" class="contact_input" name="email" placeholder="Email" id="email" required>
        </div>
    </div>
    <div class="contact_areas">
        <textarea name="message" rows="6" class="contact_input contact_area" id="message" placeholder="Message" required></textarea>
    </div>
    <button type="submit" class="button button--flex">
      Envoyer
    </button>
  </form>
</template>

<script>
export default {
  name: "ContactFormCompo",
  data(){
    return{
      actionURL:`${this.$store.state.baseURL}/mail.php`
    }
  }
};
</script>