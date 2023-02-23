import { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";

export default class HeaderPage extends BasePage {
    private linkLogin = "//a[text()='Log in']";
    private linkLogout = "//a[text()='Log out']";
    private linkMyAccount = ".ico-account";
    private linkRegister = "//a[text()='Register']";

    constructor(page: Page) {
        super(page);
    }

    public async clickLogin() {
        await this.clickElement(this.linkLogin);
    }

    public async clickRegister() {
        await this.clickElement(this.linkRegister);
    }

    public get myAccountElement() {
        return this.getElement(this.linkMyAccount);
    }

    public async clickMyAccount() {
        await this.clickElement(this.linkMyAccount);
    }

    public async clickLogout() {
        await this.clickElement(this.linkLogout);
    }

    public get loginElement() {
        return this.getElement(this.linkLogin);
    }
}
