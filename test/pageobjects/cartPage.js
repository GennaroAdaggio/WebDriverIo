import Page from './basePage.js';

class CartPage extends Page {

    get cartButton() {
        return $('[data-test="nav-cart"]');
    }

    get cartQuantity() {
        return $('[data-test="cart-quantity"]');
    }

    get addToCart() {
        return $('[data-test="add-to-cart"]');
    }

    get productTitle() {
        return $('[data-test="product-title"]');
    }

    get removeButton() {
        return $('.btn-danger');
    }

    get emptyMessage() {
        return $('.toast-message');
    }

    get checkOutButton() {
        return $('[data-test="proceed-1"]');
    }

    async openProduct() {
        await this.open('/');
        await $('[data-test="search-query"]').waitForDisplayed();
        await $('[data-test="search-query"]').setValue('Pliers');
        await $('[data-test="search-submit"]').click();
        await $('h5=Pliers').waitForDisplayed();
        await $('h5=Pliers').click();
        await this.addToCart.waitForExist();
    }

    async addProductToCart() {
        await this.addToCart.waitForDisplayed();
        await this.addToCart.click();
    }

    async openCart() {
        await this.cartButton.waitForExist();
        await this.cartButton.waitForDisplayed();
        await this.cartButton.click();
    }

    async removeFromCart() {
        await this.removeButton.waitForDisplayed();
        await this.removeButton.click();
    }

    async clickCheckOut(){
        await this.checkOutButton.waitForExist();
        await this.checkOutButton.click();
    }

}

export default new CartPage();