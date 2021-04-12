import { render, screen } from '@testing-library/react';
import { MessageGenerator } from './MessageGenerator';

type ComponentProps = React.ComponentProps<typeof MessageGenerator>;

test('renders message generator and should display', () => {
  const weather: Partial<ComponentProps> = {
    main: {
      temp: 75,
    },
    weather: [
      {
        main: 'Clear',
      },
    ],
  };

  const units = 'imperial';

  render(<MessageGenerator weather={weather} units={units} />);
  const message = screen.getByText('Get outta the house! Its gorgeous!');
  expect(message).toBeInTheDocument();
});
