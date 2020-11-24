import axios from "axios";
import {config} from '../config/config';

export const storePayment = (data) => {
    return axios.post(config.api.backend_api + "/api/v1/payments", data);
};
