import Page from './basePage.js';

class SortPage extends Page {

    get sortDropdown() {
        return $('[data-test="sort"]');
    }

    get productPrices() {
        return $$('[data-test="product-price"]');
    }

    async sortBy(value) {
        await this.sortDropdown.waitForDisplayed();
        await this.sortDropdown.selectByAttribute('value', value);
    }

}

export default new SortPage();