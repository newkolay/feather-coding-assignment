import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthErrors, QuestionnaireToSend } from "../interfaces/auth.interface";
import { prevQuestion } from "./questionnaireSlice";

interface AuthState {
	token: string | null;
	isLoading: boolean;
	errors: AuthErrors | null;
}

const initialState: AuthState = {
	token: null,
	isLoading: false,
	errors: null,
};

function isPrevQuestionAction(action: AnyAction) {
	return action.type === prevQuestion().type;
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		createUserRequest: (state, action: PayloadAction<QuestionnaireToSend>) => {
			state.isLoading = true;
			state.errors = null;
		},
		createUserSuccess: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.token = action.payload;
		},
		createUserFailed: (state, action: PayloadAction<AuthErrors>) => {
			state.isLoading = false;
			state.errors = action.payload;
		},
		removeToken: (state) => {
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(isPrevQuestionAction, (state) => {
			state.errors = null;
		});
	},
});

export const {
	createUserRequest,
	createUserSuccess,
	createUserFailed,
	removeToken,
} = authSlice.actions;

export default authSlice.reducer;
