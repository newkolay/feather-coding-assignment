import { QuestionInput, QuestionRadioButtons } from "../interfaces/questionnaire.interface";
import { INPUT_TYPE, RADIO_TYPE } from "../utils/constants";

const questions = [
	{
		id: "firstName",
		type: INPUT_TYPE,
		questionText: "What's your first name?",
		placeholder: "i.e. Jane",
		validationRegex: "^(?!\\s*$).+",
	} as QuestionInput,
	{
		id: "address",
		type: INPUT_TYPE,
		questionText: "What's your address?",
		placeholder: "i.e. Lohmühlenstraße 65",
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
		placeholder: "Type a number here",
		validationRegex: "^[1-9]\\d*$",
	} as QuestionInput,
	{
		id: "email",
		type: INPUT_TYPE,
		questionText: "What's your email?",
		placeholder: "i.e. jane.doe@feather-insurance.com",
		validationRegex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
	} as QuestionInput,
];

export default questions;
