import { Ng2MdArcgisCliPage } from './app.po';

describe('ng2-md-arcgis-cli App', () => {
  let page: Ng2MdArcgisCliPage;

  beforeEach(() => {
    page = new Ng2MdArcgisCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
