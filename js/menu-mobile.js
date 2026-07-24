document.addEventListener('DOMContentLoaded', () => {
    const navbars = document.querySelectorAll('.navbar');

    navbars.forEach((navbar) => {
        const menuToggle = navbar.querySelector('[data-menu-toggle]');
        const menu = navbar.querySelector('.menu');
        const backdrop = navbar.nextElementSibling?.matches('[data-menu-backdrop]')
            ? navbar.nextElementSibling
            : document.querySelector('[data-menu-backdrop]');

        if (!menuToggle || !menu) {
            return;
        }

        const closeMenu = () => {
            navbar.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');

            if (backdrop) {
                backdrop.classList.remove('visible');
            }
        };

        const openMenu = () => {
            navbar.classList.add('menu-open');
            document.body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');

            if (backdrop) {
                backdrop.classList.add('visible');
            }
        };

        menuToggle.addEventListener('click', () => {
            if (navbar.classList.contains('menu-open')) {
                closeMenu();
                return;
            }

            openMenu();
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        if (backdrop) {
            backdrop.addEventListener('click', closeMenu);
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    });
});
