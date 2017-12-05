import * as types from "./actionTypes";
const siteUrl = window.location.href;

export function loadMarkersJson(dispatch) {
    return function(dispatch) {
    return fetch(siteUrl + "json/map")
        .then(response => response.json())
        .then(json => dispatch({type: types.LOAD_MARKERS_SUCCESS, markers: json}));
    }
}