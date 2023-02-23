import { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";

export default class RegisterResultPage extends BasePage {
    private textResult = ".result";

    constructor(page: Page) {
        super(page);
    }

    public get getRegisterMessage(){
        return this.getElement(this.textResult)
    }
}
