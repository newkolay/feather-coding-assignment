import React, { MutableRefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { QuestionInput, QuestionRadioButtons } from "../../interfaces/questionnaire.interface";
import { changeAnswer, setError } from "../../slices/questionnaireSlice";
import { INPUT_TYPE } from "../../utils/constants";
import Input from "../common/Input";
import RadioButtons from "../common/RadioButtons";
import { StyledQuestion, StyledTitle, StyledErrorText } from "./styles";

interface QuestionProps {
	question: QuestionInput | QuestionRadioButtons;
	controlRef: MutableRefObject<HTMLInputElement | null>;
	nextAction(): void;
}

export default function Question({ question, controlRef, nextAction }: QuestionProps) {
	const dispatch = useDispatch();
	const answers = useSelector((state: RootState) => state.questionnaire.answers);
	const isError = useSelector((state: RootState) => state.questionnaire.isError);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setError(false));
		dispatch(
			changeAnswer({
				answerId: question.id,
				answer: question.type === INPUT_TYPE ? event.target.value : event.target.id,
			})
		);
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			nextAction();
		}
	};

	return (
		<StyledQuestion>
			<StyledTitle>{question.questionText}</StyledTitle>
			{question.type === INPUT_TYPE ? (
				<Input
					value={answers[question.id]}
					placeholder={question.placeholder}
					onChange={onChange}
					isError={isError}
					controlRef={controlRef}
					onKeyDown={onKeyDown}
				/>
			) : (
				<RadioButtons
					name={question.id}
					checkedValue={answers[question.id]}
					options={question.options!}
					onChange={onChange}
					onKeyDown={onKeyDown}
					controlRef={controlRef}
				/>
			)}
			{isError && (
				<>
					{question.type === INPUT_TYPE ? (
						<StyledErrorText>value is not valid</StyledErrorText>
					) : (
						<StyledErrorText>please select an option</StyledErrorText>
					)}
				</>
			)}
		</StyledQuestion>
	);
}
