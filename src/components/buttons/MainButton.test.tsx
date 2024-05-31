import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MainButton from './MainButton';
import { expect,  test } from 'vitest';

test('renders button with correct text', () => {
  const buttonText = 'Click me!';
  const { getByText } = render(<MainButton text={buttonText} onClick={() => {}} />);
  const buttonElement = getByText(buttonText);
  expect(buttonElement).toBeInTheDocument();
});


test('button is disabled when disabled prop is true', () => {
  const { getByText } = render(<MainButton text="Click me!" disabled onClick={() => {}} />);
  const buttonElement = getByText('Click me!');
  expect(buttonElement).toBeDisabled();
});
