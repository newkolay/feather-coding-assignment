import questionnaireReducer, {
	changeAnswer,
	nextQuestion,
	prevQuestion,
	setError,
} from "../../slices/questionnaireSlice";
import questions from "../../data/questions";

const defaultState = {
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

describe("questionnaire reducer", () => {
	it("should return the initial state", () => {
		expect(questionnaireReducer(undefined, { type: "any" })).toEqual({
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
		});
	});
	it("should go to the next step", () => {
		expect(questionnaireReducer(defaultState, nextQuestion)).toEqual({
			...defaultState,
			currentIndex: 1,
		});
	});
	it("should not go out of the index", () => {
		expect(questionnaireReducer(defaultState, prevQuestion)).toEqual({
			...defaultState,
			currentIndex: 0,
		});
	});
	it("should change answers", () => {
		expect(
			questionnaireReducer(
				defaultState,
				changeAnswer({ answerId: "firstName", answer: "test" })
			)
		).toEqual({
			...defaultState,
			answers: {
				...defaultState.answers,
				firstName: "test",
			},
		});
	});
	it("should set error state", () => {
		expect(questionnaireReducer(defaultState, setError(true))).toEqual({
			...defaultState,
			isError: true,
		});
	});
	it("should skip one step if needed", () => {
		expect(
			questionnaireReducer(
				{
					...defaultState,
					currentIndex: 3,
					answers: { ...defaultState.answers, children: "no" },
				},
				nextQuestion
			)
		).toEqual({
			...defaultState,
			answers: { ...defaultState.answers, children: "no" },
			currentIndex: 5,
			stepsSkipped: 1,
		});
	});
	it("should go back two steps if needed", () => {
		expect(
			questionnaireReducer(
				{
					...defaultState,
					currentIndex: 5,
					stepsSkipped: 1,
				},
				prevQuestion
			)
		).toEqual({
			...defaultState,
			currentIndex: 3,
			stepsSkipped: 0,
		});
	});
});
