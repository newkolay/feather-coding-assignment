import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INPUT_TYPE, RADIO_TYPE } from "../utils/constants";
import { QuestionnaireState } from "../interfaces/app-interfaces";

interface ChangeAnswerPayload {
	answerId: string;
	answer: string;
}

const questionsDefault = [
	{
		id: "firstName",
		type: INPUT_TYPE,
		questionText: "What's your first name?",
		validationRegex: "",
	},
	{
		id: "address",
		type: INPUT_TYPE,
		questionText: "What's your address?",
		validationRegex: "",
	},
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
	},
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
	},
	{
		id: "numberOfChildren",
		type: INPUT_TYPE,
		questionText: "How many children do you have?",
		validationRegex: "",
	},
	{
		id: "email",
		type: INPUT_TYPE,
		questionText: "What's your email?",
		validationRegex: "",
	},
];

const initialState: QuestionnaireState = {
	questions: questionsDefault,
	currentIndex: 0,
	answers: {
		firstName: "",
		address: "",
		numberOfChildren: 0,
		occupation: "",
		email: "",
	},
};

export const questionnaireSlice = createSlice({
	name: "questionnaire",
	initialState,
	reducers: {
		nextQuestion: (state) => {
			state.currentIndex += 1;
		},
		changeAnswer: (state, action: PayloadAction<ChangeAnswerPayload>) => {
			const { answerId, answer } = action.payload;
			state.answers = {
				...state.answers,
				[answerId]: answer,
			};
		},
	},
});

export const { nextQuestion, changeAnswer } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
