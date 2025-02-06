import {test, expect} from '@playwright/test';
import commonFunctions from '../utils/commonFunctions';
import { fstat } from 'fs';


class SignInPage {
    constructor(page) {
        this.page = page; 
        this.url = commonFunctions.readJsonFile('url')
        this.writeEmail = commonFunctions.readJsonFile("email");
        this.writePassword = commonFunctions.readJsonFile("password");
        this.writeAlertSignIn = commonFunctions.readJsonFile('alertSignIn')
        this.iconSignIn = page.locator(`//div[@class='user-login t']`);
        this.inputEmail = page.locator(`//input[@id='login-form-email']`);
        this.inputPassword = page.locator(`//input[@id='login-form-password']`);
        this.activeSlideBar = page.locator(`//nav[@id="right-sidebar" and contains(@class,'active')]`);
        this.showSlideBar = this.activeSlideBar.locator(`//div[@class="sidebar-content"]`);
        this.btnSignIn = this.activeSlideBar.locator(`//button[contains(@class,'btn-signin')]`);
        this.titleAccount = this.activeSlideBar.locator(`//div[contains(@class,'title-contain')]//span`);
        this.btnClose = this.activeSlideBar.locator(`//div[@class="sidebar-dismiss"]`);
        this.eyeHidden = this.activeSlideBar.locator(`//span[@aria-label='login-form-password']`)
        this.textPass = this.activeSlideBar.locator(`//input[@id="login-form-password" and contains(@type,'text')]`)
        this.invalidFeedbackEmail = this.inputEmail.locator(`..`).locator(`//div[@class="invalid-feedback"]`)
        this.invalidFeedbackPassword = this.inputPassword.locator(`..`).locator(`//div[@class="invalid-feedback"]`)
        this.alertSignIn = this.activeSlideBar.locator(`//div[@class="alert alert-danger"]`);
        this.btnLogOut = this.activeSlideBar.locator(`//div[@class='logout']`);
        this.iconAccount = page.locator(`//div[@class="user-account"]`);
        this.forgotPassword = page.locator(`//a[contains(@class,'forgot-password')]`);
        this.inputResetPass = page.locator(`//input[@id='reset-password-email']`);
        this.btnResetPass = page.locator(`//button[@id='submitEmailButton']`);
        this.alertResetPass = this.inputResetPass.locator(`..`).locator(`//div[@class="invalid-feedback"]`)
        this.backToLogin = this.page.locator(`//div[@class="return-login"]`);
    }

    async showSlidebarSignIn(){
        // await this.page.goto(this.url);
        await this.iconSignIn.click();
        await expect(this.showSlideBar).toBeVisible();
    }
    async signInSuccess() {
        await this.showSlidebarSignIn();
        await this.inputEmail.fill(this.writeEmail);
        await this.inputPassword.fill(this.writePassword);
        await this.eyeHidden.click();
        await expect(this.eyeHidden).toBeVisible();
        await this.btnSignIn.click();
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await expect(this.titleAccount).toContainText("Welcome");
        await this.btnClose.click();
    }

    async signInFail(){
        await this.showSlidebarSignIn();
        await this.btnSignIn.click();
        await expect(this.invalidFeedbackEmail).toHaveText(commonFunctions.readJsonFile("notfillEmail"));
        await expect(this.invalidFeedbackPassword).toHaveText(commonFunctions.readJsonFile("notfillPassword"));
        
        await this.inputEmail.fill(this.writeEmail);
        await this.inputPassword.fill(commonFunctions.generateRandomString(8));
        await this.btnSignIn.click();
        await expect(this.alertSignIn).toHaveText(this.writeAlertSignIn)

        await this.inputEmail.fill(commonFunctions.generateRandomString(10));
        await this.btnSignIn.click();
        await expect(this.invalidFeedbackEmail).toHaveText(commonFunctions.readJsonFile("invalidEmail"))
    }

    async signOut(){
        await this.signInSuccess();
        await this.page.click(`//a[@id='travel']`);
        // await this.membershipPage.click();
        await this.iconAccount.click()
        await this.btnLogOut.click();
        await expect(this.page).toHaveURL(/.*home/)
    }

    async resetPassword(){
        await this.showSlidebarSignIn();
        await this.forgotPassword.click();
        await this.inputResetPass.fill(commonFunctions.generateRandomString(8));
        await this.btnResetPass.click();
        await expect(this.alertResetPass).toHaveText(commonFunctions.readJsonFile("invalidEmail"));
        
        await this.inputResetPass.fill(`abc@yopmail.com`);
        await this.btnResetPass.click();
        await expect(this.btnResetPass).not.toBeVisible();
        await this.backToLogin.click();
    }
}
module.exports = {SignInPage}