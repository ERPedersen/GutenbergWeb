import {browser, element, by, protractor} from 'protractor';
import {GutenbergWebPage} from './app.po';

describe('GutenbergWeb Cities', () => {
  let page: GutenbergWebPage;

  beforeEach(() => {
    page = new GutenbergWebPage();
  });


  it('should say "No cities found matching Jonestown" when searching for the city "Jonestown".', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 3);
    page.writeInput(element(by.id('sidebar-search-query')), 'Jonestown');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(element(by.className('descriptor')).getText()).toContain('No cities found matching Jonestown');

  });

  it('should retrieve four different cities when search for "Chica" in the search field.', () => {
    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 3);
    page.writeInput(element(by.id('sidebar-search-query')), 'Chica');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(page.getChildElements(element,'search-result').count()).toBe(4);
  });

  it('should retrieve two different books when choosing to find books mentioning the city Chicaole.', () => {
    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 3);
    page.writeInput(element(by.id('sidebar-search-query')), 'Chica');
    page.clickElement(element(by.id('sidebar-search-button')));

    page.clickElement(element(by.cssContainingText('.title', 'Chicacole')));

    expect(page.getChildElements(element,'book').count()).toBe(2);

  });

  it('should show a next list of cities when choosing a book mentioning a city chosen from the initial search.', () => {
    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 3);
    page.writeInput(element(by.id('sidebar-search-query')), 'Chica');
    page.clickElement(element(by.id('sidebar-search-button')));

    page.clickElement(element(by.cssContainingText('.title', 'Chicacole')));

    expect(page.getChildElements(element,'book').count()).toBe(2);

    page.clickElement(element(by.cssContainingText('.book-heading', 'Man and His Migrations')));

    expect(page.getChildElements(element,'results').count()).toBeGreaterThan(0);
  });


});
