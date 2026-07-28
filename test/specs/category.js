import CategoryPage from '../pageObjects/categoryPage.js';

describe('Category', () => {

    beforeEach(async () => {
        await CategoryPage.open('/');
    });

    it('Filter by Hammer shows only matching products', async () => {

        await CategoryPage.filterByCategory();

        const products = await CategoryPage.productNames;

        for (const product of products) {
            await expect(product).toHaveText(/hammer/i);
        }

    });

});