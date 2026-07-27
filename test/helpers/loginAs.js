import LoginPage from "../pageObjects/login.page.js";

export async function loginAs(user) {

    await LoginPage.open('/auth/login');

    await LoginPage.login(
        user.email,
        user.password
    );

}