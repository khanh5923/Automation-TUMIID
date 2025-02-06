import { expect } from "@playwright/test";
import commonFunction from "../utils/commonFunctions";

class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.writeEmail = commonFunction.readJsonFile("email");
    this.writePassword = commonFunction.readJsonFile("password");
// product information
    this.linkPDP = commonFunction.readJsonFile("PDP");
    this.productInformation = page.locator(`//div[@id="product-informations-header"]`);
    this.productCollection = this.productInformation.locator(`//p[@class="product-collection"]`);
    this.productName = this.productInformation.locator(`//h1[@class="product-name"]`);
    this.productPrice = this.productInformation.locator(`//span[@class="sales"]//span`);
// image product
    this.btnViewMore = page.locator(`//div[@class="view-more"]`);
    this.btnShowLess = page.locator(`//div[@class='show-less']`);
    this.btnView3D = page.locator(`//div[@class="frame-3dar-open-section"]`);
    this.iframe3DSection = page.locator(`//div[@class="iframe-view-3dar-section"]`);
    this.stickyBarSection = page.locator(`//div[@class="product-sticky-bar fixed-bottom"]`);
    this.tabFeatures = page.locator(`//a[normalize-space()='Features' and contains(@class,"nav-link")]`);
    this.wrapperShowAll = page.locator(`//div[contains(@id,"swiper-wrapper") and contains(@class, "show-all") and contains(@aria-live,"polite")]`);
// recommendation
    this.productListingActive = page.locator(`//div[@class="product-listing"]//div[contains(@class,"swiper-slide-active")]`);
    this.productListingCollection = this.productListingActive.locator(`//div[@class="product-collection"]`);
    this.productListingName = this.productListingActive.locator(`//div[@class="pdp-link"]`);
    this.productListingPrice =  this.productListingActive.locator(`//span[@class="sales"]//span`);
    this.btnAddToCartListing = this.productListingActive.locator(`//button[contains(@class,"add-to-cart")]`);
    this.btnNext = page.locator(`//div[@class="product-listing"]//div[@class="swiper-btn-next"]`);
// product in cart
    this.productInCart = page.locator(`//nav[@id="right-sidebar" and @class="active"]//div[@class="sidebar-content"]`);
    this.mainProductInCart = this.productInCart.locator(`//div[contains(@class,"recently-added-main-product")]`);
    this.productInCartName = this.mainProductInCart.locator(`//div[contains(@class,"product-name")]//span`);
    this.productInCartCollection = this.mainProductInCart.locator(`//div[contains(@class,"collection-name")]//span`);
    this.productInCartPrice = this.mainProductInCart.locator(`//span[contains(@class,"sales")]//span[@class="value"]`);
    this.btnViewCart = this.productInCart.locator(`//a[contains(@class,"cart-show-btn")]`);
    this.btnCloseCart = this.productInCart.locator(`//button[@class="sidebar-dismiss-btn"]`);
// Wishlist
    this.iconWishlistWithAccount = page.locator(`//button[contains(@class,'bookmarked')]`);
    this.iconWishlistWithOutAccount = page.locator(`//a[@class='bookmark go-to-wish-list sidebar sidebar-open-btn tooltip-explanations btn']`);
    this.iconWishlistSletected = page.locator(`//div[contains(@class,"bookmarked")]//button[not(contains(@class,"bookmarked"))]`);
    this.messageWishlist = page.locator(`//div[@class='wishlist-message']`);
    this.btnGoWishlist = this.messageWishlist.locator(`//a[@class='btn btn-go-wishlist']`);
    this.inputEmail = this.productInCart.locator(`//input[@id='login-form-email']`);
    this.inputPassword = this.productInCart.locator(`//input[@id='login-form-password']`);
    this.btnSignIn = this.productInCart.locator(`//button[contains(@class,'btn-signin')]`);
// tumi Plus
    this.addTumiPlus = page.locator(`//a[contains(@class,'row tumi-plus-popup-link')]//span[contains(@class,'addition-button')]`);
    this.removeTumiPlus = page.locator(`//div[@class="tumi-plus-content tumi-plus-edit"]//a[@class='tumi-plus-remove']`);
    this.editTumiPlus = page.locator(`//div[@class="tumi-plus-content tumi-plus-edit"]//a[@class='tumi-plus-popup-link']`);
    this.tumiPlusSlidebarActive = page.locator(`//nav[@class="sidebar-tumi-plus active"]`);
    this.accessoryFrist = this.tumiPlusSlidebarActive.locator(`//div[@class="tumi-plus-step-additional-items"]//li`).first();
    this.accessoryFristPrice = this.accessoryFrist.locator(`//span[@class="product-price"]`);
    this.accessoryFristName = this.accessoryFrist.locator(`//span`).last();
    this.btnApplyAccessory = this.tumiPlusSlidebarActive.locator(`//input[@id="btn-apply-engraving"]`);
    this.btnCloseTumiPlus = this.tumiPlusSlidebarActive.locator(`//div[@class="sidebar-dismiss"]//button`);
