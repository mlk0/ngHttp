import { DemoHttpPage } from './app.po';

describe('demo-http App', function() {
  let page: DemoHttpPage;

  beforeEach(() => {
    page = new DemoHttpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
