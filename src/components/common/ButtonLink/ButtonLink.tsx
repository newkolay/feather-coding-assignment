import React from "react";
import { StyledLink } from "./styles";

interface ButtonLinkProps {
	children: React.ReactNode;
	onClick(): void;
}

export default function ButtonLink({ children, onClick }: ButtonLinkProps) {
	return (
		<StyledLink type="button" onClick={onClick}>
			{children}
		</StyledLink>
	);
}
