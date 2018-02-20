import { AngularBootstrap4BoilerplatePage } from './app.po';

describe('angular-bootstrap4-boilerplate App', () => {
  let page: AngularBootstrap4BoilerplatePage;

  beforeEach(() => {
    page = new AngularBootstrap4BoilerplatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
