import styled from "styled-components";

const StyledQuestion = styled.div`
	min-width: 200px;
	margin-bottom: 35px;

	@media (min-width: 481px) {
		min-width: 400px;
	}
`;

const StyledTitle = styled.h1`
	margin: 0 0 15px;
	font-size: 2rem;
	font-weight: bold;
`;

const StyledErrorText = styled.div`
	position: absolute;
	margin-top: 5px;
	color: ${({ theme }) => theme.colors.red};
	font-size: 1.2rem;
`;

export { StyledQuestion, StyledTitle, StyledErrorText };
