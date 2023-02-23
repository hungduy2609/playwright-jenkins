import { expect, test } from "@playwright/test";
import usersLogin from "../testdata/user.json";
import LoginPage from "../pages/login.page";
import HomePage from "../pages/home.page";
import HeaderPage from "../pages/header.page";
import AddressPage from "../pages/address.page";
import AddAddressPage from "../pages/add-address.page";
import MyAccountNavbar from "../pages/my-account-navbar.page";
import addressesInfo from "../testdata/add-address/addressesInfo.json";
import Popup from "../pages/popup.page";

test.describe("Delete address function", () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let header: HeaderPage;
    let addressPage: AddressPage;
    let addAddressPage: AddAddressPage;
    let myAccountNavbar: MyAccountNavbar;
    let popup: Popup;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        header = new HeaderPage(page);
        addressPage = new AddressPage(page);
        addAddressPage = new AddAddressPage(page);
        myAccountNavbar = new MyAccountNavbar(page);
        popup = new Popup(page);

        await homePage.gotoHomePage();
        await loginPage.login(usersLogin.user3.email, usersLogin.user3.password);
        await header.clickMyAccount();
        await myAccountNavbar.clickAddress();
        await addressPage.clickAddNew();
        await addAddressPage.enterInformation(addressesInfo[0]);
    });

    test.afterEach(async () => {});
        test("Verify that user can delete new address", async () => {
            await addressPage.clickDelete();
        });

        test("Verify that user can cancel delete new address", async () => {
            await addressPage.clickCancelDelete();
            await expect(addressPage.infoAddressElement).toBeVisible();
            await addressPage.clickDelete();
        });
});
