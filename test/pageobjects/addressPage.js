import Page from './basePage.js';

class addressPage extends Page {

    get checkOutButton() {
        return $('[data-test="proceed-3"]');
    }

    get country() {
        return $('[data-test="country"]');
    }

    get postalCode() {
        return $('[data-test="postal_code"]');
    }

    get houseNumber() {
        return $('[data-test="house_number"]');
    }

    get street() {
        return $('[data-test="street"]');
    }

    get city() {
        return $('[data-test="city"]');
    }

    get state() {
        return $('[data-test="state"]');
    }

    async clickCheckOut(){
        await this.checkOutButton.waitForExist();
        await this.checkOutButton.click();
    }

    async fillAddress(address) {
        await this.country.waitForDisplayed();
        await this.country.selectByAttribute('value', address.country);
        await this.postalCode.setValue(address.postalCode);
        await this.houseNumber.setValue(address.houseNumber);
        await this.street.setValue(address.street);
        await this.city.setValue(address.city);
        await this.state.setValue(address.state);
    }

}

export default new addressPage();