import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Question from "../Question";
import { nextQuestion } from "../../slices/questionnaireSlice";

export default function Questionnaire() {
	const dispatch = useDispatch();
	const { questions, currentIndex } = useSelector(
		(state: RootState) => ({
			questions: state.questionnaire.questions,
			currentIndex: state.questionnaire.currentIndex,
		}),
		shallowEqual
	);

	const next = () => {
		dispatch(nextQuestion());
	};

	return (
		<div>
			<Question question={questions[currentIndex]} />
			<button type="button" onClick={next}>
				Next
			</button>
		</div>
	);
}
