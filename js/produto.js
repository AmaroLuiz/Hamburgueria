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
});