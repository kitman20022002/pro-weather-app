import React from "react";
import './Cardheader.css';
import DynamicWeather from "../../DynamicWeather/DynamicWeather";

const Cardheader = (props) => {
    return (
        <section className="card__current">
            <DynamicWeather/>
            <div className="card__current-temperature">
                <div className="center">
                    <span className="card__current-temperature">{parseInt(props.temp.current.temp_c)}°</span>
                    <span className="card__current-weather">{props.data.currently.summary}</span>
                </div>
                <ul className="card__current-details-list flex space-between list-style--disable center">
                    <li className="card__current-details">
                        <p>HUMIDITY</p>
                        <p>{props.data.currently.humidity * 100}%</p>
                    </li>
                    <li className="card__current-details">
                        <p>WIND</p>
                        <p>{props.data.currently.windSpeed} m/s</p>
                    </li>
                </ul>
            </div>
            <div className="card__current-location">
                <p className="card__current-country">{props.temp.location.name }</p>
            </div>
            <img className="card__header-img" alt="background-img"
                 src="http://greenfilmnet.org/wp-content/uploads/starry-sky-1030x644.jpg"/>
        </section>
    );
}
export default Cardheader;
