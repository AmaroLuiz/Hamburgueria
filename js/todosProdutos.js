document.addEventListener('DOMContentLoaded', () => {
    const imagePath = 'img/heroPNG.webp';
    const productImagePath = '../img/heroPNG.webp';
    const sectionImages = {
        lanches: {
            display: 'img/heroPNG.webp',
            product: '../img/heroPNG2.webp',
        },
        porcoes: {
            display: 'img/batata.webp',
            product: '../img/batata.webp',
        },
        bebidas: {
            display: 'img/coca.webp',
            product: '../img/coca.webp',
        },
    };
    const productPagePath = 'html/produto.html';

    const heroProducts = [
        {
            title: 'X-CHEESE',
            badge: 'X-Cheddar',
            kicker: 'lanche da casa',
            description: 'Hambúrguer artesanal, cheddar derretido, alface fresca, tomate e molho especial no pão brioche.',
            watermark: 'HAMBÚRGUER',
            alt: 'X-Cheese',
        },
        {
            title: 'X-BURGUER',
            badge: 'X-Burguer',
            kicker: 'clássico irresistível',
            description: 'Hambúrguer suculento com queijo, salada crocante e molho especial para fechar o pedido.',
            watermark: 'HAMBÚRGUER',
            alt: 'X-Burguer',
        },
        {
            title: 'X-BACON',
            badge: 'X-Bacon',
            kicker: 'o mais pedido',
            description: 'Carne artesanal, bacon crocante, queijo derretido e salada fresca para uma experiência intensa.',
            watermark: 'HAMBÚRGUER',
            alt: 'X-Bacon',
        },
        {
            title: 'X-DUPLO',
            badge: 'X-Duplo',
            kicker: 'para muita fome',
            description: 'Dois hambúrgueres suculentos, cheddar, alface, tomate e molho da casa em dose dupla.',
            watermark: 'HAMBÚRGUER',
            alt: 'X-Duplo',
        },
    ];

    const heroTitle = document.querySelector('[data-hero-title]');
    const heroDescription = document.querySelector('[data-hero-description]');
    const heroWatermark = document.querySelector('[data-hero-watermark]');
    const heroKicker = document.querySelector('[data-hero-kicker]');
    const heroBadge = document.querySelector('[data-hero-badge]');
    const heroImage = document.querySelector('[data-hero-image]');
    const heroPrevButton = document.querySelector('[data-hero-prev]');
    const heroNextButton = document.querySelector('[data-hero-next]');

    let heroIndex = 0;

    const updateHero = () => {
        const product = heroProducts[heroIndex];

        if (!product) {
            return;
        }

        if (heroTitle) {
            heroTitle.textContent = product.title;
        }

        if (heroDescription) {
            heroDescription.textContent = product.description;
        }

        if (heroWatermark) {
            heroWatermark.textContent = product.watermark;
        }

        if (heroKicker) {
            heroKicker.textContent = product.kicker;
        }

        if (heroBadge) {
            heroBadge.textContent = product.badge;
        }

        if (heroImage) {
            heroImage.src = imagePath;
            heroImage.alt = product.alt;
        }
    };

    const stepHero = (direction) => {
        heroIndex = (heroIndex + direction + heroProducts.length) % heroProducts.length;
        updateHero();
    };

    if (heroPrevButton) {
        heroPrevButton.addEventListener('click', () => stepHero(-1));
    }

    if (heroNextButton) {
        heroNextButton.addEventListener('click', () => stepHero(1));
    }

    updateHero();

    const menuBySection = {
        lanches: {
            'Tradicional': [
                { name: 'COMBO TRADICIONAL', price: 'R$ 29,90', description: 'Pão brioche, carne artesanal, queijo derretido, alface fresca e molho da casa.' },
                { name: 'DUPLO TRADICIONAL', price: 'R$ 34,90', description: 'Dois hambúrgueres suculentos com cheddar, tomate, cebola e molho especial.' },
                { name: 'TRADICIONAL BACON', price: 'R$ 36,90', description: 'Hambúrguer artesanal com bacon crocante, cheddar e cebola caramelizada.' },
                { name: 'TRADICIONAL DA CASA', price: 'R$ 31,90', description: 'Receita clássica da casa com carne, queijo, salada e pão macio.' },
            ],
            'Filé': [
                { name: 'FILÉ ESPECIAL', price: 'R$ 33,90', description: 'Filé macio, queijo, salada crocante e molho cremoso no pão brioche.' },
                { name: 'FILÉ DUPLO', price: 'R$ 38,90', description: 'Dois filés grelhados com cheddar, alface, tomate e molho especial.' },
                { name: 'FILÉ CEBOLA', price: 'R$ 35,90', description: 'Filé suculento com cebola dourada, queijo e pão tostado na medida.' },
                { name: 'FILÉ PRIME', price: 'R$ 39,90', description: 'Combinação premium com filé, queijo, salada e molho da casa.' },
            ],
            'Picanha': [
                { name: 'PICANHA HOUSE', price: 'R$ 38,90', description: 'Picanha grelhada, queijo, alface e tomate em um lanche bem servido.' },
                { name: 'PICANHA DUPLA', price: 'R$ 44,90', description: 'Duas camadas de picanha com cheddar e molho especial da casa.' },
                { name: 'PICANHA BACON', price: 'R$ 42,90', description: 'Picanha com bacon crocante, queijo e cebola caramelizada.' },
                { name: 'PICANHA PREMIUM', price: 'R$ 46,90', description: 'Versão premium com picanha, queijo derretido e salada completa.' },
            ],
            'Frango': [
                { name: 'FRANGO CRISPY', price: 'R$ 28,90', description: 'Frango crocante, queijo, alface e molho suave no pão brioche.' },
                { name: 'FRANGO ESPECIAL', price: 'R$ 30,90', description: 'Peito de frango temperado com salada fresca e queijo derretido.' },
                { name: 'FRANGO BACON', price: 'R$ 33,90', description: 'Frango grelhado com bacon, cheddar e molho da casa.' },
                { name: 'FRANGO FIT', price: 'R$ 27,90', description: 'Opção leve com frango, alface, tomate e molho especial.' },
            ],
            'Ovo': [
                { name: 'OVO CLÁSSICO', price: 'R$ 24,90', description: 'Hambúrguer com ovo, queijo e salada no pão macio.' },
                { name: 'OVO DUPLO', price: 'R$ 27,90', description: 'Dois ovos, carne artesanal, queijo e molho especial da casa.' },
                { name: 'OVO BACON', price: 'R$ 29,90', description: 'Ovo frito, bacon crocante, queijo e hambúrguer suculento.' },
                { name: 'OVO DA CASA', price: 'R$ 26,90', description: 'Receita simples e saborosa com ovo, carne e queijo derretido.' },
            ],
            'Salsicha': [
                { name: 'SALSICHA TRADICIONAL', price: 'R$ 22,90', description: 'Salsicha suculenta, molho da casa, queijo e pão tostado.' },
                { name: 'SALSICHA DUPLA', price: 'R$ 26,90', description: 'Duas salsichas com queijo, salada e molho especial.' },
                { name: 'SALSICHA BACON', price: 'R$ 28,90', description: 'Salsicha, bacon crocante, cheddar e cebola dourada.' },
                { name: 'SALSICHA DA CASA', price: 'R$ 24,90', description: 'Clássico da casa com salsicha, queijo e molho especial.' },
            ],
        },
        porcoes: {
            '180g': [
                { name: 'BATATA 180G', price: 'R$ 14,90', description: 'Porção pequena de batata frita crocante com sal na medida.' },
                { name: 'CALABRESA 180G', price: 'R$ 16,90', description: 'Calabresa acebolada com tempero da casa para acompanhar o lanche.' },
                { name: 'FRANGO 180G', price: 'R$ 17,90', description: 'Porção leve de frango empanado, crocante por fora e macio por dentro.' },
                { name: 'MIX 180G', price: 'R$ 18,90', description: 'Mistura de fritas com petiscos selecionados para abrir o apetite.' },
            ],
            '320g': [
                { name: 'BATATA 320G', price: 'R$ 19,90', description: 'Porção média de batata frita para compartilhar sem pressa.' },
                { name: 'CALABRESA 320G', price: 'R$ 22,90', description: 'Calabresa acebolada em porção generosa com molho especial.' },
                { name: 'FRANGO 320G', price: 'R$ 23,90', description: 'Frango empanado crocante com tempero marcante e bem servido.' },
                { name: 'MIX 320G', price: 'R$ 24,90', description: 'Seleção variada para dividir com a mesa toda.' },
            ],
            '510g': [
                { name: 'BATATA 510G', price: 'R$ 26,90', description: 'Porção grande de batata frita para matar a fome do grupo.' },
                { name: 'CALABRESA 510G', price: 'R$ 29,90', description: 'Calabresa bem servida com cebola e molho da casa.' },
                { name: 'FRANGO 510G', price: 'R$ 31,90', description: 'Frango crocante em porção robusta para acompanhar a refeição.' },
                { name: 'MIX 510G', price: 'R$ 32,90', description: 'Combinação completa com fritas e petiscos variados.' },
            ],
            '750g': [
                { name: 'BATATA 750G', price: 'R$ 34,90', description: 'Porção extragrande para compartilhar com tranquilidade.' },
                { name: 'CALABRESA 750G', price: 'R$ 37,90', description: 'Calabresa acebolada em versão reforçada para a mesa inteira.' },
                { name: 'FRANGO 750G', price: 'R$ 39,90', description: 'Frango empanado e crocante em porção caprichada.' },
                { name: 'MIX 750G', price: 'R$ 41,90', description: 'Mix completo de petiscos para dividir sem medo.' },
            ],
            '900g': [
                { name: 'BATATA 900G', price: 'R$ 39,90', description: 'Porção gigante de batata frita para reunir todo mundo.' },
                { name: 'CALABRESA 900G', price: 'R$ 43,90', description: 'Calabresa bem servida com bastante cebola e molho especial.' },
                { name: 'FRANGO 900G', price: 'R$ 45,90', description: 'Frango crocante em uma porção reforçada e muito saborosa.' },
                { name: 'MIX 900G', price: 'R$ 47,90', description: 'Seleção farta de porções para a mesa toda.' },
            ],
            '1kg': [
                { name: 'BATATA 1KG', price: 'R$ 44,90', description: 'Porção máxima de batata frita para matar a fome de todo mundo.' },
                { name: 'CALABRESA 1KG', price: 'R$ 48,90', description: 'Calabresa acebolada em porção super reforçada e suculenta.' },
                { name: 'FRANGO 1KG', price: 'R$ 51,90', description: 'Frango empanado crocante para dividir sem economizar.' },
                { name: 'MIX 1KG', price: 'R$ 53,90', description: 'Mix gigante com os petiscos mais pedidos da casa.' },
            ],
        },
        bebidas: {
            '300ml': [
                { name: 'REFRIGERANTE 300ML', price: 'R$ 6,90', description: 'Lata gelada para acompanhar o lanche com refresco na medida.' },
                { name: 'SUCO 300ML', price: 'R$ 7,90', description: 'Suco natural servido gelado para completar o pedido.' },
                { name: 'ÁGUA 300ML', price: 'R$ 4,90', description: 'Água mineral gelada para uma opção simples e prática.' },
                { name: 'CHÁ 300ML', price: 'R$ 5,90', description: 'Chá gelado leve para quem prefere algo mais suave.' },
            ],
            '350ml': [
                { name: 'REFRIGERANTE 350ML', price: 'R$ 7,90', description: 'Lata maior para acompanhar o combo com mais refresco.' },
                { name: 'SUCO 350ML', price: 'R$ 8,90', description: 'Suco natural com volume extra para a refeição.' },
                { name: 'ÁGUA 350ML', price: 'R$ 5,90', description: 'Água gelada em tamanho prático para matar a sede.' },
                { name: 'CHÁ 350ML', price: 'R$ 6,90', description: 'Chá gelado equilibrado e leve para acompanhar o pedido.' },
            ],
            '510ml': [
                { name: 'REFRIGERANTE 510ML', price: 'R$ 9,90', description: 'Garrafa média para quem gosta de bebida bem servida.' },
                { name: 'SUCO 510ML', price: 'R$ 10,90', description: 'Suco natural em tamanho intermediário para o almoço ou jantar.' },
                { name: 'ÁGUA 510ML', price: 'R$ 6,90', description: 'Água mineral gelada para refrescar sem exagero.' },
                { name: 'CHÁ 510ML', price: 'R$ 7,90', description: 'Chá gelado em versão maior para acompanhar o lanche.' },
            ],
            '600ml': [
                { name: 'REFRIGERANTE 600ML', price: 'R$ 10,90', description: 'Garrafa grande para acompanhar qualquer combo da casa.' },
                { name: 'SUCO 600ML', price: 'R$ 11,90', description: 'Suco natural bem servido e pronto para refrescar.' },
                { name: 'ÁGUA 600ML', price: 'R$ 7,90', description: 'Água mineral em tamanho ideal para dividir a mesa.' },
                { name: 'CHÁ 600ML', price: 'R$ 8,90', description: 'Chá gelado com volume extra para acompanhar a refeição.' },
            ],
            '900ml': [
                { name: 'REFRIGERANTE 900ML', price: 'R$ 13,90', description: 'Bebida grande para compartilhar no almoço ou jantar.' },
                { name: 'SUCO 900ML', price: 'R$ 14,90', description: 'Suco natural em versão generosa para a mesa toda.' },
                { name: 'ÁGUA 900ML', price: 'R$ 9,90', description: 'Água mineral gelada em garrafa grande.' },
                { name: 'CHÁ 900ML', price: 'R$ 10,90', description: 'Chá gelado para quem quer uma opção refrescante em maior volume.' },
            ],
            '1 Litro': [
                { name: 'REFRIGERANTE 1L', price: 'R$ 15,90', description: 'Litro de refrigerante para não faltar bebida na mesa.' },
                { name: 'SUCO 1L', price: 'R$ 16,90', description: 'Suco natural em garrafa grande para compartilhar.' },
                { name: 'ÁGUA 1L', price: 'R$ 11,90', description: 'Água mineral gelada no tamanho ideal para o grupo.' },
                { name: 'CHÁ 1L', price: 'R$ 12,90', description: 'Chá gelado em litro para uma opção leve e refrescante.' },
            ],
        },
    };

    const normalizeText = (value) => value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();

    const renderCards = (grid, items, sectionKey) => {
        const sectionImage = sectionImages[sectionKey] || sectionImages.lanches;
        const cart = JSON.parse(localStorage.getItem('burguer_cart') || '{}');

        grid.innerHTML = items.map((item) => {
            const quantity = cart[item.name] || 0;
            return `
            <article class="card" data-product-category="${grid.previousElementSibling?.querySelector('.active')?.textContent?.trim() || ''}" data-product-name="${item.name}" data-product-price="${item.price}" data-product-description="${item.description}" data-product-image="${sectionImage.product}" data-product-alt="${item.name}">
				<span class="card-price">${item.price}</span>
				<div class="card-image">
                    <img src="${sectionImage.display}" alt="${item.name}">
				</div>
				<div class="card-body">
					<h3>${item.name}</h3>
					<p>${item.description}</p>
				</div>
				<div class="card-footer">
					<div class="quantity">
						<button type="button">-</button>
						<span>${quantity}</span>
						<button type="button">+</button>
					</div>
					<button class="buy-btn" type="button">Pedir</button>
				</div>
			</article>
		`;
        }).join('');
    };

    const updateCart = (productName, quantity) => {
        const cart = JSON.parse(localStorage.getItem('burguer_cart') || '{}');
        if (quantity > 0) {
            cart[productName] = quantity;
        } else {
            delete cart[productName];
        }
        localStorage.setItem('burguer_cart', JSON.stringify(cart));
    };

    document.querySelectorAll('.menu-categorias').forEach((section) => {
        const titleElement = section.querySelector('.titulo-cardapio');
        const sectionKey = normalizeText(titleElement?.textContent || '');
        const sectionData = menuBySection[sectionKey];
        const grid = section.nextElementSibling;

        if (!sectionData || !grid || !grid.classList.contains('menu-grid')) {
            return;
        }

        const buttons = Array.from(section.querySelectorAll('.categoria'));

        grid.addEventListener('click', (event) => {
            const quantityButton = event.target.closest('.quantity button');
            const card = event.target.closest('.card');

            if (quantityButton) {
                const quantityContainer = quantityButton.parentElement;
                const counter = quantityContainer?.querySelector('span');

                if (!counter || !card) {
                    return;
                }

                const productName = card.dataset.productName;
                const currentValue = Number(counter.textContent) || 0;
                let newValue = currentValue;

                if (quantityButton.textContent.trim() === '+') {
                    newValue = currentValue + 1;
                } else {
                    newValue = Math.max(0, currentValue - 1);
                }

                counter.textContent = String(newValue);
                if (productName) {
                    updateCart(productName, newValue);
                }
                return;
            }

            if (!card) {
                return;
            }

            const productUrl = new URL(productPagePath, window.location.href);
            productUrl.searchParams.set('category', card.dataset.productCategory || '');
            productUrl.searchParams.set('name', card.dataset.productName || '');
            productUrl.searchParams.set('price', card.dataset.productPrice || '');
            productUrl.searchParams.set('description', card.dataset.productDescription || '');
            productUrl.searchParams.set('image', card.dataset.productImage || '');
            productUrl.searchParams.set('alt', card.dataset.productAlt || '');
            window.location.href = productUrl.toString();
        });

        const activateCategory = (button) => {
            const categoryName = button.textContent.trim();
            const items = sectionData[categoryName];

            if (!items) {
                return;
            }

            buttons.forEach((currentButton) => currentButton.classList.remove('active'));
            button.classList.add('active');
            renderCards(grid, items, sectionKey);
        };

        buttons.forEach((button) => {
            button.addEventListener('click', () => activateCategory(button));
        });

        const initialButton = buttons.find((button) => button.classList.contains('active')) || buttons[0];

        if (initialButton) {
            activateCategory(initialButton);
        }
    });
});