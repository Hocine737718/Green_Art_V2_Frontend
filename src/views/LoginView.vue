<template>
    <section class="login section container" id="login">
        <form action="" class="login_container grid">
            <h1 class="login_title">Connexion</h1>
            <div class="login_inputs">
                <div class="login_box">
                    <input type="email" placeholder="Email" required class="login_input" name="email">
                    <i class="ri-mail-fill"></i>
                </div>
                <div class="login_box">
                    <input type="password" placeholder="Mot de Passe" required class="login_input" name="motPasse">
                    <i class="ri-lock-2-fill"></i>
                </div>
            </div>
            <div class="login_forgot_container">
                <a href="#" class="login_forgot">Mot de passe oublié?</a>
            </div>
            <button type="submit" class="login_button">Se Connecter</button>
            <div class="login_register">
               Vous n'avez pas de compte ? <router-link :to="{ name: 'signup'}">S'inscrir</router-link>
            </div>
        </form>
    </section>    
</template>
<script>
export default {
  name: 'LoginView'
}
</script>