import { configureStore } from "@reduxjs/toolkit";
import questionnaireReducer from "../slices/questionnaireSlice";

export const store = configureStore({
	reducer: {
		questionnaire: questionnaireReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
