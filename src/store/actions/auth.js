import * as actionTypes from './actionTypes';
import axios from 'axios';
import configuation from '../../config/config';


let failTime = 0;
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId, username, profileImg, city) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        profileImg: profileImg,
        username: username,
        city: city
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        authFailTimes: failTime += 1
    };
};
export const logout = () => {
    const token = localStorage.getItem('token');
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            "token": token,
        }
    };

    axios.post(configuation.api.backend_api + '/api/v1/users/logout',{}, config);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('profile_img');
    localStorage.removeItem('city');
    localStorage.removeItem('expirationDate');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    let t = expirationTime * 1000 >= 2147483647 ? 20000000 : expirationTime;
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, t);
    };
};
export const signUp = (email, password, city, isSignup, token = null) => {
    return dispatch => {
        dispatch(authStart());
        let authData = {
            email: email,
            password: password,
            city: city,
            returnSecureToken: true
        };
        if (token !== null) {
            authData = {...authData, token};
        }
        let url = configuation.api.backend_api + '/api/v1/users/signUp';

        try {
            axios.post(url, authData).then(response => {
                const img = !response.data.user.profile_img ? 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png' : response.data.user.profile_img;
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('profile_img', response.data.user.profile_img);
                localStorage.setItem('city', response.data.user.city);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token, response.data.user._id, response.data.user.username, img, response.data.user.city));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch(err => {
                dispatch(authFail(err));
            });
        } catch (e) {
            dispatch(authFail(e));
        }
    };
};

export const auth = (email, password, isSignup, token = null) => {
    return dispatch => {
        dispatch(authStart());
        let authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        if (token !== null) {
            authData = {...authData, token};
        }
        let url = configuation.api.backend_api + '/api/v1/users/signUp';
        if (!isSignup) {
            url = configuation.api.backend_api + '/api/v1/users/signIn';
        }

        try {
            axios.post(url, authData).then(response => {
                const img = !response.data.user.profile_img ? 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png' : response.data.user.profile_img;
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('profile_img', response.data.user.profile_img);
                localStorage.setItem('city', response.data.user.city);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token, response.data.user._id, response.data.user.username, img, response.data.user.city));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch(err => {
                dispatch(authFail(err));
            });
        } catch (e) {
            dispatch(authFail(e));
        }
    };
};

export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            const userName = localStorage.getItem('username');
            const profileImg = localStorage.getItem('profile_img');
            const city = localStorage.getItem('city');
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {

                dispatch(authSuccess(token, userId, userName, profileImg, city));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
            }
            dispatch(authSuccess(token, userId, userName, profileImg, city));
        }
    }
};

export const updateUserLocal = (data) => {
    localStorage.setItem('username', data.username);
    localStorage.setItem('profile_img', data.profile_img);
    localStorage.setItem('city', data.city);

    return {
        type: actionTypes.UPDATE_USER_LOCAL,
        data
    }
};
