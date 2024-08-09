import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

test('renders without crashing', () => {
  render(<NewTodoForm addTodo={() => {}} />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<NewTodoForm addTodo={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

test('calls addTodo on form submission', () => {
  const addTodo = jest.fn();
  const { getByPlaceholderText, getByText } = render(<NewTodoForm addTodo={addTodo} />);
  const input = getByPlaceholderText('New Todo');
  const button = getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'Test Todo' } });
  fireEvent.click(button);

  expect(addTodo).toHaveBeenCalledWith('Test Todo');
});