import styled from "styled-components";

const StyledQuestionnaire = styled.div`
	display: flex;
	align-items: center;
	height: 100vh;
`;

const StyledQuestionWrapper = styled.main`
	padding: 0 20px;
`;

const StyledErrorsWrapper = styled.div`
	margin-top: 10px;
`;

const StyledErrorItem = styled.div`
	color: ${({ theme }) => theme.colors.red};
`;

export { StyledQuestionnaire, StyledQuestionWrapper, StyledErrorsWrapper, StyledErrorItem };
