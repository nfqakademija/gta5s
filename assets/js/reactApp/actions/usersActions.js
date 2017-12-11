import * as types from "./actionTypes";

export function loadUser(user) {
    if (user.open === false) {
        return {
            type: types.LOAD_USER_OPEN,
            activeUser: user
        };
    }
}