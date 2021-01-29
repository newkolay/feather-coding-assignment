import styled from "styled-components";

const StyledLink = styled.button`
	border: 0;
	background: none;
	cursor: pointer;
	text-decoration: underline;
	color: ${({ theme }) => theme.colors.blue};
	font-size: 1rem;
`;

export { StyledLink };
