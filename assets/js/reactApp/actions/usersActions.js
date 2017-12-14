import * as types from "./actionTypes";

export function loadUser(marker, activeUser) {
    const user = (marker.user) ? marker.user : activeUser.user;
    const user_id = (marker.user_id) ? marker.user_id : activeUser.user_id;

    if (
        activeUser.open === false ||
        activeUser.open === true && (marker.user) && marker.user !== activeUser.user
    ) {
        return {
            type: types.LOAD_USER_OPEN,
            user,
            user_id
        };
    }
    if (
        activeUser.open === true && (marker.user) && marker.user === activeUser.user ||
        activeUser.open === true && marker.closeUser === true
    ) {
        return {
            type: types.LOAD_USER_CLOSE,
            user,
            user_id
        };
    }
}