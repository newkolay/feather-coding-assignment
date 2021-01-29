import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitForElementToBeRemoved } from "../../tests/testUtils";
import Recommendation from "./Recommendation";

const recommendationURL = "https://challenge-dot-popsure-204813.appspot.com/recommendation";
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

const server = setupServer(
	rest.get(recommendationURL, (req, res, ctx) => res(ctx.json(testRecommendation)))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("Should show loading state", () => {
	render(<Recommendation token="test" />);
	expect(screen.getByText("Loading recommendations...")).toBeInTheDocument();
});

it("Should show recommendation", async () => {
	render(<Recommendation token="test" />);
	await waitForElementToBeRemoved(() => screen.getByText("Loading recommendations..."));
	expect(screen.getByText("We got your recommendation")).toBeInTheDocument();
});

it("Should show error state", async () => {
	server.use(rest.get(recommendationURL, (req, res, ctx) => res(ctx.status(500))));
	render(<Recommendation token="test" />);
	await waitForElementToBeRemoved(() => screen.getByText("Loading recommendations..."));
	expect(
		screen.getByText("An error occured trying to load your recommendation")
	).toBeInTheDocument();
});
