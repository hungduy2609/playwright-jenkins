import { Page, Locator } from "@playwright/test";
import { Address } from "../interface/Address";
import BasePage from "./base.page";
import { expect, test } from "@playwright/test";
import { splitString, splitStringByLabel, getFullName } from "../utils/stringUtilities";

export default class AddressPage extends BasePage {
    private buttonAddNew = "//button[text()='Add new']";
    private fullNameResult = "li.name";
    private emailResult = "//li[contains(@class, 'email')]";
    private phoneNumberResult = "//li[contains(@class, 'phone')]";
    private faxNumberResult = "//li[contains(@class, 'fax')]";
    private companyResult = "li.company";
    private buttonDelete = "//button[text()='Delete']";
    private address1Result = "li.address1";
    private countryResult = "li.country";
    private address2Result = "li.address2";
    private cityStateZipResult = "li.city-state-zip";
    private noAddressMessage = ".no-data";
    private infoAddress = ".info";
    private buttonEdit = "//button[text()='Edit']";

    constructor(page: Page) {
        super(page);
    }

    public async clickAddNew() {
        await this.clickElement(this.buttonAddNew);
    }

    public get fullNameResultElement() {
        return this.getElement(this.fullNameResult);
    }

    public get emailResultElement() {
        return this.getElement(this.emailResult);
    }

    public get phoneResultElement() {
        return this.getElement(this.phoneNumberResult);
    }

    public get faxNumberResultElement() {
        return this.getElement(this.faxNumberResult);
    }

    public get companyResultElement() {
        return this.getElement(this.companyResult);
    }

    public get address1ResultElement() {
        return this.getElement(this.address1Result);
    }

    public get address2ResultElement() {
        return this.getElement(this.address2Result);
    }

    public get countryResultElement() {
        return this.getElement(this.countryResult);
    }

    public get cityStateZipResultElement() {
        return this.getElement(this.cityStateZipResult);
    }

    public async assertAllInformationIsAdded(newAddress: any) {
        let newAddressInfo: Address = newAddress;

        expect(this.fullNameResultElement).toHaveText(getFullName(newAddressInfo.firstName, newAddressInfo.lastName));
        expect(splitStringByLabel(await this.emailResultElement.innerText(), "Email:")).toBe(newAddressInfo.email);
        expect(splitStringByLabel(await this.phoneResultElement.innerText(), "Phone number:")).toBe(newAddressInfo.phoneNumber);
        expect(splitStringByLabel(await this.faxNumberResultElement.innerText(), "Fax number:")).toBe(newAddressInfo.faxNumber || "");
        expect(this.address1ResultElement).toHaveText(newAddressInfo.address1);
        if (newAddressInfo.company !== undefined) {
            expect(this.companyResultElement).toHaveText(newAddressInfo.company);
        }
        if (newAddressInfo.address2 !== undefined) {
            expect(this.address2ResultElement).toHaveText(newAddressInfo.address2);
        }
        expect(this.countryResultElement).toHaveText(newAddressInfo.country);
        if (newAddressInfo.stateProvince !== undefined) {
            let [cityResult, stateResult, zipResult] = splitString(await this.cityStateZipResultElement.innerText());
            expect(cityResult.trim()).toBe(newAddress.city);
            expect(stateResult.trim()).toBe(newAddress.stateProvince);
            expect(zipResult.trim()).toBe(newAddress.zipPostalCode);
        } else {
            let [cityResult, zipResult] = splitString(await this.cityStateZipResultElement.innerText());
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

    public async clickEdit() {
        await this.clickElement(this.buttonEdit);
    }

    public async assertAllInformationIsEdited(newAddress: any) {
        let editAddressInfo: Address = newAddress;

        if (editAddressInfo.email !== undefined) {
            expect(splitStringByLabel(await this.emailResultElement.innerText(), "Email:")).toBe(editAddressInfo.email);
        }
        if (editAddressInfo.phoneNumber !== undefined) {
            expect(splitStringByLabel(await this.phoneResultElement.innerText(), "Phone number:")).toBe(editAddressInfo.phoneNumber);
        }
        if (editAddressInfo.faxNumber !== undefined) {
            expect(splitStringByLabel(await this.faxNumberResultElement.innerText(), "Fax number:")).toBe(editAddressInfo.faxNumber || "");
        }
        if (editAddressInfo.address1 !== undefined) {
            expect(this.address1ResultElement).toHaveText(editAddressInfo.address1);
        }
        if (editAddressInfo.company !== undefined) {
            expect(this.companyResultElement).toHaveText(editAddressInfo.company);
        }
        if (editAddressInfo.address2 !== undefined) {
            expect(this.address2ResultElement).toHaveText(editAddressInfo.address2);
        }
        if (editAddressInfo.country !== undefined) {
            expect(this.countryResultElement).toHaveText(editAddressInfo.country);
        }
        if (editAddressInfo.stateProvince !== undefined) {
            let [cityResult, stateResult, zipResult] = splitString(await this.cityStateZipResultElement.innerText());
            expect(stateResult.trim()).toBe(newAddress.stateProvince);
        }
        if (editAddressInfo.city !== undefined) {
            let [cityResult, stateResult, zipResult] = splitString(await this.cityStateZipResultElement.innerText());
            expect(cityResult.trim()).toBe(newAddress.city);
        }
        if (editAddressInfo.zipPostalCode !== undefined) {
            let [cityResult, zipResult] = splitString(await this.cityStateZipResultElement.innerText());
            expect(zipResult.trim()).toBe(newAddress.zipPostalCode);
        }
    }
}
