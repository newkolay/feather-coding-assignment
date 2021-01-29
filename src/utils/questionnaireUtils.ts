import { QuestionnaireToSend } from "../interfaces/auth.interface";
import { AnswersObj } from "../interfaces/questionnaire.interface";

export function createQuestionnaireToSend(answers: AnswersObj): QuestionnaireToSend {
	const { children, ...questionnaireToSend } = answers;

	return {
		...questionnaireToSend,
		numberOfChildren: parseInt(questionnaireToSend.numberOfChildren, 10) || 0,
	};
}
