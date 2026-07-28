import SearchPage from '../pageobjects/searchPage.js';

describe('Search', () => {

    beforeEach(async () => {
        await SearchPage.open('/');
    });

    it('Search for Pliers shows only matching products', async () => {


        await SearchPage.search('Pliers');

        const products = await SearchPage.productNames;

        for (const product of products) {
            await expect(product).toHaveText(expect.stringContaining('Pliers'));
        }

    });

});