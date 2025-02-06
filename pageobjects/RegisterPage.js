import { expect } from "@playwright/test";
import commonFunctions from '../utils/commonFunctions';
import { time } from "console";

class RegisterPage{
    constructor(page){
        this.page = page;
        this.url = commonFunctions.readJsonFile('url')
        this.writeEmail = commonFunctions.readJsonFile("email");
        this.writePassword = commonFunctions.readJsonFile("password");
        this.iconSignIn = page.locator(`//div[@class='user-login t']`);
        this.activeSlideBar = page.locator(`//nav[@id="right-sidebar" and contains(@class,'active')]`);
        this.invalidFeedback = page.locator(`//div[@class="invalid-feedback"]`);
        this.btnLogOut = this.activeSlideBar.locator(`//div[@class='logout']`);
        this.showSlideBar = this.activeSlideBar.locator(`//div[@class="sidebar-content"]`);
        this.tabSignUp = this.activeSlideBar.locator(`//a[contains(@class,'sign-up-btn')]`);
        this.titleAccount = this.activeSlideBar.locator(`//div[contains(@class,'title-contain')]//span`);
        this.membershipPage = this.activeSlideBar.locator(`//div[contains(@class,"membership-card")]`);
        this.activeRegisterTab = this.activeSlideBar.locator(`//div[@class="sidebar-registration active"]`)
        this.btnCreateAccount = this.activeRegisterTab.locator(`//button`);
        this.messageRegister = this.activeRegisterTab.locator(`//div[@class="register-msg"]//span`);
        this.inputEmail = this.activeRegisterTab.locator(`//input[@id="registration-form-email"]`);
        this.inputPassword = this.activeRegisterTab.locator(`//input[@id="registration-form-password"]`);
        this.inputPasswordConfirm = this.activeRegisterTab.locator(`//input[@id="registration-form-password-confirm"]`);
        this.selectTitleAccount = this.activeRegisterTab.locator(`//select[@id="registration-form-title"]`);
        this.inputFirstName = this.activeRegisterTab.locator(`//input[@id="registration-form-first-name"]`);
        this.inputLastName = this.activeRegisterTab.locator(`//input[@id="registration-form-last-name"]`);
        this.inputPhoneNumber = this.activeRegisterTab.locator(`//input[@id="registration-form-phone"]`);
        this.selectDay = this.activeRegisterTab.locator(`//select[@id="day"]`)
        this.selectMonth = this.activeRegisterTab.locator(`//select[@name="month"]`)
        this.selectYear = this.activeRegisterTab.locator(`//select[@id="year"]`)
        this.checkCondition = this.activeRegisterTab.locator(`//input[@id="accept-terms-condition"]`);

        this.invalidFeedbackEmail = this.inputEmail.locator(`..`).locator(this.invalidFeedback);
        this.invalidFeedbackPassword = this.inputPassword.locator(`..`).locator(this.invalidFeedback);
        this.invalidFeedbackPasswordConfirm = this.inputPasswordConfirm.locator(`..`).locator(this.invalidFeedback);
        this.invalidFeedbackTitle = this.selectTitleAccount.locator(`..`).locator(this.invalidFeedback);
        this.invalidFeedbackFirstName = this.inputFirstName.locator(`..`).locator(this.invalidFeedback);
        this.invalidFeedbackLastName = this.inputLastName.locator(`..`).locator(this.invalidFeedback);
        this.invalidFeedbackPhone = this.inputPhoneNumber.locator(`..`).locator(this.invalidFeedback);
        this.invalidFeedbackDate = this.activeRegisterTab.locator(`//div[@class="row date-select"]/ancestor::div/div[@class="invalid-feedback"]`);
        this.invalidFeedbackCondition = this.checkCondition.locator(`..`).locator(this.invalidFeedback);

    }

    async showSlidebarSignIn(){
        await this.page.goto(this.url);
        await this.iconSignIn.click();
        await expect(this.showSlideBar).toBeVisible();
        await this.tabSignUp.click();
    }

