import { render, screen } from '@testing-library/react';
import { NotifierProvider } from './Notifier';

test('renders notification provider', () => {
  render(
    <NotifierProvider>
      <div></div>
    </NotifierProvider>
  );
});
