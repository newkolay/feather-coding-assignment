import { combineReducers } from "@reduxjs/toolkit";
import questionnaireReducer from "../slices/questionnaireSlice";
import authReducer from "../slices/authSlice";
import recommendationReducer from "../slices/recommendationSlice";

const rootReducer = combineReducers({
	questionnaire: questionnaireReducer,
	auth: authReducer,
	recommendation: recommendationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
