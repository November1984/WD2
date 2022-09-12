"use strict";

const basketProducts = {}; // Элементы, добавленные в корзину

// const cartEl = document.querySelector('.header__cart');
// контейнер с карточками товаров
const galaryItemsEl = document.querySelector('.gallery__items'); 

const basketEl = document.querySelector('.cart-menu__items');

function getTotalProductCount (){
    // Object.values(basketProducts).reduce((acc, product) => {});
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
function renderProductInBasket(id) {
    const basketItem = basketEl.querySelector(`.cart-menu__item[data-productId = "${id}"]`);
    if (!basketItem) {
        basketEl.insertAdjacentHTML('afterbegin', addNewProductInBasket(id));
        return;
    }
    basketItem.querySelector('.cart-menu__price span').textContent = basketProducts[id].count.toString();
    // console.log(basketItem.querySelector('.cart-menu__price span').textContent);
}

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
    
});