// Monogram
    this.addMonogram = page.locator(`//a[contains(@class,'row monogramming-popup-link')]//span[contains(@class,'addition-button')]`);
    this.monogramEdit = page.locator(`//div[contains(@class,"monogram-edit") and not(contains(@class,"d-none"))]`);
    this.monogramTitle = this.monogramEdit.locator(`//span[@class='info-title text-left']`);
    this.monogramColorName = this.monogramEdit.locator(`//span[@class='colorname']`);
    this.monogramPlacement = this.monogramEdit.locator(`//span[@class="placement"]`);
    this.btnRemoveMonogram = this.monogramEdit.locator(`//a[@class='monogramming-remove']`);
    this.monogramSlidebarActive = page.locator(`//nav[contains(@class,"sidebar-monogram active")]`);
    this.iconSymbol = this.monogramSlidebarActive.locator(`//a[contains(@data-value,"1")]`);
    this.btnNextStep = this.monogramSlidebarActive.locator(`//button[contains(@class,"btn-mono-next")]`);
    this.checkboxColorIcon = this.monogramSlidebarActive.locator(`//input[@value="FF671F" and @data-name="orange"]/following-sibling::label`);
    this.checkboxPlacement = this.monogramSlidebarActive.locator(`//input[@id="classic-both"]/following-sibling::label`);
    this.btnApplyMonogram = this.monogramSlidebarActive.locator(`//button[@class="btn btn-mono-apply"]`);
    this.numberIcon = page.locator(`//span[@class="monogram-text-preview"]//span[contains(@class,"has-symbol")]`);
// gift Option
    this.addGift = page.locator(`//a[contains(@class,'row link add-gift-link')]//span[contains(@class,'addition-button')]`);
    this.giftBoxSlibarActive = page.locator(`//nav[contains(@class,"sidebar-gift-box active")]`);
    this.checkGiftCard = this.giftBoxSlibarActive.locator(`//input[@id="gift-card"]/following-sibling::label`);
    this.inputGiftCardRecipientName = this.giftBoxSlibarActive.locator(`//input[@id="giftCardRecipientName"]`)
    this.inputGiftCardSenderName = this.giftBoxSlibarActive.locator(`//input[@id="giftCardSenderName"]`);
    this.inputGiftCardMessage = this.giftBoxSlibarActive.locator(`//textarea[@id="giftCardMessage"]`);
    this.checkGiftBox = this.giftBoxSlibarActive.locator(`//input[@id="giftBox"]/following-sibling::label`);
    this.btnApplyGift = this.giftBoxSlibarActive.locator(`//button[contains(@class,"gift-box-button-apply")]`);
    this.giftBoxEdit = page.locator(`//div[contains(@class,"gift-box-edit") and not(contains(@class,"d-none"))]`);
    this.titleGiftBox = this.giftBoxEdit.locator(`//span[contains(@class,"title-gift-box")]`);
    this.titleGiftMess = this.giftBoxEdit.locator(`//span[contains(@class,"title-gift-message")]`);
    this.btnRemoveGiftBox = this.giftBoxEdit.locator(`//a[contains(@class,"remove")]`);
