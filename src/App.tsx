import { get } from 'lodash';
import React, { useEffect } from 'react';
import { geolocation } from './services/geolocation';
import { OpenWeather } from './services/open-weather';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Notifications } from './components/Notifications';
import { Search } from './components/Search';
import { useWeather } from './hooks/Weather';
import { WeatherCard } from './components/WeatherCard';
import './App.css';

function App() {
  const { updateLocation } = useWeather();
  useEffect(() => {
    async function getLocation() {
      try {
        const position = await geolocation();
        const ow = new OpenWeather();
        const res = await ow.query({
          lat: get(position, 'coords.latitude', 0),
          lon: get(position, 'coords.longitude', 0)
        });
        updateLocation?.(res.body.name, true);
      } catch (err) {
        console.log(err);
        // user probably denied geo tracking or is using an incompatible device.
        // no problemo.
      }
    }

    getLocation();
  }, []);

  return (
    <div className="main">
      <Header />
      <div className="content">
        <Search />
        <WeatherCard />
      </div>
      <Footer />
      <Notifications />
    </div>
  );
}

export default App;
