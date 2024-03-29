import React from 'react';

import ReactAnimatedWeather from 'react-animated-weather';
import moment from 'moment';

const weatherMapping = {
  'clear-day': 'CLEAR_DAY',
  'partly-cloudy-day': 'PARTLY_CLOUDY_DAY',
  cloudy: 'CLOUDY',
  rain: 'RAIN',
  wind: 'WIND',
  fog: 'FOG',
  snow: 'SNOW',
};

const dayMapping = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

// CLEAR_DAY
// CLEAR_NIGHT
// PARTLY_CLOUDY_DAY
// PARTLY_CLOUDY_NIGHT
// CLOUDY
// RAIN
// SLEET
// SNOW
// WIND
// FOG
const ForecastItem = (props) => {
  const { data } = props;
  return (
    <div className="forecast-container align--center">
      <h2 className="card__forecast-day">{dayMapping[moment.unix(data.time).day()]}</h2>
      <ReactAnimatedWeather
        icon={weatherMapping[data.icon]}
        color="#8650f6"
        size={50}
        animate
        className="weather color--purple"
      />
      <div className="flex temp">
        <p className="card__forecast-temperature">{parseInt(data.temperatureMax, 10)}°</p>
        <p className="card__forecast-temperature color--low">
          {' '}
          {parseInt(data.temperatureMin, 10)}°
        </p>
      </div>
    </div>
  );
};

export default ForecastItem;
