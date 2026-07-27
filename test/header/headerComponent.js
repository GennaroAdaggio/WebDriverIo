class HeaderComponent {

    get menuAccount() {
        return $('[data-test="nav-menu"]');
    }

    get signoutButton() {
        return $('[data-test="nav-sign-out"]');
    }

    async menu() {
        await this.menuAccount.waitForDisplayed();
        await this.menuAccount.click();
    }

    async signout() {
        await this.signoutButton.waitForDisplayed();
        await this.signoutButton.click();
    }

}

export default new HeaderComponent();