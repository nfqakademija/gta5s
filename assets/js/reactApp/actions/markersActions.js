import * as types from "./actionTypes";

export function loadMarkersJson(timeOfDay = "") {
    return function(dispatch) {
    return fetch("json/map" + timeOfDay)
        .then(response => response.json())
        .then(json => dispatch({type: types.LOAD_MARKERS_SUCCESS, markersJson: json, timeOfDay}));
    }
}