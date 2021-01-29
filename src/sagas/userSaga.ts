import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { QuestionnaireToSend } from "../interfaces/auth.interface";
import API from "../services/main.api";
import { createUserRequest, createUserSuccess, createUserFailed } from "../slices/authSlice";

function* createUser(action: PayloadAction<QuestionnaireToSend>) {
	try {
		const response = yield call(API.createUser, action.payload);
		yield put(createUserSuccess(response.data.jwt));
	} catch (error) {
		if (error.response && error.response.status === 422) {
			yield put(createUserFailed(error.response.data.errors));
		} else {
			yield put(
				createUserFailed({
					default: ["An error occured, please try again later"],
				})
			);
		}
	}
}

function* userSaga() {
	yield takeLatest(createUserRequest, createUser);
}

export default userSaga;
