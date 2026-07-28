import CartPage from '../pageobjects/cartPage.js';
import CheckoutPage from '../pageobjects/checkoutPage.js';
import users from '../fixtures/credentials.json' with { type: "json" };
import { loginAs } from '../helpers/loginAs.js';
import AddressData from '../fixtures/address.json' with { type: "json" };
import AddressPage from '../pageobjects/addressPage.js';
import PaymentData from '../fixtures/payment.json' with { type: "json" };
import PaymentPage from '../pageobjects/paymentPage.js';

describe('Checkout', () => {

    beforeEach(async () => {
        await loginAs(users.firstUser);
        await browser.waitUntil(async () => {
            return (await browser.getUrl()).includes('account');
        });
    });

    it('Complete checkout -> order confirmed', async () => {

        await CartPage.openProduct();
        await CartPage.addProductToCart();
        await CartPage.openCart();
        await CartPage.clickCheckOut();

        await CheckoutPage.clickCheckOut();
        await AddressPage.fillAddress(AddressData.address);

        await AddressPage.clickCheckOut();
        await PaymentPage.selectPaymentMethod(PaymentData.payment.method);
        await PaymentPage.confirmPayment();
        await expect(PaymentPage.orderConfirmation).toBeDisplayed();

    });

});