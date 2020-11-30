import React from 'react';
import './Weather.css';

import Cards from "../../components/Card/Cards";
import Header from "../../components/Header/Header";
import BackGround from "../../components/BackGround";
import '../../App.css';
import {connect} from "react-redux";
import {getWeather} from "../../api/weatherapi";
import LoaderWeather from "../../components/LoaderWeather/LoaderWeather";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            hasLogin: false,
            error: false,
            searchKey: 'sydney'
        };
        this.loadDefaultData();
    }

    handleSearchPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({isLoaded: false});
            let q = e.target.value.toLowerCase();
            getWeather(q)
                .then((response) => {
                    response.data.daily.data = response.data.daily.data.splice(0, 5);
                    this.setState({data: response.data, isLoaded: true, error: false, searchKey: q});
                })
                .catch(error => {
                    this.setState({temp: "Error", isLoaded: true, error: true});
                });
        }
    };

    async loadDefaultData() {
        let result = await getWeather(this.props.city);
        result.data.daily.data = result.data.daily.data.splice(0, 5);
        this.setState({data: result.data, isLoaded: true, error: false});
    }

    render() {

        let data = this.state.data;
        const showCard = this.state.error ? <p className="error">ERROR NOT CITY</p> :
            <Cards data={data} isLoaded={this.state.isLoaded} searchKey={this.state.searchKey}/>;
        return (
            <div className="Weather">
                <Header searchPressCallback={this.handleSearchPress}/>
                {!this.state.isLoaded ? <div className="loading--fixed"><LoaderWeather/></div> : showCard}
                <BackGround/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        city: state.auth.city
    };
};

export default connect(mapStateToProps)(Weather);
