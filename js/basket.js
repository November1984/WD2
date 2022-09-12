"use strict";

const cartEl = document.querySelector('.header__cart');
const galaryItemsEl = document.querySelector('.gallery__items');

galaryItemsEl.addEventListener('click', (event) => {
    console.log(event.target.tagName);
    event.preventDefault();
    
});