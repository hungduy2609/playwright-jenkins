import { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";
import { splitDate } from "../utils/dateUtilities";
import { UserInfo } from "../interface/userInfo";

export default class RegisterPage extends BasePage {
    private inputFirstName = "#FirstName";
    private inputLastName = "#LastName";
    private inputEmail = "#Email";
    private inputPassword = "#Password";
    private inputConfirmPassword = "#ConfirmPassword";
    private radioGender = (gender: string) => `span.${gender.toLowerCase()}`;
    private selectDataOfBirthDay = "//select[@name= 'DateOfBirthDay']";
    private selectDataOfBirthMonth = "//select[@name= 'DateOfBirthMonth']";
    private selectDataOfBirthYear = "//select[@name= 'DateOfBirthYear']";
    private buttonRegister = "#register-button";
    private inputCompanyName = "#Company";
    private firstNameErrorMessage = "#FirstName-error";
    private lastNameErrorMessage = "#LastName-error";
    private emailErrorMessage = "#Email-error";
    private passwordErrorMessage = "#Password-error";
    private confirmPasswordErrorMessage = "#ConfirmPassword-error";
    private textReasonErrorMessage = ".validation-summary-errors>ul";

    constructor(page: Page) {
        super(page);
    }

    public async selectGender(gender: string | undefined) {
        if (gender !== undefined) {
            await this.clickElement(this.radioGender(gender));
        }
    }

    public async enterFirstName(name: string) {
        await this.inputText(name, this.inputFirstName);
    }

    public async enterLastName(name: string) {
        await this.inputText(name, this.inputLastName);
    }

    public async selectDateOfBirth(date: string | undefined) {
        if (date !== undefined) {
            let [day, month, year] = splitDate(date);
            await this.selectDropdownOption(this.selectDataOfBirthDay, day);
            await this.selectDropdownOption(this.selectDataOfBirthMonth, month.replace(/^0+/, ""));
            await this.selectDropdownOption(this.selectDataOfBirthYear, year);
        }
    }

    public async enterEmail(email: string) {
        await this.inputText(email, this.inputEmail);
    }

    public async enterCompanyName(companyName: string | undefined) {
        if (companyName !== undefined) {
            await this.inputText(companyName, this.inputCompanyName);
        }
    }

    public async enterPassword(password: string) {
        await this.inputText(password, this.inputPassword);
    }

    public async enterConfirmPassword(password: string) {
        await this.inputText(password, this.inputConfirmPassword);
    }

    public async register(userInfo: any, email: string) {
        let user: UserInfo = userInfo;
        await this.selectGender(user.gender);
        await this.enterFirstName(user.firstName);
        await this.enterLastName(user.lastName);
        await this.selectDateOfBirth(user.dateOfBirth);
        await this.enterEmail(email);
        await this.enterCompanyName(user.company);
        await this.enterPassword(user.password);
        await this.enterConfirmPassword(user.confirmPassword);
        await this.clickRegister();
    }

    public async clickRegister() {
        await this.clickElement(this.buttonRegister);
    }

    public get getFirstNameErrorMessage() {
        return this.getElement(this.firstNameErrorMessage);
    }

    public get getLastNameErrorMessage() {
        return this.getElement(this.lastNameErrorMessage);
    }

    public get getEmailErrorMessage() {
        return this.getElement(this.emailErrorMessage);
    }

    public get getPasswordErrorMessage() {
        return this.getElement(this.passwordErrorMessage);
    }

    public get getConfirmPasswordErrorMessage() {
        return this.getElement(this.confirmPasswordErrorMessage);
    }

    public get getReasonErrorMessage() {
        return this.getElement(this.textReasonErrorMessage);
    }
}
