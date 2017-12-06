import {combineReducers} from "redux";
import markersJson from "./markersReducer";

const rootReducer = combineReducers({
    markersJson
});
export default rootReducer;