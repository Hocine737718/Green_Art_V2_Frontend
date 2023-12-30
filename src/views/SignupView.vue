<template>
    <div class="signup" >
        <form action="" class="signup_form">
            <h1 class="signup_title">S'inscrir</h1>
            <div class="signup_inputs">
                <div class="signup_box">
                    <input type="text" placeholder="Nom Complet" required class="signup_input" name="nom">
                    <i class="ri-user-fill"></i>
                </div>
                <div class="signup_box">
                    <input type="email" placeholder="Email" required class="signup_input" name="email">
                    <i class="ri-mail-fill"></i>
                </div>
                <div class="signup_box">
                    <input type="password" placeholder="Mot de Passe" required class="signup_input" name="motPasse">
                    <i class="ri-lock-2-fill"></i>
                </div>
                <div class="signup_box">
                    <input type="password" placeholder="Confirmer Votre Mot de Passe" required class="signup_input" name="motPasse">
                    <i class="ri-lock-2-fill"></i>
                </div>
            </div>
            <button type="submit" class="signup_button">S'inscrir</button>
        </form>
    </div>
</template>
<script>
export default {
  name: 'SignupView'
}
</script>