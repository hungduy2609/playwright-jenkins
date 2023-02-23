import { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";

export default class MyAccountNavbar extends BasePage {
    private linkChangePassword = ".change-password>a";
    private linkAddress = ".customer-addresses>a";

    constructor(page: Page) {
        super(page);
    }

    public async clickChangePassword() {
        await this.clickElement(this.linkChangePassword);
    }

    public async clickAddress() {
        await this.clickElement(this.linkAddress);
    }
}
