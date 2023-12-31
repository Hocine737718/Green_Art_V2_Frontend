import $ from 'jquery';
import ScrollReveal from 'scrollreveal';
$(document).ready(function(){
    //Changer le mode Light/Dark
    const body=$('body');
    const themeButton = $('#theme-button');
    const darkTheme = 'dark-theme';
    const sunIcon = 'ri-sun-line';
    // Pour savoir si l'utilisateur a déjà sélectionné.
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    // Nous obtenons le thème actuel que l'interface possède en validant la classe dark-theme.
    const getCurrentTheme = () => body.hasClass(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.hasClass(sunIcon) ? 'ri-sun-line' : 'ri-moon-line';
    // Nous vérifions si l'utilisateur a précédemment choisi un mode.
    if (selectedTheme) {
        // Si la validation est remplie, nous demandons quelle était la problématique pour savoir si nous avons activé ou désactivé 
        // le mode dark.
        body.toggleClass(darkTheme, selectedTheme === 'dark');
        themeButton.toggleClass(sunIcon, selectedIcon === 'ri-sun-line');        
    }
    // Activer / désactiver le thème manuellement avec le bouton
    themeButton.click(function(){
        // Ajouter ou supprimer le thème dark / icône.
        body.toggleClass(darkTheme);
        themeButton.toggleClass(sunIcon);      
        // Nous sauvegardons le thème et l'icône actuelle que l'utilisateur a choisie.
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });

    //Pour Avoir une relation entre Navbar et la Section actuel
    const sections = $('section[id]');//Tous les <section> du document qui ont un attribut id. 
    function scrollActive(){
        //Récupérer la position de défilement verticale de la fenêtre
        const scrollY = window.pageYOffset;
        sections.each(function() {//pour chaque section
            const sectionHeight =$(this).outerHeight(),//Récupérer la hauteur de la section
                sectionTop =$(this).offset().top - 68,//Récupérer la position de la section par rapport au haut de la page, avec un décalage de 68 pixels (navbar) 
                sectionId =$(this).attr('id'),//Récupérer l'attribut 'id' de la section
                navId="nav_"+sectionId;
            //Vérifier si la position de défilement est à l'intérieur de la section courante
            console.log('id*='+navId);
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                //Si c'est le cas, ajouter la classe 'active-link' à l'élément de menu correspondant
                $('a[id*='+navId+']').addClass('active-link');
            }
            else{
                //Sinon, supprimer la classe 'active-link' de l'élément de menu correspondant
                $('a[id*='+navId+']').removeClass('active-link');
            }
        })
    }
    $(window).scroll(scrollActive);

    

    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400
    })
    sr.reveal(`.home_data`);
    sr.reveal(`.home_img`, {delay: 500});
    sr.reveal(`.home_social`, {delay: 600});
    sr.reveal(`.contact_box`,{origin: 'left'});
    sr.reveal(`.contact_form`,{origin: 'right'});
    sr.reveal(`.product_card, .footer`,{interval: 100});
   
    const navMenu = $('#nav-menu'),
        navToggle = $('#nav-toggle'),
        navClose = $('#nav-close');
    if(navToggle){
        navToggle.click(function(){
            navMenu.addClass('show-menu');
        });
    }
    if(navClose){
        navClose.click(function(){
            navMenu.removeClass('show-menu');
        });
    }
    const navLink = $('.nav_link');
    function linkAction(){
        const navMenu = $('#nav-menu');
        navMenu.removeClass('show-menu');
    }
    navLink.each(function() {
        $(this).click(linkAction);
    });
});