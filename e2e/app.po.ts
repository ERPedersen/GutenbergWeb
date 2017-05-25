import {browser, element, by, protractor} from 'protractor';

export class GutenbergWebPage {
  navigateToHome() {
    return browser.get('/');
  }

  hasClass(element, cls) {
    return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  };

  selectDropdownItem(element, optionNum) {
    if (optionNum) {
      element.all(by.tagName('option'))
        .then(function (options) {
          options[optionNum].click();
        });
    }
  };

  writeInput(element, input) {
    element.clear().sendKeys(input);
  }

  clickElement(element) {
    element.click();
  }

  getChildElements(element, cls) {
    return element.all(by.className(cls));
  }

  getElementByText(element,cls,text) {
    return element(by.cssContainingText(cls, text));
  }


}
