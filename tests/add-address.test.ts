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

test.describe("Add address function", () => {
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
    });

    test.afterEach(async () => {});

    addressesInfo.forEach((data) => {
        test(`Verify that user can add new address with ${data.testcaseName}`, async () => {
            await addressPage.clickAddNew();
            await addAddressPage.enterInformation(data);
            await addressPage.assertAllInformationIsAdded(data);
            expect(popup.popupSuccessfulElement).toHaveText("The new address has been added successfully.");
            await addressPage.clickDelete();
        });
    });

    test("Verify that alert message displays when mandatory fields are empty", async () => {
        await addressPage.clickAddNew();
        await addAddressPage.clickSave();
        await expect(addAddressPage.firstNameErrorElement).toHaveText("First name is required.");
        await expect(addAddressPage.lastNameErrorElement).toHaveText("Last name is required.");
        await expect(addAddressPage.emailErrorElement).toHaveText("Email is required.");
        //missing for country
        await expect(addAddressPage.cityErrorElement).toHaveText("City is required");
        await expect(addAddressPage.addressErrorElement).toHaveText("Street address is required");
        await expect(addAddressPage.zipPostalCodeErrorElement).toHaveText("Zip / postal code is required");
        await expect(addAddressPage.phoneNumberErrorElement).toHaveText("Phone is required");
    });

    test("Verify that alert message displays with wrong format email", async () => {
        await addressPage.clickAddNew();
        await addAddressPage.enterEmail("aaaa");
        await addAddressPage.clickSave();
        await expect(addAddressPage.emailErrorElement).toHaveText("Wrong email");
    });
});
