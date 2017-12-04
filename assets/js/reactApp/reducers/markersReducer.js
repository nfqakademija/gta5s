import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function mapReducer(state = initialState.markers, action)
{
    switch (action.type) {
        case types.LOAD_MARKERS_SUCCESS:
            return action.markers;
        default:
            return state;
    }
}