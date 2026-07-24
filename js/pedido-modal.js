document.addEventListener('DOMContentLoaded', () => {
    const pedidoModal = document.querySelector('[data-pedido-modal]');
    const pedidoTextarea = document.querySelector('[data-pedido-textarea]');
    const pedidoButtons = document.querySelectorAll('.btn-pedir, .buy-btn, .pedido a, .btn-hero-text.pedido, .footer-button');
    const pedidoCloseButtons = document.querySelectorAll('[data-pedido-close]');
    const deliveryChoices = document.querySelectorAll('[data-delivery-choice]');
    const clientNameInput = document.querySelector('[data-client-name]');
    const addressGroup = document.querySelector('[data-address-group]');
    const addressBairro = document.querySelector('[data-address-bairro]');
    const addressRua = document.querySelector('[data-address-rua]');
    const addressNumero = document.querySelector('[data-address-numero]');
    const pedidoSubmit = document.querySelector('.pedido-modal-submit');

    let currentProductName = 'produto';

    const getAllSelectedItems = () => {
        const selectedItems = [];
        const cart = JSON.parse(localStorage.getItem('burguer_cart') || '{}');
        
        for (const [name, qty] of Object.entries(cart)) {
            if (qty > 0) {
                selectedItems.push(`${qty}x ${name}`);
            }
        }
        
        if (selectedItems.length === 0) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const qtySpan = card.querySelector('.quantity span');
                const qty = parseInt(qtySpan?.textContent || '0', 10);
                if (qty > 0) {
                    const title = card.dataset.productName || card.querySelector('h3')?.textContent.trim() || 'item';
                    selectedItems.push(`${qty}x ${title}`);
                }
            });
        }
        
        return selectedItems;
    };

    const updatePedidoText = () => {
        if (!pedidoTextarea) return;

        const clientName = clientNameInput?.value.trim();
        const deliveryIsYes = document.querySelector('[data-delivery-choice="sim"]')?.classList.contains('active');
        const bairro = addressBairro?.value.trim();
        const rua = addressRua?.value.trim();
        const numero = addressNumero?.value.trim();
        const clientPrefix = clientName ? `${clientName}, ` : '';

        const selectedItems = getAllSelectedItems();
        let itemsText = '';

        if (selectedItems.length > 0) {
            itemsText = selectedItems.join(', ');
        } else {
            itemsText = currentProductName;
        }

        if (deliveryIsYes) {
            pedidoTextarea.value = `Gostaria de pedir ${itemsText}. ${clientPrefix}para entregar no bairro ${bairro || '____'}, rua ${rua || '____'}, numero ${numero || '____'}.`;
        } else {
            pedidoTextarea.value = `Gostaria de fazer ${itemsText}.${clientName ? ` No nome: ${clientName}.` : ''}`;
        }
    };

    const openModal = (productName) => {
        currentProductName = productName || 'produto';
        
        if (addressGroup) {
            const isDelivery = document.querySelector('[data-delivery-choice="sim"]')?.classList.contains('active');
            addressGroup.classList.toggle('visible', isDelivery);
        }

        updatePedidoText();

        if (pedidoModal) {
            pedidoModal.classList.add('open');
            pedidoModal.setAttribute('aria-hidden', 'false');
        }
    };

    window.openPedidoModal = openModal;

    if (addressGroup) {
        const initialDelivery = document.querySelector('[data-delivery-choice="sim"]')?.classList.contains('active');
        addressGroup.classList.toggle('visible', initialDelivery);
    }

    const closeModal = () => {
        if (pedidoModal) {
            pedidoModal.classList.remove('open');
            pedidoModal.setAttribute('aria-hidden', 'true');
        }
    };

    pedidoButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) return; 

            e.preventDefault();
            let productName = '';
            
            const card = button.closest('.card');
            if (card) {
                const title = card.dataset.productName || card.querySelector('h3')?.textContent.trim() || 'item';
                
                const qtySpan = card.querySelector('.quantity span');
                const qty = parseInt(qtySpan?.textContent || '0', 10);
                
                if (qty === 0) {

                    productName = `1x ${title}`;

                    const cart = JSON.parse(localStorage.getItem('burguer_cart') || '{}');
                    cart[title] = 1;
                    localStorage.setItem('burguer_cart', JSON.stringify(cart));

                    if (qtySpan) qtySpan.textContent = '1';
                } else {
                    productName = `${qty}x ${title}`;
                }
            } else if (button.classList.contains('btn-hero-text') || button.closest('.hero-content')) {

                const heroTitle = document.querySelector('[data-hero-title]');
                if (heroTitle) {
                    productName = heroTitle.textContent.trim();
                } else {
                    productName = 'meu pedido';
                }
            } else {
                productName = 'meu pedido';
            }

            openModal(productName);
        });
    });

    pedidoCloseButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    deliveryChoices.forEach((choice) => {
        choice.addEventListener('click', () => {
            deliveryChoices.forEach((c) => c.classList.remove('active'));
            choice.classList.add('active');

            if (addressGroup) {
                addressGroup.classList.toggle('visible', choice.dataset.deliveryChoice === 'sim');
            }

            updatePedidoText();
        });
    });

    [addressBairro, addressRua, addressNumero, clientNameInput].forEach((field) => {
        field?.addEventListener('input', updatePedidoText);
    });


    document.addEventListener('click', (event) => {
        if (event.target.closest('.quantity button')) {

            setTimeout(updatePedidoText, 10);
        }
    });

    if (pedidoSubmit) {
        pedidoSubmit.addEventListener('click', () => {
            const text = encodeURIComponent(pedidoTextarea.value);
            const phone = '5544920011084'; 
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });
});
