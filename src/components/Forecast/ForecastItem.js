import React from "react";

import ReactAnimatedWeather from 'react-animated-weather';
import moment from "moment";
const weatherMapping = {
    'clear-day' : 'CLEAR_DAY',
    'partly-cloudy-day' : 'PARTLY_CLOUDY_DAY',
    'cloudy' : 'CLOUDY',
};

const dayMapping = {
    0 : 'Sunday',
    1 : 'Monday',
    2 : 'Tuesday',
    3 : 'Wednesday',
    4 : 'Thursday',
    5 : 'Friday',
    6 : 'Saturday',
}
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
const ForecastItem = (props) => (
    <div className="forecast-container align--left">
        <h2 className="card__forecast-day">{dayMapping[moment.unix(props.data.time * 1000).day()]}</h2>
        <ReactAnimatedWeather
            icon={weatherMapping[props.data.icon]}
            color={'#8650f6'}
            size={50}
            animate={true} className="weather color--purple"/>
        <p className="card__forecast-summary">{props.data.summary.split(' throughout the day.')[0]}</p>
        <p className="card__forecast-temperature">Min:{parseInt(props.data.temperatureMin)}°</p>
        <p className="card__forecast-temperature">Max:{parseInt(props.data.temperatureMax)}°</p>
    </div>
);

export default ForecastItem;
