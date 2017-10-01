import { replaceRoute, ROUTING } from '../routing';

describe('Route actions', () => {
  it('should create an action to replace route', () => {
    const expectedAction = {
      type: ROUTING,
      payload: {
        method: 'replace',
        nextUrl: '/next-url',
      },
    };

    expect(replaceRoute('/next-url')).toEqual(expectedAction);
  });

  it('should create an action to add route', () => {
    const expectedAction = {
      type: ROUTING,
      payload: {
        method: 'add',
        nextUrl: '/next-url',
      },
    };

    expect(replaceRoute('/next-url', { method: 'add' })).toEqual(expectedAction);
  });
});
