import React from 'react';
import HomeScreen from '../src/Home';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<HomeScreen/>).toJSON();
  expect(rendered).toBeTruthy();
});
