export interface Option {
	name: string;
	value: string;
	stepsToSkip?: number;
}

export interface QuestionValue {
	id: string;
	questionText: string;
	type: string;
	validationRegex?: string;
	options?: Option[];
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
	questions: QuestionValue[];
	currentIndex: number;
	answers: AnswersObj;
}
