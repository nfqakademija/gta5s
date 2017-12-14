import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function usersReducer(state = initialState.activeUser, action)
{
    const user = action.user;
    switch (action.type) {
        case types.LOAD_USER_OPEN:
            return {"open": true, "user": user};
        case types.LOAD_USER_CLOSE:
            return {"open": false, "user": user};
        default:
            return state;
    }
}