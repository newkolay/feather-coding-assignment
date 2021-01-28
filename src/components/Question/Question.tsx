import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { QuestionValue } from "../../interfaces/app-interfaces";
import { changeAnswer } from "../../slices/questionnaireSlice";
import { INPUT_TYPE } from "../../utils/constants";
import Input from "../common/Input";
import RadioButtons from "../common/RadioButtons";

interface QuestionProps {
	question: QuestionValue;
}

export default function Question({ question }: QuestionProps) {
	const dispatch = useDispatch();
	const answers = useSelector((state: RootState) => state.questionnaire.answers);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
					value={answers[question.id]}
					options={question.options!}
					onChange={onChange}
				/>
			)}
		</div>
	);
}
