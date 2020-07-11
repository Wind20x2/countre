import React from 'react';
import { render } from '@testing-library/react';
import { FrontPage } from './FrontPage';

test('renders learn react link', () => {
  const { getByText } = render(<FrontPage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
