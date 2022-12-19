import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

jest.mock('axios', () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: 'John' },
    }),
  },
}));

// * render test
test('username input should be rendered', () => {
  render(<LoginForm />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl).toBeInTheDocument();
});

test('password input should be rendered', () => {
  render(<LoginForm />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test('button should be rendered', () => {
  render(<LoginForm />);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeInTheDocument();
});

test('loading should be not rendered', () => {
  render(<LoginForm />);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).not.toHaveTextContent(/loading/i);
});

// * value test
test('username value should be empty', () => {
  render(<LoginForm />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  expect(usernameInputEl).toHaveValue('');
});

test('password value should be empty', () => {
  render(<LoginForm />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toHaveValue('');
});

// * disabled test
test('button should be disabled', () => {
  render(<LoginForm />);
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeDisabled();
});

// * error message test
test('error message should not to be visible', () => {
  render(<LoginForm />);
  const errorMessageEl = screen.getByTestId('error-message');
  expect(errorMessageEl).not.toBeVisible();
});

// * event test
test('username input should change', () => {
  render(<LoginForm />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = 'test';

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl).toHaveValue(testValue);
});

test('password input should change', () => {
  render(<LoginForm />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl).toHaveValue(testValue);
});

test('button should be enabled', () => {
  render(<LoginForm />);
  const buttonEl = screen.getByRole('button');
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(buttonEl).toBeEnabled();
});

test('loading should be rendered when click', () => {
  render(<LoginForm />);
  const buttonEl = screen.getByRole('button');
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/loading/i);
});

test('loading should not be rendered after fetching', async () => {
  render(<LoginForm />);
  const buttonEl = screen.getByRole('button');
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/loading/i));
});

test('user should be rendered after fetching', async () => {
  render(<LoginForm />);
  const buttonEl = screen.getByRole('button');
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText('John');

  expect(userItem).toBeInTheDocument();
});
