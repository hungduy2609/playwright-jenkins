import { expect, test } from "@playwright/test";
import userLogin from "../testdata/user.json";
import usersInfo from "../testdata/register/usersInfo.json";
import { randomString } from "../utils/random";
import LoginPage from "../pages/login.page";
import HeaderPage from "../pages/header.page";
import MyAccountNavBar from "../pages/my-account-navbar.page";
import Popup from "../pages/popup.page";
import ChangePasswordPage from "../pages/change-password.page";
import RegisterPage from "../pages/register.page";
import { emailRandom } from "../utils/random";
import { changePasswordCase } from "../testdata/change-password/changePassword";

test.describe("Change password function", () => {
    let loginPage: LoginPage;
    let header: HeaderPage;
    let myAccountNavbar: MyAccountNavBar;
    let popup: Popup;
    let changePasswordPage: ChangePasswordPage;
    let registerPage: RegisterPage;
    let email: string;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        header = new HeaderPage(page);
        myAccountNavbar = new MyAccountNavBar(page);
        popup = new Popup(page);
        changePasswordPage = new ChangePasswordPage(page);
        registerPage = new RegisterPage(page);
    });

    test("Verify that user can change password", async () => {
        email = emailRandom();
        await registerPage.gotoRegisterPage();
        await registerPage.register(usersInfo[0], email);
        await loginPage.login(email, usersInfo[0].password);

        let newPassword = randomString();

        await header.clickMyAccount();
        await myAccountNavbar.clickChangePassword();
        await changePasswordPage.changePassword(usersInfo[0].password, newPassword, newPassword);

        await expect(popup.popupSuccessfulElement).toHaveText("Password was changed");

        await popup.clickClose();
        await header.clickLogout();
        await loginPage.login(email, newPassword);
        await expect(header.myAccountElement).toBeVisible();
    });

    test("Verify that alert message displays with empty old password and new password and confirm password", async () => {
        await loginPage.login(userLogin.user1.email, userLogin.user1.password);
        changePasswordPage.gotoChangePasswordPage();
        changePasswordPage.clickChangePassword();
        await expect(changePasswordPage.getOldPasswordErrorMessage).toHaveText("Old password is required.");
        await expect(changePasswordPage.getNewPasswordErrorMessage).toHaveText("Password is required.");
        await expect(changePasswordPage.getConfirmPasswordErrorMessage).toHaveText("Password is required.");
    });

    test("Verify that alert message displays when new and confirm password do not match", async () => {
        await loginPage.login(userLogin.user1.email, userLogin.user1.password);
        let newPassword = randomString();

        await changePasswordPage.gotoChangePasswordPage();
        await changePasswordPage.changePassword(userLogin.user1.password + "abc", newPassword + "abc", newPassword);
        await expect(changePasswordPage.getConfirmPasswordErrorMessage).toHaveText("The new password and confirmation password do not match.");
    });

    changePasswordCase.forEach((data: any) => {
        test(`Verify that alert message displays ${data.reason}`, async () => {
            await loginPage.login(userLogin.user1.email, userLogin.user1.password);
            await changePasswordPage.gotoChangePasswordPage();
            await changePasswordPage.changePassword(data.oldPassword, data.newPassword, data.confirmPassword);
            await expect(changePasswordPage.getReasonErrorMessage).toHaveText(data.reasonErrorMessage);
        });
    });

    test("Verify that alert message displays when password length is shorter 6 character", async () => {
        await loginPage.login(userLogin.user1.email, userLogin.user1.password);
        await changePasswordPage.gotoChangePasswordPage();
        await changePasswordPage.changePassword(userLogin.user2.password, "12345", "12345");
        let errorMessage = await changePasswordPage.getNewPasswordErrorMessage.textContent();
        expect(errorMessage).toBe("must meet the following rules: must have at least 6 characters");
    });
});
