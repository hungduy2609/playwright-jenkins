import { Page } from "@playwright/test";
import { Address } from "../interface/Address";
import BasePage from "./base.page";

export default class AddAddressPage extends BasePage {
    private inputFirstName = "#Address_FirstName";
    private inputLastName = "#Address_LastName";
    private inputEmail = "#Address_Email";
    private inputCompany = "#Address_Company";
    private selectCountry = "#Address_CountryId";
    private selectStateProvince = "select#Address_StateProvinceId";
    private inputCity = "#Address_City";
    private inputAddress1 = "#Address_Address1";
    private inputAddress2 = "#Address_Address2";
    private inputZipPostalCode = "#Address_ZipPostalCode";
    private inputPhoneNumber = "#Address_PhoneNumber";
    private inputFaxNumber = "#Address_FaxNumber";
    private buttonSave = "//button[text()='Save']";

    private firstNameErrorMessage = "#Address_FirstName-error";
    private lastNameErrorMessage = "#Address_LastName-error";
    private emailErrorMessage = "#Address_Email-error";
    private cityErrorMessage = "#Address_City-error";
    private addressErrorMessage = "#Address_Address1-error";
    private zipPostalCodeErrorMessage = "#Address_ZipPostalCode-error";
    private phoneNumberErrorMessage = "#Address_PhoneNumber-error";

    constructor(page: Page) {
        super(page);
    }

    public async enterFirstName(firstName: string) {
        await this.inputText(firstName, this.inputFirstName);
    }

    public async enterLastName(lastName: string) {
        await this.inputText(lastName, this.inputLastName);
    }

    public async enterEmail(email: string) {
        await this.inputText(email, this.inputEmail);
    }

    public async enterCompany(company: string | undefined) {
        if (company !== undefined) {
            await this.inputText(company, this.inputCompany);
        }
    }

    public async selectCountryByLabel(value: string) {
        await this.selectDropdownOptionByLabel(this.selectCountry, value);
    }

    public async selectStateProvinceByLabel(value: string | undefined) {
        if (value !== undefined) {
            await this.selectDropdownOptionByLabel(this.selectStateProvince, value);
        }
    }

    public async enterCity(city: string) {
        await this.inputText(city, this.inputCity);
    }

    public async enterAddress1(address1: string) {
        await this.inputText(address1, this.inputAddress1);
    }

    public async enterAddress2(address2: string | undefined) {
        if (address2 !== undefined) {
            await this.inputText(address2, this.inputAddress2);
        }
    }

    public async enterZipPostalCode(zipPostalCode: string) {
        await this.inputText(zipPostalCode, this.inputZipPostalCode);
    }

    public async enterPhoneNumber(phoneNumber: string) {
        await this.inputText(phoneNumber, this.inputPhoneNumber);
    }

    public async enterFaxNumber(faxNumber: string | undefined) {
        if (faxNumber !== undefined) {
            await this.inputText(faxNumber, this.inputFaxNumber);
        }
    }

    public async enterInformation(newAddress: any) {
        let newAddressInfo: Address = newAddress;

        await this.enterFirstName(newAddressInfo.firstName);
        await this.enterLastName(newAddressInfo.lastName);
        await this.enterEmail(newAddressInfo.email);
        await this.enterCompany(newAddressInfo.company);
        await this.selectCountryByLabel(newAddressInfo.country);
        await this.selectStateProvinceByLabel(newAddressInfo.stateProvince);
        await this.enterCity(newAddressInfo.city);
        await this.enterAddress1(newAddressInfo.address1);
        await this.enterAddress2(newAddressInfo.address2);
        await this.enterZipPostalCode(newAddressInfo.zipPostalCode);
        await this.enterPhoneNumber(newAddressInfo.phoneNumber);
        await this.enterFaxNumber(newAddressInfo.faxNumber);

        await this.clickSave();
    }

    public async clickSave() {
        await this.clickElement(this.buttonSave);
    }

    public get firstNameErrorElement(){
        return this.getElement(this.firstNameErrorMessage);
    }

    public get lastNameErrorElement(){
        return this.getElement(this.lastNameErrorMessage);
    }

    public get emailErrorElement(){
        return this.getElement(this.emailErrorMessage);
    }

    public get addressErrorElement(){
        return this.getElement(this.addressErrorMessage);
    }

    public get cityErrorElement(){
        return this.getElement(this.cityErrorMessage);
    }

    public get zipPostalCodeErrorElement(){
        return this.getElement(this.zipPostalCodeErrorMessage);
    }

    public get phoneNumberErrorElement(){
        return this.getElement(this.phoneNumberErrorMessage);
    }
}
