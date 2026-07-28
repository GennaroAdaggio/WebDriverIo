import SortPage from '../pageObjects/sortPage.js';

describe('Sort', () => {

    beforeEach(async () => {
        await SortPage.open('/');
    });

    it('Sort by price low to high', async () => {

        await SortPage.sortBy('price,asc');

        const prices = await SortPage.productPrices;

        const priceValues = [];
        for (const price of prices) {
            const text = await price.getText();
            priceValues.push(parseFloat(text.replace('$', '')));
        }

        for (let i = 0; i < priceValues.length - 1; i++) {
            await expect(priceValues[i]).toBeLessThanOrEqual(priceValues[i + 1]);
        }

    });

    it('Sort by price high to low', async () => {

        await SortPage.sortBy('price,desc');

        const prices = await SortPage.productPrices;

        const priceValues = [];
        for (const price of prices) {
            const text = await price.getText();
            priceValues.push(parseFloat(text.replace('$', '')));
        }

        for (let i = 0; i < priceValues.length - 1; i++) {
            await expect(priceValues[i]).toBeGreaterThanOrEqual(priceValues[i + 1]);
        }

    });

});