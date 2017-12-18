import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function markersReducer(state = initialState.timeOfDay, action)
{
    switch (action.type) {
        case types.LOAD_MARKERS_SUCCESS:
            return action.timeOfDay;
        default:
            return state;
    }
}