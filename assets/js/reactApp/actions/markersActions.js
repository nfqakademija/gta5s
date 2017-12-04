import * as types from "./actionTypes";

export function loadMarkers() {
    return {type: types.LOAD_MARKERS_SUCCESS, markers: [{yea: 'yeah!'}]};
}