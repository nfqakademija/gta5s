import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function usersReducer(state = initialState.activeUser, action)
{
    switch (action.type) {
        case types.LOAD_USER_OPEN:
            return Object.assign(action.activeUser, {"open": true});
        default:
            return state;
    }
}