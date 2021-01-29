import React from "react";
import { StyledButton } from "./styles";

interface ButtonProps {
	children: React.ReactNode;
	onClick(event: any): void;
	disabled: boolean;
}

export default function Button({ children, onClick, disabled }: ButtonProps) {
	return (
		<StyledButton type="button" onClick={onClick} disabled={disabled}>
			{children}
		</StyledButton>
	);
}
