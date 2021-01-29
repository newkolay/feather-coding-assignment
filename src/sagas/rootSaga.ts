import { fork, all } from "redux-saga/effects";
import userSaga from "./userSaga";
import recommendationSaga from "./recommendationSaga";

export default function* rootSaga() {
	yield all([fork(userSaga), fork(recommendationSaga)]);
}
