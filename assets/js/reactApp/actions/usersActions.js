import * as types from "./actionTypes";

export function loadUser(marker, activeUser) {
    const user = marker.user;
    if (activeUser.open === false || activeUser.user !== marker.user) {
        return {
            type: types.LOAD_USER_OPEN,
            user
        };
    }
    if (activeUser.open === true && activeUser.user === marker.user) {
        return {
            type: types.LOAD_USER_CLOSE,
            user
        };
    }
}