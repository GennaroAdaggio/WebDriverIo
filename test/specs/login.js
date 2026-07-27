import users from "../fixtures/credentials.json" with { type: "json" };
import messages from "../fixtures/messages.json" with { type: "json" };
import { loginAs } from "../helpers/loginAs.js";
import { waitForUrl } from "../helpers/waitFor.js";
import LoginErrorPage from "../pageobjects/loginError.js";
import HeaderComponent from "../header/headerComponent.js";

describe("Login", () => {

    beforeEach(async () => {
        await browser.deleteCookies();
    });

    it("Login success", async () => {

        await loginAs(users.firstUser);

        await waitForUrl("account");

    });

    it("Login error: invalid password", async () => {

        await loginAs(users.wrongPassword);

        await expect(LoginErrorPage.errorMessage)
            .toHaveText(messages.invalidLogin);

    });

});