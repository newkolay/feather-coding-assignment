import React, { MutableRefObject } from "react";
import { Option } from "../../../interfaces/questionnaire.interface";
import { StyledOption, StyledLabel } from "./styles";

interface RadioButtonsProps {
	options: Option[];
	name: string;
	checkedValue: string | number;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
	controlRef: MutableRefObject<HTMLInputElement | null>;
}

export default function RadioButtons({
	options,
	name,
	checkedValue,
	onChange,
	onKeyDown,
	controlRef,
}: RadioButtonsProps) {
	return (
		<div>
			{options.map((option) => (
				<StyledOption key={option.value}>
					<input
						type="radio"
						name={name}
						id={option.value}
						value={option.value}
						checked={checkedValue === option.value}
						onChange={onChange}
						onKeyDown={onKeyDown}
						ref={controlRef}
					/>
					<StyledLabel htmlFor={option.value}>{option.name}</StyledLabel>
				</StyledOption>
			))}
		</div>
	);
}
