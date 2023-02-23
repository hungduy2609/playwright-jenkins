import { expect, test } from "@playwright/test";
import userInfo from "../testdata/user.json";
import invalidAccount from "../testdata/login/invalidAccount.json";
import invalidEmail from "../testdata/login/invalidEmail.json";
import { envConf } from "../config/envConf";
import LoginPage from "../pages/login.page";
import HomePage from "../pages/home.page";
import HeaderPage from "../pages/header.page";
import MyAccountNavBar from "../pages/my-account-navbar.page";
import Popup from "../pages/popup.page";

test.describe("Login function", () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let header: HeaderPage;
    let myAccountNavbar: MyAccountNavBar;
    let popup: Popup;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        header = new HeaderPage(page);
        myAccountNavbar = new MyAccountNavBar(page);
        popup = new Popup(page);

        await homePage.gotoHomePage();
    });

    test.afterEach(async () => {});

    test("Verify that login page displays correctly when clicking login button", async ({ page }) => {
        await header.clickLogin();
        expect(page.url()).toContain(envConf.baseUrl + "/login");
    });

    test("Verify that user login successfully", async () => {
        await loginPage.login(userInfo.user1.email, userInfo.user1.password);
        await expect(header.myAccountElement).toBeVisible();
        await header.clickLogout();
    });

    invalidEmail.forEach((data) => {
        test(`Verify that alert message displays with ${data.reason}`, async () => {
            await loginPage.login(data.email, data.password);
            await expect(loginPage.getEmailErrorMessageElement).toHaveText(data.errorMessage);
        });
    });

    invalidAccount.forEach((data) => {
        test(`Verify that alert message displays with ${data.reason}`, async () => {
            await loginPage.gotoLoginPage();
            await loginPage.enterEmailAndPassword(data.email, data.password);
            await loginPage.clickLoginButton();
            let loginErrorMessage = (await loginPage.getFullLoginErrorMessageElement.textContent())?.replace(await loginPage.getReasonErrorMessage.innerText(), "").trim();
            expect(loginErrorMessage).toBe(data.loginErrorMessage);
            await expect(loginPage.getReasonErrorMessage).toHaveText(data.reasonErrorMessage);
        });
    });
});
