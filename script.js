window.onload = () => {

    //vars
    var burger = document.getElementById('nav-icon3');
    var mobile_menu = document.getElementById('top_links');
    var dark_button = document.getElementById('darkmode');
    var linksClicked = document.getElementsByClassName('nav_links');
    // var jourNuit = document.getElementById('jourNuit');
    // var jour = 'media/jour.png';
    // var nuit = 'media/nuit.png';
    // jourNuit.src = jour;

    //Screen resize for mobile
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });

    document.documentElement.setAttribute('data-theme', 'light');

    /* Burger menu */
    burger.onclick = () => {
        burger.classList.toggle('open');
        mobile_menu.classList.toggle('display_flex');
    };

    var closeBurger = () => {
        burger.classList.toggle('open');
        mobile_menu.classList.toggle('display_flex');
    };
    
    for (var i = 0; i < linksClicked.length; i++) {
        linksClicked[i].addEventListener('click', closeBurger, false);
    }

    /* Dark Mode */
    dark_button.onclick = () => {
        document.documentElement.classList.add('color-theme-in-transition');
        var theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                // jourNuit.src = nuit;
            } else if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                // jourNuit.src = jour;
            }
        window.setTimeout(function() {
            document.documentElement.classList.remove('color-theme-in-transition')
        }, 1000);
    }

    /* Scroll effects */
    ScrollReveal().reveal('.big_text');
    ScrollReveal().reveal('.mid_text', { delay: 500, reset: true });
    ScrollReveal().reveal('.small_text', { delay: 200, reset: true  });
    ScrollReveal().reveal('.appear1', { delay: 700 });
    ScrollReveal().reveal('.appear2', { delay: 1200 });
    ScrollReveal().reveal('.appear3', { delay: 1700 });
    ScrollReveal().reveal('.mini_text', { delay: 2200 });
    ScrollReveal().reveal('#ballShadow');

};