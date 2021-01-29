import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import API from "../services/main.api";
import { removeToken } from "../slices/authSlice";
import {
	fetchRecommendationRequest,
	fetchRecommendationSuccess,
	fetchRecommendationFailed,
} from "../slices/recommendationSlice";

function* fetchRecommendation(action: PayloadAction<string>) {
	try {
		const response = yield call(API.getRecommendation, action.payload);
		yield put(fetchRecommendationSuccess(response.data));
	} catch (error) {
		if (error.response && error.response.status === 401) {
			yield put(removeToken());
		} else {
			yield put(
				fetchRecommendationFailed("An error occured trying to load your recommendation")
			);
		}
	}
}

function* recommendationSaga() {
	yield takeLatest(fetchRecommendationRequest, fetchRecommendation);
}

export default recommendationSaga;
