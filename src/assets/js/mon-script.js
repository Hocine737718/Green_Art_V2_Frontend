function script(){
    //Changer le mode Light/Dark
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const sunIcon = 'ri-sun-line';
    // Pour savoir si l'utilisateur a déjà sélectionné.
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    // Nous obtenons le thème actuel que l'interface possède en validant la classe dark-theme.
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(sunIcon) ? 'ri-sun-line' : 'ri-moon-line';
    // Nous vérifions si l'utilisateur a précédemment choisi un mode.
    if (selectedTheme) {
    // Si la validation est remplie, nous demandons quelle était la problématique pour savoir si nous avons activé ou désactivé 
    // le mode dark.
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-sun-line' ? 'add' : 'remove'](sunIcon);
    }
    // Activer / désactiver le thème manuellement avec le bouton
    themeButton.addEventListener('click', () => {
        // Ajouter ou supprimer le thème dark / icône.
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(sunIcon);
        // Nous sauvegardons le thème et l'icône actuelle que l'utilisateur a choisie.
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    })

    
    //Pour Avoir une relation entre Navbar et la Section actuel
    const sections = document.querySelectorAll('section[id]');//Tous les <section> du document qui ont un attribut id. 
    function scrollActive(){
        //Récupérer la position de défilement verticale de la fenêtre
        const scrollY = window.pageYOffset;
        sections.forEach(current =>{//pour chaque section
            const sectionHeight = current.offsetHeight,//Récupérer la hauteur de la section
                sectionTop = current.offsetTop - 68,//Récupérer la position de la section par rapport au haut de la page, avec un décalage de 68 pixels (navbar) 
                sectionId = current.getAttribute('id');//Récupérer l'attribut 'id' de la section
            //Vérifier si la position de défilement est à l'intérieur de la section courante
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                //Si c'est le cas, ajouter la classe 'active-link' à l'élément de menu correspondant
                document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link');
            }
            else{
                //Sinon, supprimer la classe 'active-link' de l'élément de menu correspondant
                document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link');
            }
        })
    }
    window.addEventListener('scroll', scrollActive);
    
    /*
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
    */
   
    const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close');
    if(navToggle){
        navToggle.addEventListener('click', () =>{
            navMenu.classList.add('show-menu');
        })
    }
    if(navClose){
        navClose.addEventListener('click', () =>{
            navMenu.classList.remove('show-menu');
        })
    }
    const navLink = document.querySelectorAll('.nav_link');
    function linkAction(){
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('show-menu');
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));
}

export default script;
