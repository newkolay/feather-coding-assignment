import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { QuestionInput, QuestionRadioButtons } from "../../interfaces/app-interfaces";
import { changeAnswer, setError } from "../../slices/questionnaireSlice";
import { INPUT_TYPE } from "../../utils/constants";
import Input from "../common/Input";
import RadioButtons from "../common/RadioButtons";

interface QuestionProps {
	question: QuestionInput | QuestionRadioButtons;
}

export default function Question({ question }: QuestionProps) {
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

	return (
		<div>
			<div>{question.questionText}</div>
			{question.type === INPUT_TYPE ? (
				<Input value={answers[question.id]} onChange={onChange} />
			) : (
				<RadioButtons
					name={question.id}
					checkedValue={answers[question.id]}
					options={question.options!}
					onChange={onChange}
				/>
			)}
			{isError && (
				<>
					{question.type === INPUT_TYPE ? (
						<div>value is not valid</div>
					) : (
						<div>please select an option</div>
					)}
				</>
			)}
		</div>
	);
}
