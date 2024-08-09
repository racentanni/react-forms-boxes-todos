import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

test('renders without crashing', () => {
  render(<Todo id={1} task="Test Todo" removeTodo={() => {}} updateTodo={() => {}} />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<Todo id={1} task="Test Todo" removeTodo={() => {}} updateTodo={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

test('calls removeTodo on button click', () => {
  const removeTodo = jest.fn();
  const { getByText } = render(<Todo id={1} task="Test Todo" removeTodo={removeTodo} updateTodo={() => {}} />);
  const button = getByText('X');

  fireEvent.click(button);

  expect(removeTodo).toHaveBeenCalledWith(1);
});

test('can edit a todo', () => {
  const updateTodo = jest.fn();
  const { getByText, getByDisplayValue, getByRole } = render(<Todo id={1} task="Test Todo" removeTodo={() => {}} updateTodo={updateTodo} />);
  const editButton = getByText('Edit');

  fireEvent.click(editButton);

  const input = getByDisplayValue('Test Todo');
  fireEvent.change(input, { target: { value: 'Updated Todo' } });

  const saveButton = getByRole('button', { name: /save/i });
  fireEvent.click(saveButton);

  expect(updateTodo).toHaveBeenCalledWith(1, 'Updated Todo');
});

test('can mark a todo as completed', () => {
  const { getByText, rerender } = render(<Todo id={1} task="Test Todo" removeTodo={() => {}} updateTodo={() => {}} />);
  const markButton = getByText('Mark as completed');

  fireEvent.click(markButton);

  // Re-render the component to reflect the state change
  rerender(<Todo id={1} task="Test Todo" removeTodo={() => {}} updateTodo={() => {}} />);

  expect(getByText('Unmark')).toBeInTheDocument();
  expect(getByText('Test Todo')).toHaveStyle('text-decoration: line-through');
});