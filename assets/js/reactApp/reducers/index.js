import {combineReducers} from "redux";
import markers from "./markersReducer";

const rootReducer = combineReducers({
    markers
});
export default rootReducer;