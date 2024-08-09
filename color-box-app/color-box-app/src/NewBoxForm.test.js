import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

it('renders without crashing', () => {
  render(<NewBoxForm addBox={() => {}} />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<NewBoxForm addBox={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

it('can submit a new box', () => {
  const addBox = jest.fn();
  const { getByLabelText, getByText } = render(<NewBoxForm addBox={addBox} />);

  fireEvent.change(getByLabelText('Width:'), { target: { value: '100' } });
  fireEvent.change(getByLabelText('Height:'), { target: { value: '100' } });
  fireEvent.change(getByLabelText('Background Color:'), { target: { value: 'red' } });

  fireEvent.click(getByText('Add Box'));

  expect(addBox).toHaveBeenCalledWith({
    width: '100',
    height: '100',
    backgroundColor: 'red',
    id: expect.any(String)
  });

  expect(getByLabelText('Width:').value).toBe('');
  expect(getByLabelText('Height:').value).toBe('');
  expect(getByLabelText('Background Color:').value).toBe('');
});