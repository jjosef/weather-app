import { fireEvent, render, screen } from '@testing-library/react';
import { Alert } from './Notifications';

test('renders notification alert', () => {
  render(
    <Alert alert={{ message: 'This is a message' }} onRemove={() => {}} />
  );

  const alert = screen.getByText('This is a message');
  expect(alert).toBeInTheDocument();
});

test('calls onRemove', () => {
  const removeMock = jest.fn();
  render(<Alert alert={{ message: 'An alert' }} onRemove={removeMock} />);

  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(removeMock).toHaveBeenCalled();
});
