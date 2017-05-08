import { browser, element, by } from 'protractor';

export class GutenbergWebPage {
  navigateToHome() {
    return browser.get('/');
  }

  getAppTitle() {
    return element(by.css('app-root .navbar-brand')).getText();
  }

  getPageTitle() {
    return element(by.css('app-root h1.page-title')).getText();
  }
}
