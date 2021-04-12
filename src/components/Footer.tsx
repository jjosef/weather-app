export function Footer() {
  return (
    <footer>
      <span>Copyright {new Date().getUTCFullYear()} John Josef</span>
      <span className="powered">
        Powered by <a href="https://openweathermaps.org">OpenWeatherMaps.org</a>
      </span>
    </footer>
  );
}
