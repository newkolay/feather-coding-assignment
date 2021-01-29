export type QuestionTypes = "INPUT" | "RADIO";

export interface QuestionInput {
	id: string;
	questionText: string;
	placeholder: string;
	type: "INPUT";
	validationRegex: string;
	skippable?: boolean;
}

export interface QuestionRadioButtons {
	id: string;
	questionText: string;
	type: "RADIO";
	options: Option[];
	skippable?: boolean;
}

export interface Option {
	name: string;
	value: string;
	stepsToSkip?: number;
}

interface AnswersKeys {
	[key: string]: string | number;
}

export interface AnswersObj extends AnswersKeys {
	firstName: string;
	address: string;
	children: string;
	numberOfChildren: string;
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
