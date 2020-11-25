import * as actionTypes from './actionTypes';
import axios from 'axios';
import configuation from '../../config/config';


let failTime = 0;
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId, username, profileImg) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        profileImg: profileImg,
        username: username
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('profile_img');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
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
        console.log('what');
        try {
            axios.post(url, authData).then(response => {
                console.log('abc');
                const img = !response.data.user.profile_img ? 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png' : response.data.user.profile_img;
                const expirationDate = new Date(new Date().getTime() + 10000 * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('profile_img', response.data.user.profile_img);
                dispatch(authSuccess(response.data.token, response.data.user._id, response.data.user.username, img));
                //dispatch(checkAuthTimeout(expirationDate));
            }).catch(err => {
                console.log('abcd');
                dispatch(authFail(err));
            });
        }catch (e) {
            console.log('fxxk');
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

            //const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //    // dispatch(logout());
            // } else {
            const userId = localStorage.getItem('userId');
            const userName = localStorage.getItem('username');
            const profileImg = localStorage.getItem('profile_img');
            dispatch(authSuccess(token, userId, userName, profileImg));
            // dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
            //}
            //dispatch(authSuccess());
        }
    }
};

export const updateUserLocal = (data) => {
    localStorage.setItem('username', data.username);
    localStorage.setItem('profile_img', data.profile_img);
    return {
        type: actionTypes.UPDATE_USER_LOCAL,
        data
    }
};
