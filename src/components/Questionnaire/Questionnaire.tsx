import { useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import Question from "../Question";
import { nextQuestion, prevQuestion, setError } from "../../slices/questionnaireSlice";
import { INPUT_TYPE } from "../../utils/constants";
import { QuestionInput } from "../../interfaces/questionnaire.interface";
import { createUserRequest } from "../../slices/authSlice";
import {
	StyledQuestionnaire,
	StyledQuestionWrapper,
	StyledErrorsWrapper,
	StyledErrorItem,
} from "./styles";
import ButtonLink from "../common/ButtonLink";
import Button from "../common/Button";
import { StyledLinkWrapper } from "../Recommendation/styles";
import { createQuestionnaireToSend } from "../../utils/questionnaireUtils";

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

	const { isLoading, errors } = useSelector(
		(state: RootState) => ({
			isLoading: state.auth.isLoading,
			errors: state.auth.errors,
		}),
		shallowEqual
	);

	const controlRef = useRef<HTMLInputElement | null>(null);

	const prev = () => {
		dispatch(setError(false));
		dispatch(prevQuestion());
		if (controlRef.current) {
			controlRef.current.focus();
		}
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

		if (controlRef.current) {
			controlRef.current.focus();
		}
	};

	const finish = () => {
		const requestObj = createQuestionnaireToSend(answers);
		dispatch(createUserRequest(requestObj));
	};

	const nextAction = () => {
		if (currentIndex === questions.length - 1) {
			finish();
		} else {
			next();
		}
	};

	return (
		<StyledQuestionnaire>
			<StyledQuestionWrapper role="main">
				<Question
					question={questions[currentIndex]}
					controlRef={controlRef}
					nextAction={nextAction}
				/>
				{currentIndex === questions.length - 1 ? (
					<Button onClick={finish} disabled={isLoading}>
						Finish Questionnaire
					</Button>
				) : (
					<Button onClick={next} disabled={isLoading}>
						Next
					</Button>
				)}

				{errors && (
					<StyledErrorsWrapper>
						{Object.keys(errors).map((key) => (
							<StyledErrorItem key={key}>
								{key}: {errors[key].join(" ")}
							</StyledErrorItem>
						))}
					</StyledErrorsWrapper>
				)}

				{currentIndex > 0 && (
					<StyledLinkWrapper>
						<ButtonLink onClick={prev}>Previous question</ButtonLink>
					</StyledLinkWrapper>
				)}
			</StyledQuestionWrapper>
		</StyledQuestionnaire>
	);
}
