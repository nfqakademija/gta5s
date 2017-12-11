import {combineReducers} from "redux";
import markersJson from "./markersReducer";
import activeUser from "./usersReducer";

const rootReducer = combineReducers({
    markersJson,
    activeUser
});
export default rootReducer;