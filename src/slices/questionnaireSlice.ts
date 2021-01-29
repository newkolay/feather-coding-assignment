import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import has from "lodash.has";
import { RADIO_TYPE } from "../utils/constants";
import { QuestionnaireState } from "../interfaces/questionnaire.interface";
import questions from "../data/questions";
import { createUserSuccess } from "./authSlice";

interface ChangeAnswerPayload {
	answerId: string;
	answer: string;
}

const initialState: QuestionnaireState = {
	questions,
	currentIndex: 0,
	stepsSkipped: 0,
	answers: {
		firstName: "",
		address: "",
		children: "",
		numberOfChildren: "",
		occupation: "",
		email: "",
	},
	isError: false,
};

export const questionnaireSlice = createSlice({
	name: "questionnaire",
	initialState,
	reducers: {
		nextQuestion: (state) => {
			if (state.currentIndex < state.questions.length - 1) {
				let stepsToSkip = 0;
				const currentQuestion = state.questions[state.currentIndex];
				if (currentQuestion.type === RADIO_TYPE) {
					const currentAnswer = state.answers[currentQuestion.id];
					const option = currentQuestion.options.find(
						(item) => item.value === currentAnswer
					);
					if (option && has(option, "stepsToSkip")) {
						stepsToSkip += option.stepsToSkip!;
					}
				}

				state.currentIndex += 1 + stepsToSkip;
				state.stepsSkipped = stepsToSkip;
			}
		},
		prevQuestion: (state) => {
			if (state.currentIndex - state.stepsSkipped > 0) {
				state.currentIndex -= 1 + state.stepsSkipped;
				state.stepsSkipped = 0;
			}
		},
		changeAnswer: (state, action: PayloadAction<ChangeAnswerPayload>) => {
			const { answerId, answer } = action.payload;
			state.answers = {
				...state.answers,
				[answerId]: answer,
			};
		},
		setError: (state, action: PayloadAction<boolean>) => {
			state.isError = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createUserSuccess, () => initialState);
	},
});

export const { nextQuestion, prevQuestion, changeAnswer, setError } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
