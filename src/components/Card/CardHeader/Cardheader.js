import React from "react";
import './Cardheader.css';
import DynamicWeather from "../../DynamicWeather/DynamicWeather";

class Cardheader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            elementHeight: 0,
        };
    }

    getHeight = (element) => {
        if (element && !this.state.elementHeight) { // need to check that we haven't already set the height or we'll create an infinite render loop
            this.setState({elementHeight: element.clientHeight + 100});
        }

    };

    render() {

        return (
            <section className="card__current" ref={this.getHeight}>
                <DynamicWeather data={this.props.data} height={parseInt(this.state.elementHeight)}/>
                <div className="card__current-temperature">
                    <div className="center">
                        <span
                            className="card__current-temperature">{parseInt(this.props.data.currently.temperature)}°</span>
                        <span className="card__current-weather">{this.props.data.currently.summary}</span>
                    </div>
                    <ul className="card__current-details-list flex space-between list-style--disable center">
                        <li className="card__current-details">
                            <p>HUMIDITY</p>
                            <p>{this.props.data.currently.humidity * 100}%</p>
                        </li>
                        <li className="card__current-details">
                            <p>WIND</p>
                            <p>{this.props.data.currently.windSpeed} m/s</p>
                        </li>
                    </ul>
                </div>
                <div className="card__current-location">
                    <p className="card__current-country">{this.props.data.timezone.split("/")[1].replace('_' , ' ')}</p>
                </div>
            </section>
        );
    }
}

export default Cardheader;
