import recommendationReducer, {
	fetchRecommendationRequest,
	fetchRecommendationSuccess,
	fetchRecommendationFailed,
} from "../../slices/recommendationSlice";

const defaultState = {
	recommendation: [],
	isLoading: true,
	error: null,
};

const testRecommendation = [
	{
		type: "PRIVATE_LIABILITY",
		price: {
			amount: 4.3,
			periodicity: "MONTH",
		},
	},
	{
		type: "HOME_CONTENT",
		price: {
			amount: 103.32,
			periodicity: "YEAR",
		},
	},
	{
		type: "HEALTH_INSURANCE",
		price: {
			amount: 320.32,
			periodicity: "MONTH",
		},
	},
];

describe("recommendation reducer", () => {
	it("should return the initial state", () => {
		expect(recommendationReducer(undefined, { type: "any" })).toEqual(defaultState);
	});
	it("should match state for recommendation request", () => {
		expect(recommendationReducer(defaultState, fetchRecommendationRequest)).toEqual({
			...defaultState,
			isLoading: true,
		});
	});
	it("should match state for getting recommendation successfully", () => {
		expect(
			recommendationReducer(defaultState, fetchRecommendationSuccess(testRecommendation))
		).toEqual({
			...defaultState,
			isLoading: false,
			recommendation: testRecommendation,
		});
	});
	it("should match state for getting recommendation unsuccessfully", () => {
		expect(
			recommendationReducer(defaultState, fetchRecommendationFailed("test error"))
		).toEqual({
			...defaultState,
			isLoading: false,
			error: "test error",
		});
	});
});
