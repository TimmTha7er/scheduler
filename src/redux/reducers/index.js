import { combineReducers } from "redux";
import datePickerReducer from "./datePicker";


const rootReducer = combineReducers({
	datePicker: datePickerReducer,
});

export default rootReducer;