import React, { MutableRefObject } from "react";
import { StyledInput } from "./styles";

interface InputProps {
	value: string | number;
	placeholder: string;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
	isError: boolean;
	controlRef: MutableRefObject<HTMLInputElement | null>;
}

export default function Input({
	value,
	onChange,
	onKeyDown,
	isError,
	placeholder,
	controlRef,
}: InputProps) {
	return (
		<StyledInput
			type="text"
			placeholder={placeholder}
			autoFocus
			value={value}
			onChange={onChange}
			isError={isError}
			ref={controlRef}
			onKeyDown={onKeyDown}
		/>
	);
}
