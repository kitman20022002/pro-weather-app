import React from 'react';
import ForecastItem from './ForecastItem';

import './Forecast.css';

const Forecast = (props) => {
  const { data } = props;
  const daily = data.daily.data.map((item, i) => <ForecastItem key={i} data={item} />);
  return <section className="card__forecast flex space-between flex-warp">{daily}</section>;
};

export default Forecast;
