import axios from "axios";
import configuation from '../config/config';

export const updateUser = (id, data, token) => {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    };

    return axios.patch(configuation.api.backend_api + '/api/v1/users/me', {...data, 'token': token}, config);
};

export const forgotPassword = (data) => {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    };
    return axios.post(configuation.api.backend_api + '/api/v1/users/forgot-password', data, config);
};


export const resetPassword = (data) => {
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json"
        }
    };
    return axios.post(configuation.api.backend_api + '/api/v1/users/reset-password', data, config);
};

export const uploadImg = async (selectorFiles) => {
    let data = new FormData();
    data.append("photos", selectorFiles[0]);
    return await axios.post(configuation.api.backend_api + '/api/v1/upload', data);
};
