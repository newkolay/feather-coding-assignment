import React from "react";
import { Option } from "../../../interfaces/app-interfaces";

interface RadioButtonsProps {
	options: Option[];
	name: string;
	checkedValue: string | number;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function RadioButtons({ options, name, checkedValue, onChange }: RadioButtonsProps) {
	return (
		<div>
			{options.map((option) => (
				<div key={option.value}>
					<input
						type="radio"
						name={name}
						id={option.value}
						value={option.value}
						checked={checkedValue === option.value}
						onChange={onChange}
					/>
					<label htmlFor={option.value}>{option.name}</label>
				</div>
			))}
		</div>
	);
}
