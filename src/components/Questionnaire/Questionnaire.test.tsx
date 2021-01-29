import { render, fireEvent, screen } from "../../tests/testUtils";
import Questionnaire from "./Questionnaire";

it("Renders the connected app at first step", () => {
	render(<Questionnaire />);
	expect(screen.getByPlaceholderText("i.e. Jane")).toBeInTheDocument();
});

it("Show error if the input value is wrong", () => {
	render(<Questionnaire />);
	const nextButton = screen.getByText("Next");
	fireEvent.click(nextButton);
	expect(screen.getByText("value is not valid")).toBeInTheDocument();
});

it("Went to the second step", () => {
	render(<Questionnaire />);
	const input = screen.getByPlaceholderText("i.e. Jane");
	fireEvent.change(input, { target: { value: "Test" } });
	const nextButton = screen.getByText("Next");
	fireEvent.click(nextButton);
	expect(screen.getByText("What's your address?")).toBeInTheDocument();
});
