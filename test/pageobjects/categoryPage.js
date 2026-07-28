import Page from './basePage.js';

class CategoryPage extends Page {

    get hammerCategory() {
        return $('label=Hammer');
    }

    get productNames() {
        return $$('[data-test="product-name"]');
    }

    async filterByCategory() {
        await this.hammerCategory.waitForDisplayed();
        await this.hammerCategory.click();
    }

}

export default new CategoryPage();