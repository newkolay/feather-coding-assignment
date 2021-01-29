import styled from "styled-components";

const StyledButton = styled.button`
	height: 2rem;
	border: none;
	background-color: ${({ theme }) => theme.colors.purple};
	cursor: pointer;
	padding: 4px 15px;
	color: ${({ theme }) => theme.colors.white};
	font-size: 1rem;

	&:hover {
		background-color: ${({ theme }) => theme.colors.purpleLighter};
	}
	&:disabled {
		opacity: 0.3;
	}
`;

export { StyledButton };
