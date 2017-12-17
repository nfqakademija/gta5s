import * as types from "./actionTypes";

export function loadMarkersJson(time = "") {
    return function(dispatch) {
    return fetch("json/map" + time)
        .then(response => response.json())
        .then(json => dispatch({type: types.LOAD_MARKERS_SUCCESS, markersJson: json}));
    }
}