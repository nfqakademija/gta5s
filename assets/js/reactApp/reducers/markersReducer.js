import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function markersReducer(state = initialState.markersJson, action)
{
    switch (action.type) {
        case types.LOAD_MARKERS_SUCCESS:
            return action.markersJson;
        default:
            return state;
    }
}