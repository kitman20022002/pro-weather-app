import axios from "axios";

export const storePayment = (data) => {
    return axios.post('http://localhost:8080' + "/api/v1/payments", data);
};
