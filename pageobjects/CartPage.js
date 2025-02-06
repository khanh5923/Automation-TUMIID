import {expect} from "@playwright/test";
import commonFunction from "../utils/commonFunctions";

class CartPage {
  constructor(page) {
    this.page = page;
    this.iconMiniCart = page.locator(`//div[contains(@class,'mini-cart')]`);
    this.titleCart = page.locator(`//div[contains(@class,"cart-infos")]//div[contains(@class,"cart-head")]`);
    this.messageCart = page.locator(`//div[contains(@class,"cart-infos")]//h2[@class="empty-cart-message"]`);
    this.btnCheckout = page.locator(`//div[contains(@class,"checkout-continue")]//button[not(contains(@class,"disable"))]`);
    this.btnContinueShopping = page.locator(`//a[contains(@class,"return-home")]`);
    this.btnAddToCart = page.locator(`//div[contains(@class,"product-detail-section")]//button[contains(@class,"add-to-cart")]`);
    this.numberProduct = page.locator(`//div[contains(@class,'product-info')]`);
    this.rightSlidebar = page.locator(`//nav[@id="right-sidebar" and @class="active"]//div[@class="sidebar-content"]`); // minicart, tumi plus, gift option, tumi symbol, sign in/up
// In Mini Cart
    this.btnCloseCart = this.rightSlidebar.locator(`//button[@class="sidebar-dismiss-btn"]`);
    this.btnViewCart = this.rightSlidebar.locator(`//a[contains(@class,"cart-show-btn")]`);
// login slidebar
    this.btnCheckoutWithGuess = this.rightSlidebar.locator(`//a[contains(@class,"guest-checkout")]`);
    this.inputEmail = this.rightSlidebar.locator(`//input[@id='login-form-email']`);
    this.inputPassword = this.rightSlidebar.locator(`//input[@id='login-form-password']`);
    this.btnSignIn = this.rightSlidebar.locator(`//button[contains(@class,'btn-signin')]`);
// product in cart page
    this.productFirst = page.locator(`//div[contains(@class,'product-info')]`).first();
    this.iconRemoveProduct = this.productFirst.locator(`//button[contains(@class,"remove-product")]`);
    this.editProduct = this.productFirst.locator(`//a[@class="edit"]`);
    this.btnSaveForLater = this.productFirst.locator(`//div[contains(@class,"btn-saveforlater")]//button`);
    this.colorProduct = this.productFirst.locator(`//span[contains(@class,"color-description")]`);
    this.productCollection = this.productFirst.locator(`//p[contains(@class,"collection-name")]//a`);
    this.productName = this.productFirst.locator(`//p[contains(@class,"product-name")]//a`);
    this.imgProduct = this.productFirst.locator(`//img[@class="product-image"]`);
    this.productLast = page.locator(`//div[contains(@class,'product-info')]`).last();
    this.productCollectionLast = this.productLast.locator(`//p[contains(@class,"collection-name")]`);
    this.productNameLast = this.productLast.locator(`//p[contains(@class,"product-name")]`);
    // remove
    this.removeProductModal = page.locator(`//div[@id="removeProductModal" and contains(@class,"show")]//div[@class="modal-content"]`);
    this.btnDeleteProduct = this.removeProductModal.locator(`//button[@id="cart-delete-confirmation-btn"]`);
    this.btnCancelDelete = this.removeProductModal.locator(`//button[contains(@class,"cart-cancel-delete-btn")]`);
    // edit
    this.editProductModa = page.locator(`//div[@id="editProductModal" and contains(@class,"show")]//div[@class="modal-content"]`);
    this.iconCloseEdit = this.editProductModa.locator(`//div[@class="modal-close"]//button[@class="close pull-right"]`);
    this.colorDescription = this.editProductModa.locator(`//span[contains(@class,"color-description")]`);
    this.colorNotSelect = this.editProductModa.locator(`//div[@class="color-swatchs"]//div[contains(@class,"attr-item watch-item") and not(contains(@class,"selected"))]`).first().locator(`//a`);
    this.btnPlus = this.editProductModa.locator(`//div[contains(@class,"plus")]//button[@class="hollow circle"]`);
    this.btnUpdateCart = this.editProductModa.locator(`//p[@class="available"]/parent::button[contains(@class,"update-cart-product-global")]`);
    this.inputQnt = this.editProductModa.locator(`//input[@id="quantity"]`);
    // Tumi plus
    this.tumiPlusSlidebarActive = page.locator(`//nav[@class="sidebar-tumi-plus active"]`);
    this.addTumiPlus = page.locator(`//a[contains(@class,'tumi-plus-popup-link')]//span[contains(@class,'tumi-plus-info')]`);
    this.accessoryFrist = this.tumiPlusSlidebarActive.locator(`//div[@class="tumi-plus-step-additional-items"]//li`).first();
    this.btnApplyAccessory = this.tumiPlusSlidebarActive.locator(`//input[@id="btn-apply-engraving"]`);
    this.removeTumiPlus = page.locator(`//div[contains(@class,"tumi-plus-info")]//a[@class='tumi-plus-remove']`);
    // Monogram
    this.monogramSection = page.locator(`//div[contains(@class,'monogram-section') and not(contains(@class,"d-none"))]`);
    this.addMonogram = this.monogramSection.locator(`//a[contains(@class,'monogramming-popup-link')]`);
    this.monogramTitle = this.monogramSection.locator(`//span[contains(@class,'text-left')]`);
    this.monogramColorName = this.monogramSection.locator(`//span[@class='colorname']`);
    this.monogramPlacement = this.monogramSection.locator(`//span[@class="placement"]`);
    this.monogramSlidebarActive = page.locator(`//nav[contains(@class,"sidebar-monogram active")]`);
    this.iconSymbol = this.monogramSlidebarActive.locator(`//a[contains(@data-value,"1")]`);
    this.btnNextStep = this.monogramSlidebarActive.locator(`//button[contains(@class,"btn-mono-next")]`);
    this.checkboxColorIcon = this.monogramSlidebarActive.locator(`//input[@value="FF671F" and @data-name="orange"]/following-sibling::label`);
    this.checkboxPlacement = this.monogramSlidebarActive.locator(`//input[@id="classic-both"]/following-sibling::label`);
    this.btnApplyMonogram = this.monogramSlidebarActive.locator(`//button[contains(@class,"btn btn-mono-apply")]`);
    this.numberIcon = page.locator(`//span[@class="monogram-text-preview"]//span[contains(@class,"has-symbol")]`);
    // gift option
    this.giftBoxSection = page.locator(`//div[contains(@class,"gift-box-section") and not(contains(@class,"d-none"))]`);
    this.addGift = this.giftBoxSection.locator(`//a[contains(@class,"add-gift-link")]`);
    this.titleGiftBox = this.giftBoxSection.locator(`//p[contains(@class,"description")]`).first();
    this.titleGiftMess = this.giftBoxSection.locator(`//p[contains(@class,"description")]`).last();
    this.btnRemoveGiftBox = this.giftBoxSection.locator(`//a[contains(@class,"remove")]`);
    this.giftBoxSlibarActive = page.locator(`//nav[contains(@class,"sidebar-gift-box active")]`);
    this.checkGiftCard = this.giftBoxSlibarActive.locator(`//input[@id="gift-card"]/following-sibling::label`);
    this.inputGiftCardRecipientName = this.giftBoxSlibarActive.locator(`//input[@id="giftCardRecipientName"]`)
    this.inputGiftCardSenderName = this.giftBoxSlibarActive.locator(`//input[@id="giftCardSenderName"]`);
    this.inputGiftCardMessage = this.giftBoxSlibarActive.locator(`//textarea[@id="giftCardMessage"]`);
    this.checkGiftBox = this.giftBoxSlibarActive.locator(`//input[@id="giftBox"]/following-sibling::label`);
    this.btnApplyGift = this.giftBoxSlibarActive.locator(`//button[contains(@class,"gift-box-button-apply")]`);
    // product recommendation
    this.productListingActive = page.locator(`//div[@class="product-listing"]//div[contains(@class,"swiper-slide-active")]`);
    this.productListingCollection = this.productListingActive.locator(`//div[@class="product-collection"]`);
    this.productListingName = this.productListingActive.locator(`//div[@class="pdp-link"]`);
    this.productListingPrice =  this.productListingActive.locator(`//span[@class="sales"]//span`);
    this.btnAddToCartListing = this.productListingActive.locator(`//button[contains(@class,"add-to-cart")]`);
  }

