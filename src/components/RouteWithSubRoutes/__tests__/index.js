import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import RouteWithSubRoutes from '..';

const testComponent = () => (<div />);

describe('RouteWithSubRoutes component', () => {
  describe('snapshots', () => {
    it('render', () => {
      const props = {
        path: '/',
        exact: true,
        component: testComponent,
      };
      const component = renderer.create(
        <MemoryRouter><RouteWithSubRoutes {...props} /></MemoryRouter>,
      );
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
