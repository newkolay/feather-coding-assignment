export interface Option {
	name: string;
	value: string;
	stepsToSkip?: number;
}

export type QuestionTypes = "INPUT" | "RADIO";
export interface QuestionInput {
	id: string;
	questionText: string;
	type: "INPUT";
	validationRegex: string;
}
export interface QuestionRadioButtons {
	id: string;
	questionText: string;
	type: "RADIO";
	options: Option[];
}
interface AnswersKeys {
	[key: string]: string | number;
}
interface AnswersObj extends AnswersKeys {
	firstName: string;
	address: string;
	numberOfChildren: number;
	occupation: string;
	email: string;
}
export interface QuestionnaireState {
	questions: (QuestionInput | QuestionRadioButtons)[];
	currentIndex: number;
	answers: AnswersObj;
	isError: boolean;
	stepsSkipped: number;
}
