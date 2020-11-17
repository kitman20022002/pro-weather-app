import axios from "axios";

export const updateUser = (id, data) => {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    };
    return axios.patch('http://localhost:8080/api/v1/users/' + id, data, config);
};
