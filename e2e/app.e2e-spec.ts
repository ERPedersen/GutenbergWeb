import { GutenbergWebPage } from './app.po';

describe('gutenberg-web App', () => {
  let page: GutenbergWebPage;

  beforeEach(() => {
    page = new GutenbergWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
