import { LuncherPage } from './app.po';

describe('luncher App', () => {
  let page: LuncherPage;

  beforeEach(() => {
    page = new LuncherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
