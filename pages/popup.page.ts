import { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";

export default class Popup extends BasePage {
    private linkChangePassword = ".change-password>a";
    private popupSuccessful = "//div[contains(@class, 'bar-notification success')]";
    private buttonClose = "span.close";

    constructor(page: Page) {
        super(page);
    }

    public get popupSuccessfulElement() {
        return this.getElement(this.popupSuccessful);
    }

    public async clickClose() {
        await this.clickElement(this.buttonClose);
    }
}
