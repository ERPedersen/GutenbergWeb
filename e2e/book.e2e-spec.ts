import {browser, element, by, protractor} from 'protractor';
import {GutenbergWebPage} from './app.po';

describe('GutenbergWeb App', () => {
  let page: GutenbergWebPage;

  beforeEach(() => {
    page = new GutenbergWebPage();
  });


  it('should retrieve three different books when search for "The Ram" in the search field.', () => {
    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 2);
    page.writeInput(element(by.id('sidebar-search-query')), 'The Ram');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(page.getChildElements(element,'search-result').count()).toBe(3);
  });

  it('should say "No books found matching This Is Not A Title" when searching for the title "This Is Not A Title".', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 2);
    page.writeInput(element(by.id('sidebar-search-query')), 'This Is Not A Title');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(element(by.className('descriptor')).getText()).toContain('No books found matching This Is Not A Title');

  })

});
