import { Page } from "@playwright/test";
import { Address } from "../interface/Address";
import BasePage from "./base.page";
import { capitalize } from "../utils/stringUtilities";

export default class EditAddressPage extends BasePage {
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

    public async enterCountry(value: string) {
        await this.selectDropdownOptionByLabel(this.selectCountry, value);
    }

    public async enterStateProvince(value: string | undefined) {
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

        const fieldList = [
            'firstName',
            'lastName',
            'email',
            'company',
            'country',
            'stateProvince',
            'city',
            'address1',
            'address2',
            'zipPostalCode',
            'phoneNumber',
            'faxNumber'
        ];

        fieldList.forEach((fieldName: string) => {
            if (newAddressInfo[fieldName]) {
                const functionName = `enter${capitalize(fieldName)}`;
                this[functionName](newAddressInfo[fieldName]);
            }
        });

        await this.clickSave();
    }

    public async clickSave() {
        await this.clickElement(this.buttonSave);
    }

    public async editAddress(editAddress: any) {
        let editAddressInfo: Address = editAddress;
        const fieldList = [
            'email',
            'company',
            'country',
            'stateProvince',
            'city',
            'address1',
            'address2',
            'zipPostalCode',
            'phoneNumber',
            'faxNumber'
        ];

        fieldList.forEach((fieldName: string) => {
            if (editAddressInfo[fieldName]) {
                const functionName = `enter${capitalize(fieldName)}`;
                this[functionName](editAddressInfo[fieldName]);
            }
        });
    }
}