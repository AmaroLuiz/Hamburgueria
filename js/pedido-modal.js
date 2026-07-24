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
        
        // Primeiro, pega o que está no localStorage
        for (const [name, qty] of Object.entries(cart)) {
            if (qty > 0) {
                selectedItems.push(`${qty}x ${name}`);
            }
        }
        
        // Se o carrinho do localStorage estiver vazio, tenta olhar o DOM (fallback)
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
            pedidoTextarea.value = `Gostaria de pedir ${itemsText}.${clientName ? ` No nome: ${clientName}.` : ''}`;
        }
    };

    const openModal = (productName) => {
        currentProductName = productName || 'produto';
        
        // Sincroniza a visibilidade do endereço com o botão selecionado inicialmente
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

    // Expose openModal to global scope so other scripts can call it
    window.openPedidoModal = openModal;

    // Inicializa a visibilidade do endereço com base no botão ativo no carregamento
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
            if (href && href.startsWith('#')) return; // Deixa o scroll funcionar

            e.preventDefault();
            let productName = '';
            
            // Tenta achar o nome do produto baseado no contexto do botão
            const card = button.closest('.card');
            if (card) {
                const title = card.dataset.productName || card.querySelector('h3')?.textContent.trim() || 'item';
                
                // Pega a quantidade se existir, senão assume 1 (se clicou em pedir, quer pelo menos 1)
                const qtySpan = card.querySelector('.quantity span');
                const qty = parseInt(qtySpan?.textContent || '0', 10);
                
                if (qty === 0) {
                    // Se estiver zero e clicou em pedir, vamos considerar como 1 para este pedido
                    productName = `1x ${title}`;
                    
                    // Atualiza o localStorage também
                    const cart = JSON.parse(localStorage.getItem('burguer_cart') || '{}');
                    cart[title] = 1;
                    localStorage.setItem('burguer_cart', JSON.stringify(cart));
                    
                    // Atualiza o span no DOM se existir
                    if (qtySpan) qtySpan.textContent = '1';
                } else {
                    productName = `${qty}x ${title}`;
                }
            } else if (button.classList.contains('btn-hero-text') || button.closest('.hero-content')) {
                // Se for o botão do hero, tenta pegar o título do hero se estiver visível
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

    // Se o usuário mudar a quantidade nos cards enquanto o modal estiver aberto (improvável mas possível)
    // ou se quisermos que a mudança de quantidade reflita no texto se tivermos algum listener global.
    // Como os botões de quantidade estão nos cards, vamos adicionar um listener no document para capturar cliques neles.
    document.addEventListener('click', (event) => {
        if (event.target.closest('.quantity button')) {
            // Pequeno delay para garantir que o contador já atualizou no script de todosProdutos.js
            setTimeout(updatePedidoText, 10);
        }
    });

    if (pedidoSubmit) {
        pedidoSubmit.addEventListener('click', () => {
            const text = encodeURIComponent(pedidoTextarea.value);
            const phone = '5544999999999'; // Número fictício do HTML
            window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });
});
