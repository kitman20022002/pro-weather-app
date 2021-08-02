import React from 'react';
import './LoaderWeather.css';
import ReactAnimatedWeather from 'react-animated-weather';

const LoaderWeather = () => (
  <div className="loading-container">
    <ReactAnimatedWeather
      icon="RAIN"
      color="white"
      size={50}
      animate
      className="weather color--purple"
    />
    <p>Loading...</p>
  </div>
);

export default LoaderWeather;
