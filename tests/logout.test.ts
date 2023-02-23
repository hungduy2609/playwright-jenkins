import { expect, test } from "@playwright/test";
import userInfo from "../testdata/user.json";
import LoginPage from "../pages/login.page";
import HeaderPage from "../pages/header.page";

test.describe("Logout function", () => {
    let loginPage: LoginPage;
    let header: HeaderPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        header = new HeaderPage(page);

        loginPage.login(userInfo.user1.email, userInfo.user1.password);
    });

    test("Verify that user can logout successfully", async () => {
        await header.clickLogout();
        await expect(header.loginElement).toBeVisible();
    });
});
