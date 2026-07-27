import Page from './basePage.js';

class LoginPage extends Page {

    get signIn() {
        return $('[data-test="nav-sign-in"]');
    }

    get email(){
        return $('[data-test="email"]');
    }

    get password(){
        return $('[data-test="password"]');
    }

    get loginButton(){
        return $('[data-test="login-submit"]');
    }

    async login(email, password) {
        

        await this.email.waitForDisplayed();

        await this.email.setValue(email);
        await this.password.setValue(password);
        
        await this.loginButton.click();
    }
    
}

export default new LoginPage();
