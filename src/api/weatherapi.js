import axios from "axios";

export const getWeather = (city) => {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    };
    return axios.get('https://x71dhcp1x1.execute-api.ap-southeast-2.amazonaws.com/default/pro-weather-app-lambda-dev-hello?city=' + city , config);
};
