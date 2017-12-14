import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function usersReducer(state = initialState.activeUser, action)
{
    const user = action.user;
    const user_id = action.user_id;

    switch (action.type) {
        case types.LOAD_USER_OPEN:
            return {"open": true, "user": user, "user_id": user_id};
        case types.LOAD_USER_CLOSE:
            return {"open": false, "user": user, "user_id": user_id};
        default:
            return state;
    }
}