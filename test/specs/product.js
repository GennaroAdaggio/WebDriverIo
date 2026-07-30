import ProductPage from '../pageobjects/productPage.js';
import CartPage from '../pageobjects/cartPage.js';

describe('Product Detail', () => {

    beforeEach(async () => {
        await CartPage.openProduct();
    });

    it('Click product -> verify detail -> breadcrumb -> back to catalog', async () => {

        await expect(ProductPage.productName).toBeDisplayed();
        await expect(ProductPage.productPrice).toBeDisplayed();
        await expect(ProductPage.productDescription).toBeDisplayed();

        await ProductPage.goHome();

        await expect(browser).toHaveUrl('https://practicesoftwaretesting.com/');

    });

});