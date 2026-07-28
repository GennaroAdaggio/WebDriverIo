import Page from './basePage.js';

class SearchPage extends Page {

    get searchQuery() {
        return $('[data-test="search-query"]');
    }

    get searchSubmit() {
        return $('[data-test="search-submit"]');
    }

    get productNames() {
        return $$('[data-test="product-name"]');
    }

    async search(query) {

        await this.searchQuery.waitForDisplayed();
        await this.searchQuery.setValue(query);
        await this.searchSubmit.click();
    }

}

export default new SearchPage();