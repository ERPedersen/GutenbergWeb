import {browser, element, by, protractor} from 'protractor';
import {GutenbergWebPage} from './app.po';

describe('GutenbergWeb App', () => {
  let page: GutenbergWebPage;

  beforeEach(() => {
    page = new GutenbergWebPage();
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

    expect(page.getChildElements(element,'location').count()).toBeGreaterThan(50);

  });

  it('should say "Showing authors matching John K" when searching for author "John K"', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 1);
    page.writeInput(element(by.id('sidebar-search-query')), 'John K');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(element(by.className('descriptor')).getText()).toContain('Showing authors matching John K');

  });

  it('should say "No authors found matching Amin Jensen" when searching for author "Amin Jensen"', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 1);
    page.writeInput(element(by.id('sidebar-search-query')), 'Amin Jensen');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(element(by.className('descriptor')).getText()).toContain('No authors found matching Amin Jensen');

  });

  it('should provide a link to the book file for "Among Famous Books" when clicking the author John Kelman', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 1);
    page.writeInput(element(by.id('sidebar-search-query')), 'John Kelman');
    page.clickElement(element(by.id('sidebar-search-button')));

    page.clickElement(element(by.cssContainingText('.title', 'John Kelman')));

    expect(page.getElementByText(element,'title','Among Famous Books')).toBeDefined();
    expect(element(by.className('btn btn-primary btn-download')).getAttribute('href')).toBeDefined();
    expect(element(by.className('btn btn-primary btn-download')).getAttribute('href')).toBe('http://cdn.zesty.emilrosenius.dk/18104.txt');

  });


});