  async signInSuccess() {
    await this.inputEmail.fill(commonFunction.readJsonFile("email"));
    await this.inputPassword.fill(commonFunction.readJsonFile("password"));
    await this.btnSignIn.click();
    this.page.on('dialog', async dialog => {
        await dialog.accept();
    });
    const isVisible = await this.btnCloseCart.isVisible();
    if(isVisible){
      await this.btnCloseCart.click();
    }
  }

  async emptyCart() {
    await this.iconMiniCart.click();
    await this.page.waitForTimeout(100);
    await expect(this.titleCart).toHaveText(commonFunction.readJsonFile("titleEmptyCart"));
    await expect(this.messageCart).toHaveText(commonFunction.readJsonFile("msgEmptyCart"));
    await expect(this.btnCheckout).not.toBeVisible();
    await this.btnContinueShopping.click();
    await this.page.goBack();
  }

  async addToCart(quantity){
    for(let i = 1; i <= quantity; i++){
      await this.btnAddToCart.click();
      if( i < quantity){
        await this.page.waitForTimeout(10);
        await this.btnCloseCart.click();
      }else{
        await expect(this.btnViewCart).toContainText(`${quantity}`);
        await this.btnViewCart.click();
      }
    }
  }
  async goCheckoutWithGuess(quantity) {
    await this.addToCart(quantity);
    // await this.titleCart.waitFor({state: "visible", timeout : 1000});
    await expect(this.titleCart).toContainText(`${quantity}`);
    await this.btnCheckout.click();
    await expect(this.rightSlidebar).toBeVisible();
    await this.btnCheckoutWithGuess.click();
    await expect(this.page).toHaveURL(/.*checkout/);
    await this.page.goBack();
    await this.page.waitForTimeout(100);
  }

