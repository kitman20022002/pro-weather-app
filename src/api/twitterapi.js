import axios from "axios";

export const getTwitter = (city) => {

    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    };
    return axios.get('https://p0hzg9j0ji.execute-api.ap-southeast-2.amazonaws.com/default/getTweets?q=' + encodeURI(city + " weather"), config);
};
