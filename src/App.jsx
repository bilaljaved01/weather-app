import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(''); // default city
  const [localTime, setLocalTime] = useState('');

  // Fetch weather data when the button is clicked
  const fetchWeatherData = async () => {
    try {
      const apiKey = '22633e3ee27835a6d068833197f594dd'; // Replace with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        updateLocalTime(data.timezone); // Update local time based on the timezone
      } else {
        console.error('Error:', data.message);
        setWeather(null);
        setLocalTime('');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setLocalTime('');
    }
  };

  // Function to calculate and update the local time of the city
  const updateLocalTime = (timezoneOffset) => {
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const cityTime = new Date(utcTime + timezoneOffset * 1000);
    // Format the time to show only hours and minutes
    setLocalTime(
      cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <div className="App">
      <h1>Instant Weather</h1>

      {/* Input field to change city */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />

      {/* Button to fetch data manually if needed */}
      <button onClick={fetchWeatherData}>Searchhhh</button>

     

      {/* Displaying weather data */}
      {weather && weather.main ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
           {/* Displaying local time */}
      {localTime && <h2>Local Time: {localTime}</h2>}
        </div>
        
      ) : (
        <p>No data available. Please try another city.</p>
      )}
    </div>
    
  );
}

export default App;
