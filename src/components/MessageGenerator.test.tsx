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

test.each([
  [39, 'Clear', 'imperial', 'Brrrrr! Bundle up today!'],
  [40, 'Clear', 'imperial', 'Clear'],
  [42, 'Snow', 'imperial', 'Get out and make yourself a snowman!'],
  [50, 'Thunderstorm', 'imperial', 'Ahhhhhhh!'],
  [20, 'Rain', 'metric', 'Sounds like a good day to chill.'],
  [31, 'Clear', 'metric', "Looks like it's getting hot out there!"],
  [30, 'Something else', 'metric', 'Something else']
])('test message at %i with %s weather on %s system', (temp, main, units, expectedMessage) => {
  const weather: Partial<ComponentProps> = {
    main: {
      temp,
    },
    weather: [
      {
        main,
      },
    ],
  };

  render(<MessageGenerator weather={weather} units={units} />);
  const message = screen.getByText(expectedMessage);
  expect(message).toBeInTheDocument();
})