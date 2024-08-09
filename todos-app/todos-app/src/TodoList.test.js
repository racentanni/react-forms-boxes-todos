import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('renders without crashing', () => {
  render(<TodoList />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

test('can add a new todo', () => {
  const { getByPlaceholderText, getByText } = render(<TodoList />);
  const input = getByPlaceholderText('New Todo');
  const button = getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'Test Todo' } });
  fireEvent.click(button);

  expect(getByText('Test Todo')).toBeInTheDocument();
});

test('can remove a todo', () => {
  const { getByPlaceholderText, getByText, queryByText, getByLabelText } = render(<TodoList />);
  const input = getByPlaceholderText('New Todo');
  const button = getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'Test Todo' } });
  fireEvent.click(button);

  // Assuming each todo item has a label with the text of the todo
  const removeButton = getByLabelText('Remove Test Todo');
  fireEvent.click(removeButton);

  expect(queryByText('Test Todo')).not.toBeInTheDocument();
});