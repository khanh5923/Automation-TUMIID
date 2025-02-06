import { test } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";
let poManager;
test.setTimeout(60000);
test("Sign In/ Up", async ({ page }) => {
  poManager = new POManager(page);
  const signInPage = poManager.getSignInPage();
  const registerPage = poManager.getRegisterPage();
  // await signInPage.signInFail();
  // await signInPage.signOut();
  // await signInPage.resetPassword();
  // await registerPage.registerFailWithoutFill();
  await registerPage.showSlidebarSignIn();
  // await registerPage.registerFailWithFill();
  // await registerPage.registerFailWithExisted();
  await registerPage.registerSuccess();
  await signInPage.signInSuccess();
});

test("Product Detail Page", async ({ page }) => {
  poManager = new POManager(page);
  const productDetailPage = poManager.getProductDetailPage();
  await productDetailPage.accessProduct();
  // await productDetailPage.checkImage();
  // await productDetailPage.productRecommendation();
  // await productDetailPage.addToWishlistWithOutAccount();
  // await productDetailPage.addProductToCart();
});

test.only("Cart Page", async ({ page }) => {
  poManager = new POManager(page);
  const productDetailPage = poManager.getProductDetailPage();
  const cartPage = poManager.getCartPage();
  await productDetailPage.accessProduct();
  await cartPage.addToCart(1);
  // await cartPage.emptyCart();
  // await cartPage.goCheckoutWithGuess(3);
  // await cartPage.deleteCart(1);
  // await cartPage.updateCart(3);
  // await cartPage.saveForLater();
  // await cartPage.productRecommendation();
  await cartPage.checkProductInformation();
  // await cartPage.checkProductAddons();
});