  async deleteCart(numberDel) {
    await this.iconRemoveProduct.click();
    await expect(this.removeProductModal).toBeVisible();
    await this.btnCancelDelete.click();
    for(let i = 0; i < numberDel; i++){
      await this.iconRemoveProduct.click();
      await this.btnDeleteProduct.click();
      await this.page.waitForTimeout(10);
    }
    const qntProductAfter = await this.numberProduct.count();
    await expect(this.titleCart).toContainText(`${qntProductAfter}`);
  }
  
  async updateCart(qnt){
    await this.page.locator(`//div[@class='cart-head']`).scrollIntoViewIfNeeded();
    const qntProductBefore = await this.numberProduct.count();
    await this.editProduct.click();
    await this.iconCloseEdit.click();
    await this.editProduct.click();
    const codeProductSelected = await this.colorNotSelect.locator(`//span`).getAttribute("data-attr-value");
    const colorDes = await this.colorNotSelect.getAttribute("data-color-name");
    await this.colorNotSelect.click();
    await expect(this.colorDescription).toHaveText(colorDes);
    await this.btnUpdateCart.click();
    await this.page.reload();
    const imgProductAfter = await this.imgProduct.getAttribute("src");
    expect(imgProductAfter.includes(codeProductSelected)).toBeTruthy(); 
    await expect(this.colorProduct).toHaveText(colorDes);
    await expect(this.titleCart).toContainText(`${qntProductBefore}`);
    await this.editProduct.click();
    // await this.btnPlus.click();
    await this.inputQnt.fill(`${qnt}`);
    await this.btnUpdateCart.click();
    const qntProductAfter = await this.numberProduct.count();
    await expect(this.titleCart).toContainText(`${qntProductAfter}`);
  }

