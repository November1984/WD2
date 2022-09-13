"use strict";

// Элементы, добавленные в корзину
const basketProducts = {}; 
// контейнер с карточками товаров
const galaryItemsEl = document.querySelector('.gallery__items'); 
// блок для размещения списка элементов
const basketEl = document.querySelector('.cart-menu__items');
// Счётчик продукции в корзине
const basketCounter = document.querySelector('.basket__productCounter span');
// Счётчик стоимости продукции в корзине
const basketPriceCounter = document.querySelector('.sum__val');

/**
 * 
 * @returns количество товаров в корзине
 */
function getTotalProductCount (){
    return Object.values(basketProducts).reduce((acc, product) => acc + product.count, 0);
}
/**
 * 
 * @returns стоимость товаров в корзине
 */
function getTotalProductPrice (){
    return Object.values(basketProducts).reduce((acc, product) => acc + product.count * product.price, 0);
}

/**
 * Функция принимает параметры продукта и заносит их в объект, 
 * учитывая количество
 * @param {NUMBER} id индикатор продукта
 * @param {NUMBER} price цена единицы продукта
 * @param {STRING} name наименование продукта
 * @param {STRING} img изображение продукта
 */
function addProduct (id, price, name, img) { 
    if (!basketProducts[id]) {
        basketProducts[id] = {id, name, price, img, count: 0};
    }
    basketProducts[id].count++;
    renderProductInBasket(id);
}

/**
 * Отображает продукт в меню корзины или увеличивает количество добавленных
 * @param {NUMBER} id - индекс продукта
 * @returns 
 */
function renderProductInBasket(id) {
    const basketItem = basketEl.querySelector(`.cart-menu__item[data-productId = "${id}"]`);
    if (!basketItem) {
        basketEl.insertAdjacentHTML('afterbegin', addNewProductInBasket(id));
        return;
    }
    basketItem.querySelector('.cart-menu__price span').textContent = basketProducts[id].count.toString();
}

/**
 * Формирует разметку для меню корзины
 * @param {NUMBER} id индекс продукта
 * @returns Возвращает HTML-разметку для добавления продукта в меню корзины
 */
function addNewProductInBasket (id) {
    return `
        <div class="cart-menu__item" data-productId="${id}">
            <a href="./single.html" class="cart-menu__link">
                <div class="cart-menu__left _ibg">
                    <img src="${basketProducts[id].img}" alt="${basketProducts[id].name}">
                </div>
                <div class="cart-menu__mid">
                    <p>${basketProducts[id].name}</p>
                    <div class="cart-menu__rate">
                        <span class="active"></span>	
                        <span class="active"></span>    
                        <span class="active"></span>  
                        <span></span>    
                        <span></span>
                    </div>
                    <div class="cart-menu__price"><span>${basketProducts[id].count}</span> x $${basketProducts[id].price}</div>
                </div>
            </a>
            <div class="cart-menu__right">
                <img src="./img/index/cross.png" alt="delete from cart">
            </div>
        </div>
    `;
}

// Событие на нажатие кнопки добавления в корзину
galaryItemsEl.addEventListener('click', (event) => {
    if (!event.target.closest(".card__button")) {
        return;
    }
    event.preventDefault();
    const productCard = event.target.closest('.card');
    const productId = productCard.dataset.productid;
    const productCardPrice = productCard.querySelector('.card__price');
    const productCardName = productCard.querySelector('.card__name');
    const productCardImg = productCard.querySelector('.card__image');
    console.log();
    addProduct(productId, 
        +productCardPrice.textContent.slice(1),
        productCardName.textContent,
        productCardImg.src);
    basketCounter.textContent = getTotalProductCount();
    basketPriceCounter.textContent = "$" + getTotalProductPrice();
    basketPriceCounter.closest('.cart-menu__sum').classList.remove('hidden');
});