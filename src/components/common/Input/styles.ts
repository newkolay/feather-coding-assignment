import styled from "styled-components";
import { ThemeInterface } from "../../../typings/styled-components";

interface StyledInputProps {
	isError: boolean;
	theme: ThemeInterface;
}

const StyledInput = styled.input`
	width: 100%;
	border: ${(props: StyledInputProps) =>
		props.isError
			? `2px solid ${props.theme.colors.red}`
			: `2px solid ${props.theme.colors.grey}`};
	padding: 5px;
	font-size: 1.2rem;
`;

export { StyledInput };
