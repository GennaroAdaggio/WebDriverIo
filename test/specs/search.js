import SearchPage from '../pageobjects/searchPage.js';

describe('Search', () => {

    beforeEach(async () => {
        await SearchPage.open('/');
    });

    it('Search for Pliers shows only matching products', async () => {

        await SearchPage.search('Pliers');

        const products = await SearchPage.productNames;
        const count = products.length;

        for (let i = 0; i < count; i++) {
            await expect(products[i]).toHaveText(expect.stringContaining('Pliers'));
        }

    });

});