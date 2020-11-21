import axios from "axios";

export const updateUser = (id, data, token) => {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    };
    return axios.patch('http://localhost:8080/api/v1/users/me', data, config);
};

export const forgotPassword = (data) => {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    };
    return axios.patch('http://localhost:8080/api/v1/users/me', data, config);
};

export const uploadImg = async (selectorFiles) => {
    let data = new FormData();
    data.append("photos", selectorFiles[0]);
    return await axios.post('http://localhost:8080/api/v1/upload', data);
};
