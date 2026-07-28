import CartPage from '../pageObjects/cartPage.js';
import users from '../fixtures/credentials.json' with { type: "json" };
import { loginAs } from '../helpers/loginAs.js';

describe('Cart', () => {

    beforeEach(async () => {
        await browser.deleteCookies();
        await loginAs(users.firstUser);
        await browser.url('/');
    });

    it('Add to cart -> product present, count = 1', async () => {

        await CartPage.openProduct();
        await CartPage.addProductToCart();
        await CartPage.openCart();

        await expect(CartPage.productTitle).toHaveText(/pliers/i);
        await expect(CartPage.cartQuantity).toHaveText('1');

    });

    it('Remove from cart -> cart empty, badge disappears', async () => {

        await CartPage.openProduct();
        await CartPage.addProductToCart();
        await CartPage.openCart();
        await CartPage.removeFromCart();

        await expect(CartPage.emptyMessage).toHaveText('Product deleted.');
        await expect(CartPage.cartQuantity).not.toBeDisplayed();

    });

});