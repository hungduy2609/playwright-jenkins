import { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";

export default class ChangePasswordPage extends BasePage {
    private inputOldPassword = "#OldPassword";
    private inputNewPassword = "#NewPassword";
    private inputConfirmPassword = "#ConfirmNewPassword";
    private buttonChangePassword = "//button[text()='Change password']";
    private oldPasswordErrorMessage = "span#OldPassword-error";
    private newPasswordErrorMessage = "span#NewPassword-error";
    private confirmPasswordErrorMessage = "span#ConfirmNewPassword-error";
    private textReasonErrorMessage = ".validation-summary-errors>ul";

    constructor(page: Page) {
        super(page);
    }

    public async enterOldPassword(value: string) {
        await this.inputText(value, this.inputOldPassword);
    }

    public async enterNewPassword(value: string) {
        await this.inputText(value, this.inputNewPassword);
    }

    public async enterConfirmPassword(value: string) {
        await this.inputText(value, this.inputConfirmPassword);
    }

    public async changePassword(oldPassword: string, newPassword: string, confirmaPassword: string) {
        await this.enterOldPassword(oldPassword);
        await this.enterNewPassword(newPassword);
        await this.enterConfirmPassword(confirmaPassword);
        await this.clickChangePassword();
    }

    public async clickChangePassword() {
        await this.clickElement(this.buttonChangePassword);
    }

    public get getOldPasswordErrorMessage() {
        return this.getElement(this.oldPasswordErrorMessage);
    }

    public get getNewPasswordErrorMessage() {
        return this.getElement(this.newPasswordErrorMessage);
    }

    public get getConfirmPasswordErrorMessage() {
        return this.getElement(this.confirmPasswordErrorMessage);
    }

    public get getReasonErrorMessage() {
        return this.getElement(this.textReasonErrorMessage);
    }
}
