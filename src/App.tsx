import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { geolocation } from './services/geolocation';
import { OpenWeather } from './services/open-weather';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  useEffect(() => {
    async function getLocation() {
      try {
        const position = await geolocation();
        console.log(position);
        setLocation(position);
        const ow = new OpenWeather();
        const res = await ow.query({
          lat: get(position, 'coords.latitude', 0),
          lon: get(position, 'coords.longitude', 0)
        });
        console.log(res);
      } catch (err) {
        console.log(err);
        setLocation(null);
      }
    }

    getLocation();
  }, []);

  return (
    <div className="main">
      <Header />
      <div className="content">
        main contents goes here
      </div>
      <Footer />
    </div>
  );
}

export default App;
