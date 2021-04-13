import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { NotifierProvider } from './hooks/Notifier';
import { WeatherProvider } from './hooks/Weather';

const server = setupServer(
  rest.get('/places', (req, res, ctx) => {
    return res(
      ctx.json({
        predictions: [
          {
            description: 'Charleston, SC, USA',
          },
        ],
      })
    );
  }),
  rest.get('/weather', (req, res, ctx) => {
    return res(
      ctx.json({
        weather: [
          {
            main: 'Clear',
          },
        ],
        main: {
          temp: 75,
          feels_like: 85,
        },
        wind: {
          speed: 15,
          deg: 300,
        },
        dt: 1560350645,
        sys: {
          sunrise: 1560343627,
          sunset: 1560396563,
        },
        timezone: -14400,
        name: 'Charleston',
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loading locations from input', async () => {
  render(
    <NotifierProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </NotifierProvider>
  );

  const input = screen.getByLabelText('location');
  fireEvent.change(input, { target: { value: 'Charleston, SC' } });
  const autocomplete = await screen.findByText('Charleston, SC, USA');
  expect(autocomplete).toBeInTheDocument();
});

test('loading weather from selected input', async () => {
  render(
    <NotifierProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </NotifierProvider>
  );

  const input = screen.getByLabelText('location');
  fireEvent.change(input, { target: { value: 'Charleston, SC' } });
  const autocomplete = await screen.findByText('Charleston, SC, USA');
  fireEvent.click(autocomplete);
  const temp = await screen.findByText(`Currently ${75}`);
  expect(temp).toBeInTheDocument();
  const feelsLike = await screen.findByText(`Feels like ${85}`);
  expect(feelsLike).toBeInTheDocument();
});

test('loading weather when openweather returns a bad result', async () => {
  server.use(
    rest.get('/weather', (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Some technical error from OWM' })
      );
    })
  );

  render(
    <NotifierProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </NotifierProvider>
  );

  const input = screen.getByLabelText('location');
  fireEvent.change(input, { target: { value: 'Charleston, SC' } });
  const autocomplete = await screen.findByText('Charleston, SC, USA');
  fireEvent.click(autocomplete);
  const notification = await screen.findByText(
    'Location not found. Try something more generic.'
  );
  expect(notification).toBeInTheDocument();
});
