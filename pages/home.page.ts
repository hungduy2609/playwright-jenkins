import { Page, Locator } from "@playwright/test";
import { envConf } from "../config/envConf";
import BasePage from "./base.page";

export default class HomePage extends BasePage{
    constructor(page: Page) {
        super(page);
    }
}
