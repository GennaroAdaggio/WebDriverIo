import users from "../fixtures/credentials.json" with { type: "json" };
import { loginAs } from "../helpers/loginAs.js";
import HeaderComponent from "../header/headerComponent.js";

describe("Logout", () => {

    beforeEach(async () => {
        await browser.deleteCookies();
    });

    it("Logout success", async () => {

        await loginAs(users.firstUser);

        await HeaderComponent.menu();
        await HeaderComponent.signout();

    });

});