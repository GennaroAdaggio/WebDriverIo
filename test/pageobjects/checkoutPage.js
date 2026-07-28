import Page from './basePage.js';

class CheckOutPage extends Page {

    get checkOutButton() {
        return $('[data-test="proceed-2"]');
    }

    async clickCheckOut(){
        await this.checkOutButton.waitForExist();
        await this.checkOutButton.click();
    }
	
	
}

export default new CheckOutPage();