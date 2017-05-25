import {browser, element, by, protractor} from 'protractor';
import {GutenbergWebPage} from './app.po';

describe('GutenbergWeb Books', () => {
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

  it('should show 56 different locations when clicking on the book "Time Crime".', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 2);
    page.writeInput(element(by.id('sidebar-search-query')), 'Time');
    page.clickElement(element(by.id('sidebar-search-button')));

    page.clickElement(element(by.cssContainingText('.title', 'Time Crime')));

    expect(page.getChildElements(element,'location').count()).toBe(56);


  });

  it('should say "No books found matching This Is Not A Title" when searching for the title "This Is Not A Title".', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 2);
    page.writeInput(element(by.id('sidebar-search-query')), 'This Is Not A Title');
    page.clickElement(element(by.id('sidebar-search-button')));

    expect(element(by.className('descriptor')).getText()).toContain('No books found matching This Is Not A Title');

  });

  it('should show a list of 32 books when clicking the city Tipton', () => {

    page.navigateToHome();

    page.selectDropdownItem(element(by.id('sidebar-search-type')), 2);
    page.writeInput(element(by.id('sidebar-search-query')), 'Bull');
    page.clickElement(element(by.id('sidebar-search-button')));

    page.clickElement(element(by.cssContainingText('.title', 'Bulldog And Butterfly')));

    expect(page.getChildElements(element,'location').count()).toBeGreaterThan(10);

    page.clickElement(element(by.cssContainingText('.location-heading', 'Tipton')));

    expect(page.getChildElements(element,'book').count()).toBe(32);

  });

});
