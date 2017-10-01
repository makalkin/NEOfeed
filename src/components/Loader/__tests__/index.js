import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

import Loader from '../loader';
import LoaderStyled from '..';

describe('Loader component', () => {
  describe('snapshots', () => {
    describe('Loader snapshots', () => {
      it('render', () => {
        const component = renderer.create(
          <Loader />,
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('render with className', () => {
        const component = renderer.create(
          <Loader className="some-class" />,
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });
    });

    describe('LoaderStyled snapshots', () => {
      it('render', () => {
        const component = renderer.create(
          <LoaderStyled />,
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('render with props', () => {
        const component = renderer.create(
          <LoaderStyled bgColor="red" yPosition="10" size="50" />,
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('enzyme', () => {
    it('show loader', () => {
      const loader = shallow(
        <Loader />,
      );

      expect(loader.find('.loader')).toHaveLength(1);
    });

    it('show styled loader', () => {
      const loader = render(
        <LoaderStyled />,
      );

      expect(loader.find('.loader')).toHaveLength(1);
    });
  });
});
