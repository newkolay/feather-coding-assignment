import React from "react";

interface InputProps {
	value: string | number;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Input({ value, onChange }: InputProps) {
	return <input type="text" value={value} onChange={onChange} />;
}
