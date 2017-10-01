/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';

import { storiesOf } from '@storybook/react';

import Loader from '../Loader';

storiesOf('Loader', module)
  .add('', () => <Loader />);
