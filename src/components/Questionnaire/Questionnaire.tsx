import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Question from "../Question";
import { nextQuestion, prevQuestion, setError } from "../../slices/questionnaireSlice";
import { INPUT_TYPE } from "../../utils/constants";
import { QuestionInput } from "../../interfaces/app-interfaces";

export default function Questionnaire() {
	const dispatch = useDispatch();
	const { questions, currentIndex, answers } = useSelector(
		(state: RootState) => ({
			questions: state.questionnaire.questions,
			currentIndex: state.questionnaire.currentIndex,
			answers: state.questionnaire.answers,
		}),
		shallowEqual
	);

	const prev = () => {
		dispatch(setError(false));
		dispatch(prevQuestion());
	};

	const next = () => {
		const answer = answers[questions[currentIndex].id];
		let error = false;
		if (questions[currentIndex].type === INPUT_TYPE) {
			const currentQuestion = questions[currentIndex] as QuestionInput;
			const regex = new RegExp(currentQuestion.validationRegex);
			error = !regex.test(answer.toString());
		} else {
			error = !answer;
		}

		dispatch(setError(error));

		if (!error) {
			dispatch(nextQuestion());
		}
	};

	return (
		<div>
			<Question question={questions[currentIndex]} />
			{currentIndex > 0 && (
				<button type="button" onClick={prev}>
					Prev
				</button>
			)}
			<button type="button" onClick={next}>
				Next
			</button>
		</div>
	);
}