    async registerFailWithoutFill(){
        await this.showSlidebarSignIn();
        await expect(this.messageRegister).toHaveText(commonFunctions.readJsonFile('msgRegister'));
        await this.btnCreateAccount.click();
        await expect(this.invalidFeedbackEmail).toHaveText(commonFunctions.readJsonFile('notfillEmail'));
        await expect(this.invalidFeedbackPassword).toHaveText(commonFunctions.readJsonFile('notfillPassword'));
        await expect(this.invalidFeedbackPasswordConfirm).toHaveText(commonFunctions.readJsonFile('notfillPassword'));
        await expect(this.invalidFeedbackTitle).toHaveText(commonFunctions.readJsonFile('notfillTitle'));
        await expect(this.invalidFeedbackFirstName).toHaveText(commonFunctions.readJsonFile('notfillFirstName'));
        await expect(this.invalidFeedbackLastName).toHaveText(commonFunctions.readJsonFile('notfillLastName'));
        await expect(this.invalidFeedbackPhone).toHaveText(commonFunctions.readJsonFile('notfillPhone'));
        await expect(this.invalidFeedbackDate).toHaveText(commonFunctions.readJsonFile('notfillDate'));
        await expect(this.invalidFeedbackCondition).toHaveText(commonFunctions.readJsonFile('notcheckCondition'));
    }

    async fillData(){
        // title, first, last, date
        await this.selectTitleAccount.selectOption('Mr');
        await this.inputFirstName.fill(commonFunctions.generateRandomString(5));
        await this.inputLastName.fill(commonFunctions.generateRandomString(5));
        await this.selectDay.selectOption('1');
        await this.selectMonth.selectOption('1');
        await this.selectYear.selectOption('1989');
    }

    async  registerFailWithFill(){
        await this.inputEmail.fill(commonFunctions.generateRandomString(7));
        const randomPass = commonFunctions.generateRandomNumber(5);
        await this.inputPassword.fill(randomPass);
        await this.inputPasswordConfirm.fill(randomPass);
        await this.inputPhoneNumber.fill(randomPass);
        await this.btnCreateAccount.click();
        await expect(this.invalidFeedbackEmail).toHaveText(commonFunctions.readJsonFile("invalidEmail"));
        await expect(this.invalidFeedbackPassword).toHaveText(commonFunctions.readJsonFile('invalidPass'));
        await expect(this.invalidFeedbackPasswordConfirm).toHaveText(commonFunctions.readJsonFile('invalidPass'));
        await expect(this.invalidFeedbackPhone).toHaveText(commonFunctions.readJsonFile("invalidPhone"))
    }

    async registerFailWithExisted(){
        await this.inputEmail.fill(this.writeEmail);
        const randomPass = commonFunctions.generateRandomNumber(5);
        await this.inputPassword.fill(randomPass);
        await this.btnCreateAccount.click();
        await expect(this.invalidFeedbackEmail).toHaveText(commonFunctions.readJsonFile("existedEmail"));
        await expect(this.invalidFeedbackPassword).toHaveText(commonFunctions.readJsonFile('invalidPass_2'));
    }

    async registerSuccess(){
        await this.fillData();
        const randomEmail = `${commonFunctions.generateRandomString(3)}@yopmail.com`;
        const randomPass = commonFunctions.generateRandomNumber(8);
        await this.inputEmail.fill(randomEmail);
        await this.inputPassword.fill(randomPass);
        await this.inputPasswordConfirm.fill(randomPass);
        await this.inputPhoneNumber.fill(`8${randomPass}`);
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await this.btnCreateAccount.click();
        await this.titleAccount.waitFor();
        await expect(this.titleAccount).toContainText("Welcome");
        // const random = commonFunctions.generateRandomString(3)
        // commonFunctions.writeJsonFile(`email_${random}`, randomEmail);
        // commonFunctions.writeJsonFile(`password_${random}`, randomPass);
        const data = {
            email: randomEmail,
            password: randomPass,
        };
        commonFunctions.updateJsonFile(data);
        await this.btnLogOut.click();
    }
}

module.exports = {RegisterPage}
