window.onload = () => {
    
    var burger = document.getElementById('nav-icon3');
    var mobile_menu = document.getElementById('top_links');
    var dark_button = document.getElementById('darkmode');
    // var jourNuit = document.getElementById('jourNuit');
    // var jour = 'media/jour.png';
    // var nuit = 'media/nuit.png';
    // jourNuit.src = jour;

    document.documentElement.setAttribute('data-theme', 'light');

    /* Burger menu */
    burger.onclick = () => {
        burger.classList.toggle('open');
        mobile_menu.classList.toggle('display_flex');
    };

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
};