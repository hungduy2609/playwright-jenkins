import { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";

export default class LoginPage extends BasePage {
    private inputEmail = "input[name='Email']";
    private inputPassword = "input[name='Password']";
    private buttonLogin = "//button[text()='Log in']";
    private textEmailErrorMessage = "#Email-error";
    private textLoginErrorMessage = ".validation-summary-errors";
    private textReasonErrorMessage = ".validation-summary-errors>ul";

    constructor(page: Page) {
        super(page);
    }

    public async enterEmail(name: string) {
        await this.inputText(name, this.inputEmail);
    }

    public async enterPassword(password: string) {
        await this.inputText(password, this.inputPassword);
    }

    public async enterEmailAndPassword(name: string, password: string) {
        await this.enterEmail(name);
        await this.enterPassword(password);
    }

    public async clickLoginButton() {
        await this.clickElement(this.buttonLogin);
    }

    public get getEmailErrorMessageElement() {
        return this.getElement(this.textEmailErrorMessage);
    }

    public get getFullLoginErrorMessageElement() {
        return this.getElement(this.textLoginErrorMessage);
    }

    public get getReasonErrorMessage() {
        return this.getElement(this.textReasonErrorMessage);
    }

    public async login(name: string, password: string) {
        await this.gotoLoginPage();
        await this.enterEmailAndPassword(name, password);
        await this.clickLoginButton();
    }
}
