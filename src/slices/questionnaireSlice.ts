import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import has from "lodash.has";
import { INPUT_TYPE, RADIO_TYPE } from "../utils/constants";
import {
	QuestionnaireState,
	QuestionInput,
	QuestionRadioButtons,
} from "../interfaces/app-interfaces";

interface ChangeAnswerPayload {
	answerId: string;
	answer: string;
}

const questionsDefault = [
	{
		id: "firstName",
		type: INPUT_TYPE,
		questionText: "What's your first name?",
		validationRegex: "^(?!\\s*$).+",
	} as QuestionInput,
	{
		id: "address",
		type: INPUT_TYPE,
		questionText: "What's your address?",
		validationRegex: "^(?!\\s*$).+",
	} as QuestionInput,
	{
		id: "occupation",
		type: RADIO_TYPE,
		questionText: "What's your occupation?",
		options: [
			{
				value: "EMPLOYED",
				name: "Employed",
			},
			{
				value: "SELF_EMPLOYED",
				name: "Self employed",
			},
			{
				value: "STUDENT",
				name: "Student",
			},
		],
	} as QuestionRadioButtons,
	{
		id: "children",
		type: RADIO_TYPE,
		questionText: "Do you have any children?",
		options: [
			{
				value: "yes",
				name: "Yes",
			},
			{
				value: "no",
				name: "No",
				stepsToSkip: 1,
			},
		],
	} as QuestionRadioButtons,
	{
		id: "numberOfChildren",
		type: INPUT_TYPE,
		questionText: "How many children do you have?",
		validationRegex: "^[1-9]\\d*$",
	} as QuestionInput,
	{
		id: "email",
		type: INPUT_TYPE,
		questionText: "What's your email?",
		validationRegex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
	} as QuestionInput,
];

const initialState: QuestionnaireState = {
	questions: questionsDefault,
	currentIndex: 0,
	stepsSkipped: 0,
	answers: {
		firstName: "",
		address: "",
		children: "",
		numberOfChildren: 0,
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
					currentQuestion as QuestionRadioButtons;
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
});

export const { nextQuestion, prevQuestion, changeAnswer, setError } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
