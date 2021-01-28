import React from "react";
import { Option } from "../../../interfaces/app-interfaces";

interface RadioButtonsProps {
	options: Option[];
	name: string;
	value: string | number;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function RadioButtons({ options, name, value, onChange }: RadioButtonsProps) {
	return (
		<div>
			{options.map((option) => (
				<div key={option.value}>
					<input
						type="radio"
						name={name}
						id={option.value}
						value={option.value}
						checked={value === option.value}
						onChange={onChange}
					/>
					<label htmlFor={option.value}>{option.name}</label>
				</div>
			))}
		</div>
	);
}
