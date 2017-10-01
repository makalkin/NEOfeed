import { injectSagas } from '../index';

describe('Run effects', () => {
  it('run sagas', () => {
    const sagaMiddleware = {
      run: jest.fn(),
    };
    injectSagas(sagaMiddleware);
    expect(sagaMiddleware.run).toBeCalled();
  });
});
