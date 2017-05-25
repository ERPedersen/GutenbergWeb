import {browser, element, by, protractor} from 'protractor';
import {GutenbergWebPage} from './app.po';

describe('GutenbergWeb App', () => {
  let page: GutenbergWebPage;

  beforeEach(() => {
    page = new GutenbergWebPage();
  });

  it('should add error classes to form fields when they are empty and the form is submitted', () => {
    page.navigateToHome();

    element(by.id('sidebar-search-button')).click();
    expect(page.hasClass(element(by.id('sidebar-search-type-group')), 'has-error')).toBe(true);
    expect(page.hasClass(element(by.id('sidebar-search-query-group')), 'has-error')).toBe(true);
  });

  it('should remove error classes from form fields when the input is valid', () => {
    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 2);
    page.writeInput(element(by.id('sidebar-search-query')), 'test');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(page.hasClass(element(by.id('sidebar-search-type-group')), 'has-error')).toBe(false);
    expect(page.hasClass(element(by.id('sidebar-search-query-group')), 'has-error')).toBe(false);
  });


});
