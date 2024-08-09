import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Box from './Box';

it('renders without crashing', () => {
  render(<Box id="1" width={100} height={100} backgroundColor="red" removeBox={() => {}} />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<Box id="1" width={100} height={100} backgroundColor="red" removeBox={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

it('calls removeBox on button click', () => {
  const removeBox = jest.fn();
  const { getByText } = render(<Box id="1" width={100} height={100} backgroundColor="red" removeBox={removeBox} />);
  fireEvent.click(getByText('X'));
  expect(removeBox).toHaveBeenCalledWith("1");
});