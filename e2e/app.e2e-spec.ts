import {GutenbergWebPage} from './app.po';

describe('gutenberg-web App', () => {
  let page: GutenbergWebPage;

  beforeEach(() => {
    page = new GutenbergWebPage();
  });

  it('should display the app title in the .navbar-brand', () => {
    page.navigateToHome();
    expect(page.getAppTitle()).toEqual('Gutenberg');
  });

  it('should display the title ´Home´ on ´/´', () => {
    page.navigateToHome();
    expect(page.getPageTitle()).toEqual('Home');
  });

});
