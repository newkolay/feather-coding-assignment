import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recommendation } from "../interfaces/recommendation.interface";

interface RecommendationState {
	recommendation: Recommendation[];
	isLoading: boolean;
	error: string | null;
}

const initialState: RecommendationState = {
	recommendation: [],
	isLoading: true,
	error: null,
};

export const recommendationSlice = createSlice({
	name: "recommendation",
	initialState,
	reducers: {
		fetchRecommendationRequest: (state, action: PayloadAction<string>) => {
			state.isLoading = true;
			state.error = null;
		},
		fetchRecommendationSuccess: (state, action: PayloadAction<Recommendation[]>) => {
			state.isLoading = false;
			state.recommendation = action.payload;
		},
		fetchRecommendationFailed: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchRecommendationRequest,
	fetchRecommendationSuccess,
	fetchRecommendationFailed,
} = recommendationSlice.actions;

export default recommendationSlice.reducer;
