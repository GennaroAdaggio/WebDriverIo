import Page from './basePage.js';

class ProductPage extends Page {

    get productName() {
        return $('[data-test="product-name"]');
    }

    get productPrice() {
        return $('[data-test="unit-price"]');
    }

    get productDescription() {
        return $('[data-test="product-description"]');
    }

    get homeLink() {
        return $('[data-test="nav-home"]');
    }

    async goHome() {
        await this.homeLink.waitForDisplayed();
        await this.homeLink.click();
    }

}

export default new ProductPage();