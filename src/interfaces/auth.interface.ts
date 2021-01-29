export interface UserCreation {
	jwt: string;
}

export interface QuestionnaireToSend {
	firstName: string;
	address: string;
	numberOfChildren: number;
	occupation: string;
	email: string;
}

export interface AuthErrors {
	[key: string]: string[];
}
