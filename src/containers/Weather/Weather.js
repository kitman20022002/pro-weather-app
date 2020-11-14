import React from 'react';
import './Weather.css';
import axios from 'axios';

import Cards from "../../components/Card/Cards";
import Header from "../../components/Header/Header";
import BackGround from "../../components/BackGround";
import '../../App.css';
import {connect} from "react-redux";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            hasLogin: false,
            error: false,
            temp: {
                current: {
                    temp_c: 11,
                },
                location: {
                    name: "Sydney"
                }
            },
        };
    }

    handleSearchPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({isLoaded: false});
            let q = e.target.value.toLowerCase();
            axios.get('https://api.apixu.com/v1/forecast.json?forecast_days=3&key=1eb8b1de06614af3a3423418171609&q=' + q)
                .then((response) => {
                    this.setState({temp: response.data, isLoaded: true, error: false});
                })
                .catch(error => {
                    this.setState({temp: "Error", isLoaded: true, error: true});
                });
        }
    };

    async componentDidMount() {
        //https://svu1ja47fc.execute-api.ap-southeast-2.amazonaws.com/dev/message?city=sydney

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json"
            }
        };

        let result = await axios.get('https://x71dhcp1x1.execute-api.ap-southeast-2.amazonaws.com/default/pro-weather-app-lambda-dev-hello?city=sydney', config);
        result.data.daily.data = result.data.daily.data.splice(0, 5);
        this.setState({data: result.data, isLoaded: true, error: false});
    }

    render() {
        if (!this.state.isLoaded) {
            return null;
        }
        let data = this.state.data;

        const showCard = this.state.error ? <p className="error">ERROR NOT CITY</p> :
            <Cards data={data} temp={this.state.temp} isLoaded={this.state.isLoaded}/>;
        return (
            <div className="Weather">
                <Header searchPressCallback={this.handleSearchPress}/>
                {showCard}
                <BackGround/>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Weather);
