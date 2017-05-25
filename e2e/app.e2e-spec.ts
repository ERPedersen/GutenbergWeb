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

  it('should retrieve three different books when search for "The Ram" in the search field.', () => {
    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 2);
    page.writeInput(element(by.id('sidebar-search-query')), 'The Ram');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(page.getChildElements(element,'search-result').count()).toBe(3);
  });

  it('should show a list of 13 authors when searching for author "John K"', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 1);
    page.writeInput(element(by.id('sidebar-search-query')), 'John K');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(page.getChildElements(element,'search-result').count()).toBe(13);

  });

  it('should show a list with one book called "Among Famous Books" when clicking author "John Kelman"', () => {
    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 1);
    page.writeInput(element(by.id('sidebar-search-query')), 'John Kelman');
    page.clickElement(element(by.id('sidebar-search-button')));

    page.clickElement(element(by.cssContainingText('.title', 'John Kelman')));

    expect(page.getElementByText(element,'title','Among Famous Books')).toBeDefined();

  });

  it('should show a list of over 50 locations when clicking the book "Among Famous Books"', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 1);
    page.writeInput(element(by.id('sidebar-search-query')), 'John Kelman');
    page.clickElement(element(by.id('sidebar-search-button')));

    page.clickElement(element(by.cssContainingText('.title', 'John Kelman')));
    page.clickElement(element(by.cssContainingText('.book', 'Among Famous Books')));

    console.log(page.getChildElements(element,'location').count())

    expect(page.getChildElements(element,'location').count()).toBeGreaterThan(50);

  });

});
