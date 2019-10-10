import React from "react";
import ForecastItem from "./ForecastItem";

import "./Forecast.css"

const Forecast = (props) => {

    const daily = props.data.daily.data.map((item,i) => <ForecastItem key={i} data={item}/>);
    return (
        <section className="card__forecast flex space-between align--center flex-warp">
            {daily}
        </section>
    );
};

export default Forecast;
