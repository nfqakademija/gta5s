import * as types from "./actionTypes";
export function loadMarkersJson(dispatch) {
    return function(dispatch) {
    return fetch("json/map")
        .then(response => response.json())
        .then(json => dispatch({type: types.LOAD_MARKERS_SUCCESS, markersJson: json}));
    }
}