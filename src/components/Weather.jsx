import axios from "axios";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./Weather.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [foreCastData, setForeCastData] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(false)

  const API_KEY = "776ae476076fdb0fef1772c2718d54ed";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please Inter Name City");
      return;
    }

    setError("");
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
      );
      setWeatherData(weatherResponse.data);

      const foreCastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
      );
      setForeCastData(foreCastResponse.data);
    } catch (err) {
      setError("City Not Found");
    }

    setCity("")
  };

  const generateChartData = () => {
    if (!foreCastData) return null;

    const labels = foreCastData.list
      .slice(0, 8)
      .map((item) =>
        new Date(item.dt * 1000).toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      const data = foreCastData.list.slice(0,8).map((item) => item.main.temp);

    return {
      labels,
      datasets: [
        {
          label: "دما (C)",
          data,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  const chartData = generateChartData();

  const clickHandler = () => {
    setPage(true)
  }

  const cancelHandler = () => {
    setPage(false)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Name City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>
      {error && <p style={{color:"red"}}>{error}</p>}
      {weatherData && (
        <div>
          <h1 onClick={clickHandler}>{weatherData.name} / {weatherData.sys.country}</h1>
          <p>دما : {weatherData.main.temp} C</p>
          <p>وضعیت : {weatherData.weather[0].description}</p>
          <p>سرعت باد : {weatherData.wind.speed} متر بر ثانیه</p>
        </div>
      )}

      {page && (
        <div className="container">
          <span onClick={cancelHandler}>X</span>
          {chartData && (
        <div className="graph">
          <Line data={chartData} />
        </div>
      )}
        </div>
      )}
    </div>
  );
}

export default Weather;
