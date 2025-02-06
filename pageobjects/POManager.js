import { SignInPage } from "../pageobjects/SignInPage";
import { RegisterPage } from "../pageobjects/RegisterPage";
import { ProductDetailPage } from "../pageobjects/ProductDetailPage";
import { CartPage } from "../pageobjects/CartPage";
class POManager {
  constructor(page) {
    this.page = page;
    this.signInPage = new SignInPage(this.page);
    this.registerPage = new RegisterPage(this.page);
    this.productDetailPage = new ProductDetailPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getSignInPage() {
    return this.signInPage;
  }

  getRegisterPage() {
    return this.registerPage;
  }

  getProductDetailPage() {
    return this.productDetailPage;
  }
  
  getCartPage() {
    return this.cartPage;
  }
}

module.exports = { POManager };
