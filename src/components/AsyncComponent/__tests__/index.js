import React from 'react';
import { mount } from 'enzyme';
import asyncComponent from '..';

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
jest.useFakeTimers();

describe('AsyncComponent component', () => {
  const testComponent = () => (
    <div>Loaded</div>
  );

  const componentLoader = () => Promise.resolve(testComponent);

  it('async load component', (done) => {
    const Component = asyncComponent(componentLoader);
    const componentDidMount = jest.spyOn(Component.prototype, 'componentDidMount');
    const wrapper = mount(<Component />);

    expect(componentDidMount).toHaveBeenCalled();
    expect(wrapper.find('.loader')).toHaveLength(1);

    jest.runAllTimers();
    // jest.runOnlyPendingTimers();
    Promise.resolve().then(() => {
      wrapper.update();
      expect(wrapper.text()).toEqual('Loaded');
      done();
    });
  });
});
