import { expect, test } from "@playwright/test";
import usersInfo from "../testdata/register/usersInfo.json";
import usersLogin from "../testdata/user.json";
import { emailRandom } from "../utils/random";
import RegisterResultPage from "../pages/register-result.page";
import LoginPage from "../pages/login.page";
import HomePage from "../pages/home.page";
import HeaderPage from "../pages/header.page";
import RegisterPage from "../pages/register.page";

test.describe("Register function", () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let header: HeaderPage;
    let registerPage: RegisterPage;
    let registerResultPage: RegisterResultPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        header = new HeaderPage(page);
        registerPage = new RegisterPage(page);
        registerResultPage = new RegisterResultPage(page);

        await homePage.gotoHomePage();
        await header.clickRegister();
    });

    test.afterEach(async () => {});

    usersInfo.forEach((userInfo) => {
        test(`Verify that user can register with ${userInfo.testcaseName}`, async () => {
            let email = emailRandom();

            await registerPage.register(userInfo, email);
            await expect(registerResultPage.getRegisterMessage).toHaveText("Your registration completed");

            await header.clickLogin();
            await loginPage.login(email, userInfo.password);
            await expect(header.myAccountElement).toBeVisible();
        });
    });

    test("Verify that alert message displays when leaving all mandatory fields", async () => {
        await registerPage.clickRegister();
        await expect(registerPage.getFirstNameErrorMessage).toHaveText("First name is required.");
        await expect(registerPage.getLastNameErrorMessage).toHaveText("Last name is required.");
        await expect(registerPage.getEmailErrorMessage).toHaveText("Email is required.");
        await expect(registerPage.getPasswordErrorMessage).toHaveText("Password is required.");
        await expect(registerPage.getConfirmPasswordErrorMessage).toHaveText("Password is required.");
    });

    test("Verify that alert message displays with existing email", async () => {
        await registerPage.clickRegister();
        await registerPage.register(usersInfo[0], usersLogin.user1.email);
        await expect(registerPage.getReasonErrorMessage).toHaveText("The specified email already exists");
    });

    test("Verify that alert message displays when password length is shorter 6 character", async () => {
        await registerPage.clickRegister();
        await registerPage.enterPassword("12345");
        await registerPage.clickRegister();

        let errorMessage = await registerPage.getPasswordErrorMessage.textContent();
        console.log(errorMessage);
        expect(errorMessage).toBe("must meet the following rules: must have at least 6 characters");
    });
});
