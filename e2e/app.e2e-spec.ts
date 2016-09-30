import { RxTestPage } from './app.po';

describe('rx-test App', function() {
  let page: RxTestPage;

  beforeEach(() => {
    page = new RxTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