// product in cart
    this.colorProduct = page.locator(`//a[@data-color-name='NAVY']//span[@class='color-value swatch-square swatch-value selectable']`);
    this.imgProducrInCart = this.productInCart.locator(`//img[@class='product-image']/parent::a[contains(@href,"${commonFunction.readJsonFile("idProductColorNavy")}")]`);
    this.btnAddToCart = page.locator(`//input[contains(@class,"add-to-cart-url")]/following-sibling::button`);
    this.iconSymbolInCart = this.mainProductInCart.locator(`//span[contains(@class,"has-symbol")]`);
    this.colorNameSymbolInCart = this.mainProductInCart.locator(`//span[contains(@class,"colorname")]`);
    this.placementSymbolInCart = this.mainProductInCart.locator(`//span[contains(@class,"placement")]`);
    this.giftInCart = this.mainProductInCart.locator(`//div[@class="addon-descs"]`);
    this.tumiAccessoryInCart = this.productInCart.locator(`//div[contains(@class,"minicart-line-item")]`).last();
    this.tumiAccessoryInCartName = this.tumiAccessoryInCart.locator(`//div[@class="line-item-name"]`);
    this.tumiAccessoryInCartPrice = this.tumiAccessoryInCart.locator(`//div[@class="price"]`);
  }

  async accessProduct() {
    await this.page.goto(this.linkPDP);
  }
  async checkImage() {
    await expect(this.stickyBarSection).not.toBeVisible();
    await this.tabFeatures.scrollIntoViewIfNeeded();
    await this.page.mouse.wheel(0, 100);
    await expect(this.stickyBarSection).toBeVisible();
    await this.btnViewMore.click();
    await expect(this.wrapperShowAll).toBeVisible();
    await this.btnShowLess.click();
    await expect(this.wrapperShowAll).not.toBeVisible();
    await this.btnView3D.click();
    await expect(this.iframe3DSection).toBeVisible();
  }

  async checkProductInCart(collection, name, price, qnt){
    await expect(this.productInCart).toBeVisible();
    await expect(this.productInCartCollection).toHaveText(collection)
    await expect(this.productInCartName).toHaveText(name)
    await expect(this.productInCartPrice).toHaveText(price)
    await expect(this.btnViewCart).toContainText(qnt);
  }

  async productRecommendation(){
    // await this.page.evaluate(() => {
    //   window.scrollTo(0, document.body.scrollHeight);
    // });
    await this.page.locator(`//h4[normalize-space()='You Might Also Like']`).scrollIntoViewIfNeeded();
    await expect(this.productListingActive).toBeVisible();
    // await this.btnNext.click();
    const nameCollection = await this.productListingCollection.textContent();
    const nameProduct = await this.productListingName.textContent();
    const priceProduct = await this.productListingPrice.textContent();
    await this.btnAddToCartListing.click();
    await this.checkProductInCart(nameCollection, nameProduct, priceProduct, `1`);
    await this.btnCloseCart.click();
    await this.page.reload();
    await this.productListingActive.click();
    await expect(this.productCollection).toHaveText(nameCollection);
    await expect(this.productName).toHaveText(nameProduct);
    await expect(this.productPrice).toHaveText(priceProduct);
    await this.page.goBack();
  }

  async signInSuccess() {
    await this.inputEmail.fill(this.writeEmail);
    await this.inputPassword.fill(this.writePassword);
    await this.btnSignIn.click();
    this.page.on('dialog', async dialog => {
        await dialog.accept();
    });
    // const isVisible = await this.btnCloseCart.isVisible();
    // if(isVisible){
    //   await this.btnCloseCart.click();
    // }
  }

  async addToWishlistWithAccount(){
    await this.iconWishlistSletected.click();
    await expect(this.iconWishlistWithAccount).toBeVisible();
    await expect(this.messageWishlist).toBeVisible();
    await this.btnGoWishlist.click();
    await expect(this.page).toHaveURL(/.*wishlist/);
    await this.page.goBack();
  }

  async addToWishlistWithOutAccount(){
    await this.iconWishlistWithOutAccount.click();
    await this.signInSuccess();
    await this.page.waitForTimeout(1000);
    await expect(this.iconWishlistWithAccount).toBeVisible();
    await this.iconWishlistWithAccount.click();
    await expect(this.iconWishlistWithAccount).not.toBeVisible();
    await this.addToWishlistWithAccount();
  }

  async tumiPlus(){
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
    expect(await this.numberIcon.count()).toBe(1);
    expect(await this.numberIcon.textContent()).toBe(valueIcon);
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

  async addProductToCart(){
    await this.colorProduct.click();
    await this.tumiPlus();
    await this.editTumiPlus.click();
    const tumiPlustName = await this.accessoryFristName.textContent();
    const tumiPlustPrice = await this.accessoryFristPrice.textContent();
    await this.btnCloseTumiPlus.click();
    await this.monogramSymbol();
    await this.giftOption();
    await this.btnAddToCart.click();
    await expect(this.productInCart).toBeVisible();
    const productCollection = await this.productCollection.textContent();
    const productName = await this.productName.textContent();
    const productPrice = await this.productPrice.textContent();
    await this.checkProductInCart(productCollection, productName, productPrice, `2`);
    await expect(this.imgProducrInCart).toBeVisible();
    await expect(this.colorNameSymbolInCart).toContainText(commonFunction.readJsonFile("colorMonogram"));
    await expect(this.placementSymbolInCart).toContainText(commonFunction.readJsonFile("placementMonogram"));
    await expect(this.giftInCart).toContainText(commonFunction.readJsonFile('titleGiftBox'));
    await expect(this.giftInCart).toContainText(commonFunction.readJsonFile('titleGiftMess'));
    await expect(this.tumiAccessoryInCartName).toHaveText(tumiPlustName);
    await expect(this.tumiAccessoryInCartPrice).toHaveText(tumiPlustPrice);
    await this.btnCloseCart.click();
  }
}

module.exports = { ProductDetailPage };
