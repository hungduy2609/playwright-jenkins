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
import EditAddressPage from "../pages/edit-address.page";
import EditInfo from "../testdata/edit-address/editInfo.json";

test.describe("Edit address function", () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let header: HeaderPage;
    let addressPage: AddressPage;
    let addAddressPage: AddAddressPage;
    let myAccountNavbar: MyAccountNavbar;
    let popup: Popup;
    let editAddressPage: EditAddressPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        header = new HeaderPage(page);
        addressPage = new AddressPage(page);
        addAddressPage = new AddAddressPage(page);
        myAccountNavbar = new MyAccountNavbar(page);
        popup = new Popup(page);
        editAddressPage = new EditAddressPage(page);

        await homePage.gotoHomePage();
        await loginPage.login(usersLogin.user3.email, usersLogin.user3.password);
        await header.clickMyAccount();
        await myAccountNavbar.clickAddress();
        await addressPage.clickAddNew();
        await addAddressPage.enterInformation(addressesInfo[0]);
    });

    test.afterEach(async () => {});

    EditInfo.forEach((data) => {
        test(`Verify that user can edit ${data.testcaseName}`, async () => {
            await addressPage.clickEdit();
            await editAddressPage.editAddress(data);
            await editAddressPage.clickSave();
            expect(await addressPage.assertAllInformationIsEdited(data));
            await addressPage.clickDelete();
        });
    });
});
