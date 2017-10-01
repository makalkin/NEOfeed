import { RouterGenerator } from '..';

describe('RouterGenerator service', () => {
  it('should create with basename "/"', () => {
    const generator = new RouterGenerator();
    expect(generator.basename).toEqual('/');
  });

  it('should create with preset basename', () => {
    const generator = new RouterGenerator('/tests');
    expect(generator.basename).toEqual('/tests');
  });

  it('should add route', () => {
    const generator = new RouterGenerator('/tests');
    generator.addRoute('/', null);
    expect(generator.getRoutes()).toEqual([
      {
        path: '/tests/',
        component: null,
        exact: false,
      },
    ]);
  });
});
