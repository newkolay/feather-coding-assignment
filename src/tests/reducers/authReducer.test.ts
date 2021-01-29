import authReducer, {
	createUserFailed,
	createUserRequest,
	createUserSuccess,
	removeToken,
} from "../../slices/authSlice";

const defaultState = {
	token: null,
	isLoading: false,
	errors: null,
};

describe("auth reducer", () => {
	it("should return the initial state", () => {
		expect(authReducer(undefined, { type: "any" })).toEqual(defaultState);
	});
	it("should match state for token request", () => {
		expect(authReducer(defaultState, createUserRequest)).toEqual({
			...defaultState,
			isLoading: true,
		});
	});
	it("should match state for getting token successfully", () => {
		expect(authReducer(defaultState, createUserSuccess("test"))).toEqual({
			...defaultState,
			token: "test",
		});
	});
	it("should match state for getting token unsuccessfully", () => {
		expect(authReducer(defaultState, createUserFailed({ test: ["test"] }))).toEqual({
			...defaultState,
			isLoading: false,
			errors: {
				test: ["test"],
			},
		});
	});
	it("should handle token removal", () => {
		expect(authReducer({ ...defaultState, token: "test" }, removeToken())).toEqual({
			...defaultState,
			token: null,
		});
	});
});
