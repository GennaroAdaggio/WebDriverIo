import Page from './basePage.js';

class PaymentPage extends Page {

    get paymentMethod() {
        return $('[data-test="payment-method"]');
    }

    get confirmButton() {
        return $('[data-test="finish"]');
    }

    get orderConfirmation() {
        return $('#order-confirmation');
    }

    async selectPaymentMethod(method) {
        await this.paymentMethod.waitForDisplayed();
        await this.paymentMethod.selectByAttribute('value', method);
    }

    async clickConfirm() {
        await this.confirmButton.waitForEnabled();
        await this.confirmButton.scrollIntoView();
        await this.confirmButton.click();
    }

    get paymentSuccess() {
        return $('[data-test="payment-success-message"]');
    }

    async confirmPayment() {
        await this.clickConfirm();
        await this.paymentSuccess.waitForDisplayed();
        await this.clickConfirm();
        await this.orderConfirmation.waitForDisplayed({ timeout: 15000 });
    }

}

export default new PaymentPage();