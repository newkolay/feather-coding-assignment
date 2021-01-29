import axios, { AxiosResponse } from "axios";
import { UserCreation, QuestionnaireToSend } from "../interfaces/auth.interface";
import { Recommendation } from "../interfaces/recommendation.interface";

const API_URL = "https://challenge-dot-popsure-204813.appspot.com";
const ContentTypeJSON = { "Content-Type": "application/json" };

const AuthHeaders = (token: string) => ({
	headers: {
		...ContentTypeJSON,
		Authorization: `Bearer ${token}`,
	},
});

const createUser = async (
	questionnaire: QuestionnaireToSend
): Promise<AxiosResponse<UserCreation>> =>
	axios.post<UserCreation>(`${API_URL}/user`, questionnaire, {
		headers: {
			...ContentTypeJSON,
		},
	});

const getRecommendation = async (token: string): Promise<AxiosResponse<Recommendation[]>> =>
	axios.get<Recommendation[]>(`${API_URL}/recommendation`, AuthHeaders(token));

const API = {
	createUser,
	getRecommendation,
};

export default API;
