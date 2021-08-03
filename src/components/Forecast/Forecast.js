import React from 'react';
import uuid from 'react-uuid';
import ForecastItem from './ForecastItem';
import './Forecast.css';

const Forecast = (props) => {
  const { data } = props;
  const daily = data.daily.data.map((item) => <ForecastItem key={uuid()} data={item} />);
  return <section className="card__forecast flex space-between flex-warp">{daily}</section>;
};

export default Forecast;
