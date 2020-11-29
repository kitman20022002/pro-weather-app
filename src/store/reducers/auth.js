import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    token: null,
    userId: null,
    profileName: null,
    profileImg: null,
    error: null,
    city: null,
    loading: false,
    authRedirectPath: '/',
    authFailTimes: 0
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        profileName: action.username === "" ? "Kitman Yiu" : action.username,
        profileImg: action.profileImg,
        userId: action.userId,
        city: action.city,
        error: null,
        loading: false,
        authFailTimes: 0
    });

};
const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false, authFailTimes: action.authFailTimes});
};

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null});
};

const updateUserLocal = (state, action) => {
    return updateObject(state, {
        profileName: action.data.username === "" ? "Kitman Yiu" : action.data.username,
        profileImg: action.data.profile_img,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.UPDATE_USER_LOCAL:
            return updateUserLocal(state, action);
        default:
            return state;
    }
};


export default reducer;
