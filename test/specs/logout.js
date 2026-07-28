import users from "../fixtures/credentials.json" with { type: "json" };
import { loginAs } from "../helpers/loginAs.js";
import HeaderComponent from "../header/headerComponent.js";

describe("Logout", () => {

    beforeEach(async () => {
        await browser.deleteCookies();
        await loginAs(users.firstUser);
    });

    it("Logout success", async () => {


        await HeaderComponent.menu();
        await HeaderComponent.signout();

        await expect($('[data-test="nav-sign-in"]')).toBeDisplayed();
    });

});