import { Page, Locator } from "@playwright/test";
import { Address } from "../interface/Address";
import BasePage from "./base.page";
import { expect, test } from "@playwright/test";
import { splitString, splitStringByLabel } from "../utils/stringUtilities";

export default class AddressPage extends BasePage {
    private buttonAddNew = "//button[text()='Add new']";
    private emailResult = "//li[contains(@class, 'email')]";
    private phoneNumberResult = "//li[contains(@class, 'phone')]";
    private faxNumberResult = "//li[contains(@class, 'fax')]";
    private buttonDelete = "//button[text()='Delete']";
    private address1Result = "li.address1";
    private countryResult = "li.country";
    private address2Result = "li.address2";
    private cityStateZipResult = "li.city-state-zip";
    private noAddressMessage = ".no-data";
    private infoAddress = ".info";

    constructor(page: Page) {
        super(page);
    }

    public async clickAddNew() {
        await this.clickElement(this.buttonAddNew);
    }

    public get emailResultElement() {
        return this.getElement(this.emailResult);
    }

    public get phoneResultElement() {
        return this.getElement(this.phoneNumberResult);
    }

    public get faxNumberElement() {
        return this.getElement(this.faxNumberResult);
    }

    public get address1Element() {
        return this.getElement(this.address1Result);
    }

    public get address2Element() {
        return this.getElement(this.address2Result);
    }

    public get countryElement() {
        return this.getElement(this.countryResult);
    }

    public get cityStateZipElement() {
        return this.getElement(this.cityStateZipResult);
    }

    public async assertAllInformationIsAdded(newAddress: any) {
        let newAddressInfo: Address = newAddress;

        expect(splitStringByLabel(await this.emailResultElement.innerText(), "Email:")).toBe(newAddressInfo.email);
        expect(splitStringByLabel(await this.phoneResultElement.innerText(), "Phone number:")).toBe(newAddressInfo.phoneNumber);
        expect(splitStringByLabel(await this.faxNumberElement.innerText(), "Fax number:")).toBe(newAddressInfo.faxNumber || "");
        expect(this.address1Element).toHaveText(newAddressInfo.address1);
        if (newAddressInfo.address2 !== undefined) {
            expect(this.address2Element).toHaveText(newAddressInfo.address2);
        }
        expect(this.countryElement).toHaveText(newAddressInfo.country);
        if (newAddress.stateProvince !== undefined) {
            let [cityResult, stateResult, zipResult] = splitString(await this.cityStateZipElement.innerText());
            expect(cityResult.trim()).toBe(newAddress.city);
            expect(stateResult.trim()).toBe(newAddress.stateProvince);
            expect(zipResult.trim()).toBe(newAddress.zipPostalCode);
        } else {
            let [cityResult, zipResult] = splitString(await this.cityStateZipElement.innerText());
            expect(cityResult.trim()).toBe(newAddress.city);
            expect(zipResult.trim()).toBe(newAddress.zipPostalCode);
        }
    }

    public get noAddressElement() {
        return this.getElement(this.noAddressMessage);
    }

    public get infoAddressElement() {
        return this.getElement(this.infoAddress);
    }

    public async clickDelete() {
        await this.acceptDialog();
        await this.clickElement(this.buttonDelete);
        await expect(this.noAddressElement).toHaveText("No addresses");
    }

    public async clickCancelDelete() {
        await this.dismissDialog();
        await this.clickElement(this.buttonDelete);
    }
}
