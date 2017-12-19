import {combineReducers} from "redux";
import markersJson from "./markersReducer";
import activeUser from "./usersReducer";
import timeOfDay from "./timeReducer";

const rootReducer = combineReducers({
    markersJson,
    activeUser,
    timeOfDay
});
export default rootReducer;