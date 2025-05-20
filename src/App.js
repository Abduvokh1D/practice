import { useEffect, useState } from "react";
const API = "c0e76daf45af4bbeb9e43500252005";
export default function WeatherApp() {
  const [city, setCity] = useState("Tashkent");
  const [weather, setWeather] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchWeather() {
        if (!city) return;
        setIsLoading(true);
        setError("");
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API}&q=${city}`,
            { signal: controller.signal }
          );

          const data = await response.json();

          if (data.error) {
            setError(data.error.message);
            setWeather(null);
          } else {
            setWeather(data);
          }
        } catch (err) {
          setError("Something went wrong.");
        } finally {
          setIsLoading(false);
        }
      }
      fetchWeather();
      return () => controller.abort;
    },
    [city]
  );
  useEffect(function () {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) setCity(savedCity);
  }, []);
  return (
    <div className="weather-main">
      <h2>Weather App 🌤</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          localStorage.setItem("lastCity", e.target.value);
        }}
        placeholder="Enter city"
        style={{ padding: "0.5rem", width: "100%" }}
      />
      {loading && <Loading />}
      {error && <Error error={error} />}
      {weather && (
        <div className="weather-window">
          <h3>
            {weather.location.name}, {weather.location.country}
          </h3>
          <p>{weather.current.condition.text}</p>
          <p>{weather.current.temp_c} °C</p>
          <p>{weather.location.localtime} </p>
          <img src={weather.current.condition.icon} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
}
function Loading() {
  return <p>Loading...</p>;
}
function Error({ error }) {
  return <p className="error">{error}</p>;
}
