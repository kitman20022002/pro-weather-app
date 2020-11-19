import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    };
};
export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
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

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'http://localhost:8080/api/v1/users/signUp';
        if (!isSignup) {
            url = 'http://localhost:8080/api/v1/users/signIn';
        }
        axios.post(url, authData).then(response => {
            const expirationDate = new Date(new Date().getTime() + 10000 * 1000);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user._id);
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('profile_img', response.data.user.profile_img);

            dispatch(authSuccess(response.data.token, response.data.user._id, response.data.user.username, response.data.user.profile_img));
            dispatch(checkAuthTimeout(expirationDate));
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
    };
};

export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('ac');
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