  async saveForLater(){
    await this.page.waitForTimeout(10);
    const qntProductBefore = await this.numberProduct.count();
    await this.btnSaveForLater.click();
    await this.signInSuccess();
    await this.page.waitForTimeout(10);
    await this.btnSaveForLater.click();
    await this.page.waitForTimeout(10);
    const qntProductAfter = await this.numberProduct.count();
    expect(qntProductAfter).toBeLessThan(qntProductBefore);
  }

  async tumiPlus(){
    await expect(this.removeTumiPlus).not.toBeVisible();
    await this.addTumiPlus.click();
    await this.accessoryFrist.click();
    await this.btnApplyAccessory.click();
    await this.page.waitForTimeout(100)
    await expect(this.removeTumiPlus).toBeVisible();
  }
  
  async monogramSymbol(){
    await this.addMonogram.click();
    const valueIcon = await this.iconSymbol.getAttribute('data-value');
    await this.iconSymbol.click();
    await this.btnNextStep.click();
    await this.checkboxColorIcon.click();
    await this.btnNextStep.click();
    await this.checkboxPlacement.click();
    await this.btnApplyMonogram.click();
    await this.page.reload();
    expect(await this.numberIcon.count()).toBe(1);
    await expect(this.numberIcon).toContainText(valueIcon);
    await expect(this.monogramTitle).toHaveText(`Monogram Added`);
    await expect(this.monogramColorName).toContainText(commonFunction.readJsonFile('colorMonogram'));
    await expect(this.monogramPlacement).toContainText(commonFunction.readJsonFile('placementMonogram'));
  }
  
  async giftOption(){
    await this.addGift.click();
    await this.checkGiftCard.check();
    const randomString = commonFunction.generateRandomString(6);
    await this.inputGiftCardRecipientName.fill(randomString);
    await this.inputGiftCardSenderName.fill(randomString);
    await this.inputGiftCardMessage.fill(randomString);
    await this.checkGiftBox.check();
    await this.btnApplyGift.click();
    await expect(this.titleGiftBox).toHaveText(commonFunction.readJsonFile('titleGiftBox'));
    await expect(this.titleGiftMess).toHaveText(commonFunction.readJsonFile('titleGiftMess'));
  }

  async checkProductInformation(){
    const collectionProductCart = await this.productCollection.textContent();
    const nameProductCart = await this.productName.textContent();
    await this.productCollection.click();
    await this.page.waitForTimeout(100);
    const collectionPage = await this.page.locator(`//h1[@class='category-title']`).textContent();
    expect(commonFunction.comparisionString(collectionPage,collectionProductCart)).toBeTruthy();
    await this.page.goBack();
    await this.productName.click();
    await this.page.waitForTimeout(100);
    const namePDP = await this.page.locator(`//h1[@class='product-name']`).textContent();
    expect(commonFunction.comparisionString(nameProductCart,namePDP)).toBeTruthy();
    await this.page.goBack();
    await this.imgProduct.click();
    expect(commonFunction.comparisionString(nameProductCart,namePDP)).toBeTruthy();
    await this.page.goBack();
    // await this.checkProductAddons();
  }

  async checkProductAddons(){
    await this.tumiPlus();
    await this.monogramSymbol();
    await this.giftOption();
  }

  async productRecommendation(){
    await this.page.waitForTimeout(10);
    const numberProductBefore = await this.numberProduct.count();
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.btnAddToCartListing.click();
    await this.page.waitForTimeout(500);
    const numberProductAfter = await this.numberProduct.count();
    expect(numberProductBefore).toBeLessThan(numberProductAfter);
    await expect(this.titleCart).toContainText(`${numberProductAfter}`);
    const nameProductRecommendation = await this.productListingName.textContent();
    const collectionProductRecommendation = await this.productListingCollection.textContent();
    await expect(this.productCollectionLast).toHaveText(collectionProductRecommendation);
    await expect(this.productNameLast).toHaveText(nameProductRecommendation);
  }
}

module.exports = { CartPage };
