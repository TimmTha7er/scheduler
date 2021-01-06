import { combineReducers } from "redux";
// import datePickerReducer from "./datePicker";
import datePickerReducer from "./datePicker";
import popupsReducer from "./popups";
import gridReducer from "./grid";


// const rootReducer = combineReducers({
// 	datePicker: datePickerReducer,
// });

const rootReducer = combineReducers({
	datePicker: datePickerReducer,
	popups: popupsReducer,
	grid: gridReducer,
});

export default rootReducer;