import { Page, Locator } from "@playwright/test";
import { envConf } from "../config/envConf";
import { expect } from "@playwright/test";
export default class BasePage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async gotoUrl(endPoint: string) {
        await this.page.goto(envConf.baseUrl + endPoint);
    }

    public async inputText(value: string, locator: string) {
        await this.page.locator(locator).fill(value);
    }

    public getElement(locator: string): Locator {
        return this.page.locator(locator);
    }

    public async clickElement(locator: string) {
        await this.page.click(locator);
    }

    public async gotoLoginPage() {
        await this.gotoUrl("/login");
    }

    public async gotoHomePage() {
        await this.page.goto(envConf.baseUrl);
    }

    public async gotoChangePasswordPage() {
        await this.gotoUrl("/customer/changepassword");
    }

    public async gotoRegisterPage() {
        await this.gotoUrl("/register");
    }

    public async selectDropdownOption(selector: string, value: string) {
        await this.page.locator(selector).selectOption(value);
    }

    public async selectDropdownOptionByLabel(selector: string, value: string) {
        await this.page.locator(selector).selectOption({ label: value });
    }

    public async acceptDialog() {
        await this.page.once("dialog", async (dialog) => {
            dialog.accept();
        });
    }

    public async dismissDialog() {
        await this.page.once("dialog", async (dialog) => {
            dialog.dismiss();
        });
    }
}
