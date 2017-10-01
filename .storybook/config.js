import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../src/components/stories');
}

configure(loadStories, module);
