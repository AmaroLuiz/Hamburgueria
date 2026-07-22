document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const productName = params.get('name');
    const productCategory = params.get('category');
    const productPrice = params.get('price');
    const productDescription = params.get('description');
    const productImage = params.get('image');
    const productAlt = params.get('alt');

    const nameElement = document.querySelector('[data-product-name]');
    const priceElement = document.querySelector('[data-product-price]');
    const descriptionElement = document.querySelector('[data-product-description]');
    const imageElement = document.querySelector('[data-product-image]');
    const watermarkElements = document.querySelectorAll('[data-product-watermark], [data-product-watermark-back]');
    const pedidoModal = document.querySelector('[data-pedido-modal]');
    const pedidoTextarea = document.querySelector('[data-pedido-textarea]');
    const pedidoButton = document.querySelector('.btn-pedir');
    const pedidoCloseButtons = document.querySelectorAll('[data-pedido-close]');
    const deliveryChoices = document.querySelectorAll('[data-delivery-choice]');
    const clientNameInput = document.querySelector('[data-client-name]');
    const addressGroup = document.querySelector('[data-address-group]');
    const addressBairro = document.querySelector('[data-address-bairro]');
    const addressRua = document.querySelector('[data-address-rua]');
    const addressNumero = document.querySelector('[data-address-numero]');

    const highlightShortWords = (value) => value
        .split(/(\s+)/)
        .map((part) => {
            if (/^\s+$/.test(part) || part.length === 0) {
                return part;
            }

            const plainWord = part.replace(/[.,;:!?()\[\]{}'"-]/g, '');

            if (plainWord.length > 0 && plainWord.length <= 5) {
                return `<span class="word-short">${part}</span>`;
            }

            return part;
        })
        .join('');

    if (productName && nameElement) {
        nameElement.innerHTML = highlightShortWords(productName);
    }

    if (productPrice && priceElement) {
        priceElement.textContent = productPrice;
    }

    if (productDescription && descriptionElement) {
        descriptionElement.textContent = productDescription;
    }

    if (productImage && imageElement) {
        imageElement.src = productImage;
    }

    if (productAlt && imageElement) {
        imageElement.alt = productAlt;
    }

    if (productCategory) {
        watermarkElements.forEach((element) => {
            element.innerHTML = highlightShortWords(productCategory.toUpperCase());
        });
    }

    const productLabel = productName || 'produto';

    const updatePedidoText = () => {
        if (!pedidoTextarea) {
            return;
        }

        const clientName = clientNameInput?.value.trim();
        const deliveryIsYes = document.querySelector('[data-delivery-choice="sim"]')?.classList.contains('active');
        const bairro = addressBairro?.value.trim();
        const rua = addressRua?.value.trim();
        const numero = addressNumero?.value.trim();
        const clientPrefix = clientName ? `${clientName}, ` : '';

        if (deliveryIsYes) {
            pedidoTextarea.value = `Gostaria de pedir ${productLabel}. ${clientPrefix}para entregar no bairro ${bairro || '____'}, rua ${rua || '____'}, numero ${numero || '____'}.`;
            return;
        }

        pedidoTextarea.value = `Gostaria de pedir ${productLabel}.${clientName ? ` Cliente: ${clientName}.` : ''}`;
    };

    const openModal = () => {
        updatePedidoText();

        if (pedidoModal) {
            pedidoModal.classList.add('open');
            pedidoModal.setAttribute('aria-hidden', 'false');
        }
    };

    const closeModal = () => {
        if (pedidoModal) {
            pedidoModal.classList.remove('open');
            pedidoModal.setAttribute('aria-hidden', 'true');
        }
    };

    if (pedidoButton) {
        pedidoButton.addEventListener('click', openModal);
    }

    pedidoCloseButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    deliveryChoices.forEach((choice) => {
        choice.addEventListener('click', () => {
            deliveryChoices.forEach((currentChoice) => currentChoice.classList.remove('active'));
            choice.classList.add('active');

            if (addressGroup) {
                addressGroup.classList.toggle('visible', choice.dataset.deliveryChoice === 'sim');
            }

            updatePedidoText();
        });
    });

    [addressBairro, addressRua, addressNumero].forEach((field) => {
        if (!field) {
            return;
        }

        field.addEventListener('input', updatePedidoText);
    });

    if (clientNameInput) {
        clientNameInput.addEventListener('input', updatePedidoText);
    }

    if (addressGroup) {
        addressGroup.classList.add('visible');
    }

    if (document.querySelector('[data-delivery-choice="nao"]')?.classList.contains('active')) {
        addressGroup?.classList.remove('visible');
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});